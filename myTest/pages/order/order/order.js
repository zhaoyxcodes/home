// pages/order.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: "",
    type_array: ['5斤', '10斤'],
    type_index: 0,
    num_array: [1, 2, 3],
    num_index: 0,
    pay_array: ['面付款', '线上支付'],
    pay_index: 0,
    distribution_array: ['自提(小区北门6日18点)', '上门送货'],
    distribution_index: 0
  },
  typeBindPickerChange: function (e) {
    this.setData({
      type_index: e.detail.value
    })
  },
  numBindPickerChange: function (e) {
    this.setData({
      num_index: e.detail.value
    })
  },
  distributionBindPickerChange: function (e) {
    this.setData({
      distribution_index: e.detail.value
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
    this.setData({
      id: options.id
    })
    //设置定位标题
    wx.setNavigationBarTitle({
      title: app.globalData.title
    })
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