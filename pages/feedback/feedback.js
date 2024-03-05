// pages/feedback/feedback.js
const myhttp = require("../../utils/http.js");
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarData: {
      showCapsule: 1,
      title: '意见反馈',
    },
    height: app.globalData.height * 2 + 20, 
    question : '',
    email : '',
    value : '',
    showModal : false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let email = wx.getStorageSync('email');
    if(email){
      this.setData({
        value: email,
        email
      })
    }
  },

  send(){
    if (!this.data.question){
      wx.showToast({
        title: '请先输入您的问题或建议再提交',
        icon: 'none'
      })
      return;
    }
    wx.showLoading({
      title: '正在提交',
    })
    myhttp.post("api/sendEmail",{
      address : this.data.email,
      msg : this.data.question
    }).then(res => {
      console.log(res);
      if(res.status == 1){
        wx.setStorageSync('email', this.data.email);
        wx.hideLoading();
        this.setData({ showModal : true })
      }
    })
  },

  confirm(){
    wx.redirectTo({
      url: '../index/index',
    })
  },

  qtChange(e){
    this.setData({
      question : e.detail.value
    })
  },

  emailChange(e){
    this.setData({
      email : e.detail.value
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