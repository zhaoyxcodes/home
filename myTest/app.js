//app.js
App({

  onLaunch: function () {
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this;
    wx.getLocation({
      type: 'wgs84', //wgs84
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        console.log(latitude + "/" + longitude)
        that.globalData.geom = longitude + "," + latitude
      }
    })
  },
  getLogin: function (success1) {
    var that = this;
    wx.login({
      success: function (res) {
        if (res.code) {
          wx.getUserInfo({
            success: function (res1) {
              var userInfo = res1.userInfo;
              wx.request({
                url: 'https://zhao/home/login/get3drSessionKey',
                data: {
                  code: res.code,
                  img: userInfo.avatarUrl,
                  geom: that.globalData.geom,
                  name: userInfo.nickName
                },
                method: 'POST',
                header: {
                  'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res2) {
                  console.log(res2.data.sessionkey)
                  if (typeof (res2) != 'undefined' && res2.data.sessionkey.length > 0) {
                    wx.setStorage({key: "user", data: res2.data})
                    success1(1);
                  }
                }
              })
            }
          })
        }
      }
    })

  },
  globalData: {
    title: "",
    geom: "",
    userInfo: null
  }
})