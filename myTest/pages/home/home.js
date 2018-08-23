const app = getApp()
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userimg:'../../images/user/imguser.jpg',
    username:"未登录"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(app.userInfo)
    wx.setNavigationBarTitle({
      title: "账户"
    })
  },
  nt: function (event) {
    console.log(event)
    // 验证是否登录
    var bol=util.islogin()
    if (bol){
      if (event.currentTarget.id == "zh") {
        //提示用户
        wx.showModal({
          title: '账户余额',
          content: '您当前账户余额12.01元',
          success: function (res) {
            if (res.confirm) {
            } else if (res.cancel) {
            }
          }
        })
      } else if (event.currentTarget.id == "kj") {

      } else if (event.currentTarget.id == "dd") {

      } else if (event.currentTarget.id == "xx") {
        wx.navigateTo({
          url: '../message/message',
        })
      } else if (event.currentTarget.id == "sp") {
        wx.navigateTo({
          url: '../goods/addgoods/addgoods',
        })
      }
    }else{
      wx.navigateTo({
        url: 'authuser/authuser',
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
    var bol = util.islogin()
    if(bol){
      this.setData({
        userimg: app.globalData.userInfo.img,
        username: app.globalData.userInfo.name
      })
    }
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
  
  }
    
})