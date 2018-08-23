const app = getApp()
Page({
  data: {
  },
  onLoad: function () {
    wx.setNavigationBarTitle({
      title: "微信快速认证"
    })
  },
  bindGetUserInfo: function (e) {
    var that = this
    app.getLogin(function (bs) {
      console.log(bs)
      if (bs == 1) {//登录成功
        //成功跳转返回
        wx.navigateBack({ changed: true });//返回上一页
      } else {
        //获取用户信息失败后。请跳转授权页面
       
      }

    })
  }
})


