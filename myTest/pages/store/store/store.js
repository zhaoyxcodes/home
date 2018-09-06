// pages/store/store/store.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    geom:null,//当前位置
    roomname:"选择位置",
    pay_array: ['周边500米内', '周边1000米内', '周边2000米内', '周边5000米内'],
    pay_index: 0,
    pics2: [],
    isShow2: true,
    lb:"类别",
    navbar: ['上架', '下架中'],
    currentTab: 0,
    sdata:null,//农场data
    pdata:null//商品信息
  },
  //响应点击导航栏
  navbarTap:function (e) {
    var that = this;
    that.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  payBindPickerChange: function (e) {
    this.setData({
      pay_index: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //设置定位标题
    if (this.data.sdata!=null){
      wx.setNavigationBarTitle({
        title: this.data.sdata.title
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // wx.request({
    //   url: 'https://zhao/home//home/fram/querybyuser',
    //   data: { "user": JSON.stringify(wx.getStorageSync("user"))},
    //   method: 'POST',
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded'
    //   },
    //   success: function (res2) {
    //     if (res2.data!="0"){
    //       this.setData({
    //         sdata:res2.data
    //       })
    //     }else{
    //       //失败
    //     }
    //   }
    // })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  getlocationwz:function(){
    // 地图选择
    var that=this;
    wx.chooseLocation({
      success: function (res) {
        // success
        console.log(res, "location")
        console.log(res.name)
        console.log(res.latitude)
        console.log(res.longitude)
        if (res.name.length>0){
          that.setData({
            roomname: res.name,
            geom: res.latitude + "," + res.longitude
          })
        }
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },
  getgoodsbyuser:function(){
    if (this.data.sdata!=null){
      wx.request({
        url: 'https://zhao/home//home/queryProductByFarm',
        data: { "farm_id": this.data.sdata.id },
        method: 'POST',
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res2) {
          if (res2.data != "0") {
            this.setData({
              pdata: res2.data
            })
          } else {
            //失败
          }
        }
      })
    }
  },// 图片上传
  chooseImage2: function () {
    var _this = this,
      pics2 = this.data.pics2;
    wx.chooseImage({
      count: 1 - pics2.length, // 最多可以选择的图片张数，默认9
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
  previewImage: function (e) {
    var current = e.target.dataset.src
    wx.previewImage({
      current: current,
      urls: this.data.pics
    })
  }
})