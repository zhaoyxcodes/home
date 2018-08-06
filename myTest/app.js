//app.js
var MapWX = require('utils/bmap-wx.min.js');
App({

  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    var that = this;
    
    wx.getLocation({
      type: 'gcj02',//wgs84
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy
        console.log(latitude + "/" + longitude + "|" + speed + "|" + accuracy)
        var bdlatlog=that.gcj02_To_Bd09(latitude, longitude)
        bdlatlog[0]=34.179105555955985
        bdlatlog[1]=108.90401466186994
        console.log(bdlatlog[0] + "," + bdlatlog[1])
        


        wx.request({
          url: 'https://api.map.baidu.com/place/v2/search',
          data: {
            location: bdlatlog[0] + "," + bdlatlog[1],//latitude + "," + longitude, 
            query: '住宅区', ak: 'bGrqhjxQ21Rgcp43kvn2m4L5RtzS7RVY',
            radius_limit:true,
            coord_type: 3,
            
            output: 'json'
            
            //ret_coordtype: 'bd09ll'//'gcj02ll'
          },
          header: {
            "content-type": "application/json"
          },
          method: 'GET',
          success(data) {
            var arrayxq = new Array();
            let res = data["data"];
            if (res["status"] === 0) {
              let poiArr = res["results"];
              for (var i = 0; i < poiArr.length;i++){
                var  poi = poiArr[i]
                var mm = that.getDistance(bdlatlog[0],bdlatlog[1], poi.location.lat, poi.location.lng);
                var d={};
                d["mi"]=mm;
                d["location"] = poi.location;
                d["name"] = poi.name;
                arrayxq[i]=d;
              }
              var arraysort=that.sortarr(arrayxq)
              console.log(arraysort)
              //设置定位标题
              wx.setNavigationBarTitle({
                title: arraysort[0].name
              })
            }
          }
        })


        // wx.request({
        //   url: 'https://api.map.baidu.com/geocoder/v2/',
        //   data: {
        //     ak: 'bGrqhjxQ21Rgcp43kvn2m4L5RtzS7RVY',
        //     location: latitude + "," + longitude,
        //     coordtype:  'gcj02ll',
        //     pois:  0,
        //     output: 'json',
        //     sn: '',
        //     timestamp:  '',
        //     ret_coordtype: 'gcj02ll'
        //   },
        //   header: {
        //     "content-type": "application/json"
        //   },
        //   method: 'GET',
        //   success(data) {console.log(data)}
        // })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    /*
        wx.setNavigationBarColor({
          frontColor: '#ffffff',
          backgroundColor: '#ff0000',
          animation: {
            duration: 400,
            timingFunc: 'easeIn'
          }
        })
      
        wx.setTabBarItem({
          index: 0,
          text: 'text',
          iconPath: '/path/to/iconPath',
          selectedIconPath: '/path/to/selectedIconPath'
        })*/
  },
  sortarr: function(arr) {
    for (var i1 = 0; i1 < arr.length; i1++) {
      for (var j1 = 0; j1 < arr.length - 1 - i1; j1++) {
        if (parseFloat(arr[j1].mi) > parseFloat(arr[j1 + 1].mi)) {        // 相邻元素两两对比
          var temp = arr[j1 + 1];        // 元素交换
          arr[j1 + 1] = arr[j1];
          arr[j1] = temp;
        }
      }
    }
    
    return arr;
  },
  getDistance: function (lat1, lng1, lat2, lng2) {
    lat1 = lat1 || 0;
    lng1 = lng1 || 0;
    lat2 = lat2 || 0;
    lng2 = lng2 || 0;

    var rad1 = lat1 * Math.PI / 180.0;
    var rad2 = lat2 * Math.PI / 180.0;
    var a = rad1 - rad2;
    var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;

    var r = 6378137;
    return r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))
  },
  gcj02_To_Bd09:function( gg_lat,  gg_lon) {//转换百度坐标
     var pi = 3.1415926535897932384626;
     var x = gg_lon, y = gg_lat;
     var z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * pi);
     var theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * pi);
     var bd_lon = z * Math.cos(theta) + 0.0065;
     var bd_lat = z * Math.sin(theta) + 0.006;
    return [bd_lat, bd_lon];
  },
  globalData: {
    title: "",
    userInfo: null
  }
})
