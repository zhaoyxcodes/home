const app = getApp()
var util = require('../../../utils/util.js');
Page({
  data: {
    pics: [],
    count: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    isShow: true,
    loading: false,
    disabled: false
  },
  onLoad: function(options) {
    // 生命周期函数--监听页面加载
    isShow: (options.isShow == "true" ? true : false)
  },
  primary: function() {
    if (typeof (this.data.pics) == 'undefined' || this.data.pics.length<=0){
      util.showmodal("","请上传商品图片！", false)
      return false;
    }
    var newfilepath=""; 
    
    for (var i = 0; i < this.data.pics.length;i++){
      console.log(this.data.pics[i])
      wx.uploadFile({
        url:  'https://zhao/home/file/upload', //仅为示例，非真实的接口地址
        filePath: this.data.pics[i],
        name: 'file',
        formData: { 'dir': app.globalData.userInfo.openid},
        fail:function(res){console.log(res)},
        success: function (res) {
          var data = res.data
          console.log(data);
          if(data=="0"){
            util.showmodal("", "上传商品图片失败，请重新上传！ ", false)
            return false;
          }else{
            newfilepath += data + ";";
          }
        }
      })
    }
    console.log("pp:" + newfilepath)
    this.setData({
      loading: true,
      disabled: true
    })
    
  },
  // 图片上传
  chooseImage: function() {
    var _this = this,
      pics = this.data.pics;
    wx.chooseImage({
      count: 9 - pics.length, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function(res) {
        // success
        var imgSrc = res.tempFilePaths;
        pics = pics.concat(imgSrc);
        // 控制触发添加图片的最多时隐藏
        if (pics.length >= 9) {
          _this.setData({
            isShow: (!_this.data.isShow)
          })
        } else {
          _this.setData({
            isShow: (_this.data.isShow)
          })
        }
        _this.setData({
          pics: pics
        })
      
      },
      fail: function() {
        // fail
      },
      complete: function() {
        // complete
      }
    })
  },
  // 图片预览
  previewImage: function(e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.pics
    })
  }
})