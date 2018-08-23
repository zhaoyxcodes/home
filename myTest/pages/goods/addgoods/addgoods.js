const app = getApp()
var util = require('../../../utils/util.js');
Page({
  data: {
    pics: [],
    isShow: true,
    pics2: [],
    isShow2: true,
    loading: false,
    disabled: false,
    title:"",
    time:1,
    number:1,
    paytype:"",
    distype:""
  },
  onLoad: function(options) {
    // 生命周期函数--监听页面加载
    isShow: (options.isShow == "true" ? true : false)
  },
  savetime:function(e){
    this.data.time=e.detail.value;
  },
  savenumber:function(e){
    this.data.number = e.detail.value;
  },
  savepaytype:function(e){
    this.data.paytype=e.detail.value;
  },
  savedistype:function(e){
    this.data.distype=e.detail.value;
  },
  formSubmit: function(e) {
    var bol = this.vidateform(e.detail.value.title, "请输入标题");
    if (!bol) { return false; }
    bol = this.vidateform(e.detail.value.describe, "请输入商品描述");
    if (!bol) { return false; }
    bol = this.vidateform(e.detail.value.price, "请输入商品原始价格");
    if (!bol) { return false; }
    bol = this.vidateform(e.detail.value.saleprice, "请输入商品折后价格");
    if (!bol) { return false; }
    bol = this.vidateform(this.data.paytype, "请选择支付方式");
    if (!bol) { return false; }
    bol = this.vidateform(this.data.distype, "请选择配送方式");
    if (!bol) { return false; }

    if (typeof (this.data.pics2) == 'undefined' || this.data.pics2.length<=0){
      util.showmodal("","请上传商品展示图片！", false)
      return false;
    }
    if (typeof (this.data.pics) == 'undefined' || this.data.pics.length <= 0) {
      util.showmodal("", "请上传商品详细图片！", false)
      return false;
    }
    
    var newfilepath2 = ""; //图片展示真实路径
    for (var i = 0; i < this.data.pics2.length; i++) {
      console.log(this.data.pics2[i])
      var newfile = this.uploadfile(this.data.pics2[i]);
      if (newfile==''){
        return false;
      }
      newfilepath2 += newfile + ";";
    }
    console.log("pp:" + newfilepath2)

    var newfilepath=""; //详细图片真实路径
    for (var i = 0; i < this.data.pics.length;i++){
      console.log(this.data.pics[i])
      var newfile=this.uploadfile(this.data.pics[i]);
      if (newfile == '') {
        return false;
      }
      newfilepath += newfile+";";
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
      
      }
    })
  },
  // 图片上传
  chooseImage2: function () {
    var _this = this,
      pics2 = this.data.pics2;
    wx.chooseImage({
      count: 4 - pics2.length, // 最多可以选择的图片张数，默认9
      sizeType: ['original', 'compressed'], // original 原图，compressed 压缩图，默认二者都有
      sourceType: ['album', 'camera'], // album 从相册选图，camera 使用相机，默认二者都有
      success: function (res) {
        // success
        var imgSrc = res.tempFilePaths;
        pics2 = pics2.concat(imgSrc);
        // 控制触发添加图片的最多时隐藏
        if (pics2.length >= 4) {
          _this.setData({
            isShow2: (!_this.data.isShow2)
          })
        } else {
          _this.setData({
            isShow2: (_this.data.isShow2)
          })
        }
        _this.setData({
          pics2: pics2
        })

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
  },
  vidateform:function(val,title){
    if (val.length <= 0) {
      wx.showToast({
        title: title,
        image: '../Image/error.png',
        duration: 2000
      })
      return false;
    }
    return true;
  },
  uploadfile:function(srcfile){
    wx.uploadFile({
      url: 'https://zhao/home/file/upload', //仅为示例，非真实的接口地址
      filePath: srcfile,
      name: 'file',
      formData: { 'dir': app.globalData.userInfo.openid },
      fail: function (res) { console.log(res) },
      success: function (res) {
        var data = res.data
        console.log(data);
        if (data == "0") {
          util.showmodal("", "上传商品图片失败，请重新上传！ ", false)
        } else {
          return data; 
        }
      }
    })
    return "";
  }
})