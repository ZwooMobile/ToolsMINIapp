// pages/contact/contact.js
const app = getApp();
const telList = require('../../utils/util.js').telephoneNumber
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 组件所需的参数
    navbarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示 
      title: '常用号码薄', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    telNumList: telList,
    num:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  search(e){
    let str = e.detail.value;
    let sortList = JSON.parse(JSON.stringify(telList));
    if (str != '') {
      let telNumList = sortList.filter(i => {
        return this.filterSort(i,str);
      })
      this.setData({ telNumList })
    } else {
      this.setData({ telNumList: telList })
    }
  },

  filterSort(i,query) {
    i.content = i.content.filter(r => {
      return r.name.indexOf(query) > -1;
    })
    if (i.content.length > 0) return true
  },

  showBlock(e){
    // console.log(e.currentTarget.dataset.id)
    this.setData({
      num:e.currentTarget.dataset.id
    })
  },

  call(e){
    let number = e.currentTarget.dataset.id;
    //去汉字、括号、空格
    // number = number.replace(/[\u4e00-\u9fa5]|\s|[(|)]/g, "");
    wx.makePhoneCall({
      phoneNumber: number,
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
    app.globalData.share = false
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