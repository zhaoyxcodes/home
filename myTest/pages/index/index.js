//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //设置定位标题
    wx.setNavigationBarTitle({
      title: app.globalData.title
    })
    // wx.setBackgroundTextStyle({
    //   textStyle: 'dark', // 下拉背景字体、loading 图的样式为dark
    // })
  },

  onPullDownRefresh: function () {
    console.log("刷新中")
    wx.stopPullDownRefresh()
  }
})
