// pages/promo/promo.js
//图片服务器前置域名
const util = require("../../utils/util.js")
const myhttp = require("../../utils/http.js")
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示 
      title: '新加坡百宝箱', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,  
    IMG_PRE_URL: "https://files.weekendgowhere.sg/",
    contentArr : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getlist()
  },

  getlist(){
    myhttp.get("api/promotion").then(res => {
      let list = res.data;
      list.forEach(item => {
        item.edit_time = util.formatTime(item.edit_time)
      })
      this.setData({
        contentArr: res.data
      })
    })
  },

  getDetail(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `../promo_result/promo_result?id=${id}`,
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