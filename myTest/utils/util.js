//是否登录校验
const app = getApp()
function islogin(){
  var user = wx.getStorageSync("user")
  console.log("islogin:"+user)
  if (user != null &&user!=''&& typeof (user) !="undefined"){
    app.globalData.userInfo = user;
    return true;
  }
  return false;
}
function showmodal(title, content, showCancel){
  wx.showModal({
    title: title, showCancel: showCancel,
    content: content,
    success: function (res) {}
  })
}
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}
const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

//外部可用
module.exports = {
  formatTime: formatTime,
  islogin: islogin,
  showmodal: showmodal
}





// var bdlatlog=that.gcj02_To_Bd09(latitude, longitude)
        // console.log(bdlatlog[0] + "," + bdlatlog[1])
        // wx.request({
        //   url: 'https://api.map.baidu.com/place/v2/search',
        //   data: {
        //     location: bdlatlog[0] + "," + bdlatlog[1],//latitude + "," + longitude, 
        //     query: '小区', ak: 'bGrqhjxQ21Rgcp43kvn2m4L5RtzS7RVY', 
        //     radius_limit: true, 
        //     coord_type: 3,
        //     output: 'json'
        //   },
        //   header: {
        //     "content-type": "application/json"
        //   },
        //   method: 'GET',
        //   success(data) {
        //     var arrayxq = new Array();
        //     let res = data["data"];
        //     console.log(res)
        //     if (res["status"] === 0) {
        //       let poiArr = res["results"];
        //       for (var i = 0; i < poiArr.length;i++){
        //         var  poi = poiArr[i]
        //         var mm = that.getDistance(bdlatlog[0],bdlatlog[1], poi.location.lat, poi.location.lng);
        //         var d={};
        //         d["mi"]=mm;
        //         d["location"] = poi.location;
        //         d["name"] = poi.name;
        //         arrayxq[i]=d;
        //       }
        //       var arraysort=that.sortarr(arrayxq)
        //       console.log(arraysort)
        //       //设置定位标题
        //       wx.setNavigationBarTitle({
        //         title: arraysort[0].name
        //       })
        //     }
        //   }
        // })


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

// sortarr: function(arr) {
//   for (var i1 = 0; i1 < arr.length; i1++) {
//     for (var j1 = 0; j1 < arr.length - 1 - i1; j1++) {
//       if (parseFloat(arr[j1].mi) > parseFloat(arr[j1 + 1].mi)) {        // 相邻元素两两对比
//         var temp = arr[j1 + 1];        // 元素交换
//         arr[j1 + 1] = arr[j1];
//         arr[j1] = temp;
//       }
//     }
//   }

//   return arr;
// },
// getDistance: function (lat1, lng1, lat2, lng2) {
//   lat1 = lat1 || 0;
//   lng1 = lng1 || 0;
//   lat2 = lat2 || 0;
//   lng2 = lng2 || 0;

//   var rad1 = lat1 * Math.PI / 180.0;
//   var rad2 = lat2 * Math.PI / 180.0;
//   var a = rad1 - rad2;
//   var b = lng1 * Math.PI / 180.0 - lng2 * Math.PI / 180.0;

//   var r = 6378137;
//   return r * 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(a / 2), 2) + Math.cos(rad1) * Math.cos(rad2) * Math.pow(Math.sin(b / 2), 2)))
// },