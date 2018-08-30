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
    paytype:"",
    distype:"",
    //sku
    heigthrpx: 20,
    attrSumSize: 0,//总数
    attrdatalist: [{ "id": "color", "attrname": "ys", "attrval": [{ "id": "1", "name": "黑色" }, { "id": "2", "name": "白色" }, { "id": "0", "name": "褐色" }] }, { "id": "size", "attrname": "size", "attrval": [{ "id": "3", "name": "15cm" }, { "id": "4", "name": "18cm" }] }, { "id": "pp", "attrname": "品牌", "attrval": [{ "id": "7", "name": "NIKE" }, { "id": "8", "name": "AD" }, { "id": "9", "name": "KW" }] },],//后台获取属性
    checklist: [],//选中的属性值
    submitSKU: [],//保存sku
    skuli: [],//sku值的下标[0,0]
    priceli: [],
    count: []
  },
  onLoad: function(options) {
    // 生命周期函数--监听页面加载
    isShow: (options.isShow == "true" ? true : false)
  },
  savetime:function(e){
    this.data.time=e.detail.value;
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
    bol = this.vidateform(this.data.paytype, "请选择支付方式");
    if (!bol) { return false; }
    bol = this.vidateform(this.data.distype, "请选择配送方式");
    if (!bol) { return false; }

    bol = this.vidateform(this.data.submitSKU, "请选择SKU属性");
    if (!bol) { return false; }

    for (var i = 0; i < this.data.submitSKU.length;i++){
      bol = this.vidateform(this.data.submitSKU[i].prive, "SKU价格不能为空");
      if (!bol) { return false; }
      bol = this.vidateform(this.data.submitSKU[i].count, "SKU库存不能为空");
      if (!bol) { return false; }
       if (this.data.submitSKU[i].prive<=0){
        util.showmodal("", "SKU商品价格必须大于0！", false)
        return false;
       } else if (this.data.submitSKU[i].count <= 0 || Math.round(this.data.submitSKU[i].count) != this.data.submitSKU[i].count){
        util.showmodal("", "SKU商品库存必须大于0且为整数！", false)
        return false;
      }
    }

    // if (typeof (this.data.pics2) == 'undefined' || this.data.pics2.length<=0){
    //   util.showmodal("","请上传商品展示图片！", false)
    //   return false;
    // }
    // if (typeof (this.data.pics) == 'undefined' || this.data.pics.length <= 0) {
    //   util.showmodal("", "请上传商品详细图片！", false)
    //   return false;
    // }
    
    var newfilepath2 = ""; //图片展示真实路径
    // for (var i = 0; i < this.data.pics2.length; i++) {
    //   console.log(this.data.pics2[i])
    //   var newfile = this.uploadfile(this.data.pics2[i]);
    //   if (newfile==''){
    //     return false;
    //   }
    //   newfilepath2 += newfile + ";";
    // }
    console.log("pp:" + newfilepath2)

    var newfilepath=""; //详细图片真实路径
    // for (var i = 0; i < this.data.pics.length;i++){
    //   console.log(this.data.pics[i])
    //   var newfile=this.uploadfile(this.data.pics[i]);
    //   if (newfile == '') {
    //     return false;
    //   }
    //   newfilepath += newfile+";";
    // }
    console.log("pp:" + newfilepath)

    // this.setData({
    //   loading: true,
    //   disabled: true
    // })
    //准备提交
    var sub_data = { "user": JSON.stringify(wx.getStorageSync("user")), "title": e.detail.value.title, "describe": e.detail.value.describe, "price": e.detail.value.price, "paytype": this.data.paytype, "distype": this.data.distype, "time": this.data.time, "submitSKU": JSON.stringify(this.data.submitSKU), "img0": newfilepath2, "img1": newfilepath}
    console.log(sub_data)
    wx.request({
      url: 'https://zhao/home/home/saveGoods',
      data: sub_data,
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: function (res2) {
        console.log(res2)
      }
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
  },
  attrbind: function (e) {
    var attrvalindexs = e.detail.value;
    var attrid = e.target.dataset.attid
    var attrname = e.target.dataset.attname
    var attrindex = e.target.dataset.attindex
    var checks = []

    for (var i = 0; i < attrvalindexs.length; i++) {
      checks.push(this.data.attrdatalist[attrindex].attrval[attrvalindexs[i]])
    }
    var bol = false;
    for (var i = 0; i < this.data.checklist.length; i++) {
      if (attrid == this.data.checklist[i].id) {
        if (checks.length <= 0) {
          this.data.checklist.splice(i, 1);
        } else {
          this.data.checklist[i].attrval = checks
        }
        bol = true
      }
    }
    if (!bol) {
      this.data.checklist.push({ "id": attrid, "attrname": attrname, "attrval": checks, "height": "0", "fornum": 1 })
    }
    this.js_style()
  },
  js_style: function () {
    //计算总高度
    var heightsum = 1;
    for (var i = 0; i < this.data.checklist.length; i++) {
      if (this.data.checklist[i].attrval.length > 0) {
        heightsum = heightsum * parseInt(this.data.checklist[i].attrval.length);
      }
    }
    // console.log(heightsum)
    //计算每个格子高度
    for (var i = 0; i < this.data.checklist.length; i++) {
      var hnnew = heightsum;
      var xnum = 1;
      for (var j = 0; j < this.data.checklist.length; j++) {
        if (j <= i) {
          hnnew = hnnew / parseInt(this.data.checklist[j].attrval.length)
          xnum = xnum * parseInt(this.data.checklist[j].attrval.length)
        }
      }
      if (this.data.checklist[i].attrval.length > 0 && hnnew > 0) {
        var bordernum = heightsum - xnum
        var borderw= ((bordernum / xnum) )//表格border高度
        if (bordernum==0){
          borderw=0
        }
        this.data.checklist[i].height = (hnnew * this.data.heigthrpx) + borderw
      }
      //计算循环次数
      if (this.data.checklist[i].attrval.length > 0 && i != 0) {
        this.data.checklist[i].fornum = xnum / this.data.checklist[i].attrval.length;
      }

    }
     console.log(this.data.checklist)
    this.data.priceli = [];
    this.data.count = [];
    for (var i = 0; i < heightsum; i++) {
      this.data.priceli.push(0);
      this.data.count.push(0);
    }
    this.setData({
      checklist: this.data.checklist,
      attrSumSize: heightsum,
      priceli: this.data.priceli,
      count: this.data.count
    })
    this.js_sku()//计算sku

  },
  focusCSKU:function(e){
    var val = e.detail.value
    if (val=="0"){
    }
  },
  focusPSKU:function(e){
    var val = e.detail.value
    if (val == "0") {
    }
  },
  priceSKU: function (e) {
    var val = e.detail.value
    var index = e.currentTarget.id
    var bol = this.vidateform(val, "价格不能为空");
    if (!bol) { return false; }
    if (isNaN(val) || val<=0){
      wx.showToast({
        title: "价格必须为数字并且大于0",
        image: '../Image/error.png',
        duration: 2000
      })
      return false;
    }
    this.data.priceli[index] = val;
    this.js_countorprice();
  },
  countSKU: function (e) {
    var val = e.detail.value
    var index = e.currentTarget.id
    var bol = this.vidateform(val, "库存不能为空");
    if (!bol) { return false; }
    if (isNaN(val) || Math.round(val) != val||val <= 0) {
      wx.showToast({
        title: "库存必须为整数并且大于0",
        image: '../Image/error.png',
        duration: 2000
      })
      return false;
    }
    this.data.count[index] = val;
    this.js_countorprice();
  },
  js_countorprice: function () {
    for (var i = 0; i < this.data.submitSKU.length; i++) {
      this.data.submitSKU[i].prive = this.data.priceli[i];
      this.data.submitSKU[i].count = this.data.count[i];
    }
    this.setData({
      count: this.data.count,
      priceli: this.data.priceli,
      submitSKU: this.data.submitSKU
    })
    console.log(this.data.submitSKU)
  },
  js_sku: function () {
    this.data.submitSKU = [];
    this.data.skuli = []
    var csize = this.data.checklist.length;
    if (csize > 0) {
      this.goto(0)
    }
  },
  //迭代计算sku属性名|值
  goto: function (num1) {
    if (this.data.skuli != null && this.data.skuli.length > (this.data.checklist.length - 1)) {
      this.data.skuli = []
    }
    if (num1 < this.data.checklist.length) {
      for (var i = 0; i < this.data.checklist[num1].attrval.length; i++) {
        if (num1 == (this.data.checklist.length - 1)) {//最后一个值
          var str = [];

          for (var j = 0; j < this.data.skuli.length; j++) {
            var itemli = this.data.skuli[j].split("|");
            var inum1 = parseInt(itemli[0]);
            var inum2 = parseInt(itemli[1]);
            var itemattr = this.data.checklist[inum1]
            var itemval = this.data.checklist[inum1].attrval[inum2]
            str.push({ "attrid": itemattr.id, "attrname": itemattr.attrname, "valid": itemval.id, "valname": itemval.name });
          }
          var itemattr2 = this.data.checklist[num1]
          var itemval2 = this.data.checklist[num1].attrval[i]
          str.push({ "attrid": itemattr2.id, "attrname": itemattr2.attrname, "valid": itemval2.id, "valname": itemval2.name });
          var priceval = this.data.priceli[this.data.submitSKU.length]
          var countval = this.data.count[this.data.submitSKU.length]
          this.data.submitSKU.push({ "attrlist": str, "count": countval, "prive": priceval });

        } else {
          this.data.skuli[num1] = num1 + "|" + i;
        }
        var num2 = num1 + 1
        this.goto(num2)
      }
    }
  }
})