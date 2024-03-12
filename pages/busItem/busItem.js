// pages/busItem/bueItem.js
const app = getApp()
const myhttp = require("../../utils/http.js");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1,
      title: '站点详情',
    },
    height: app.globalData.height * 2 + 20,
    lat : '',
    lon : '',
    stop : '',
    busList : [],
    currentId : '',
    markers : [],
    pointStr : '',
    points : []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let points = [];
    if(options.id){
      this.getNowInfo(options.id);
    }
    if(options.stop){
      this.setData({
        stop : options.stop
      })
    }
    if(options.point){
      let lat = parseFloat(options.point.split('-')[0]);
      let lon = parseFloat(options.point.split('-')[1]);
      points.push({ latitude : lat, longitude : lon})
      let markers = [{
        id: 1,
        latitude: lat,
        longitude: lon,
        iconPath: '../../imgs/point.png',
        width: 30,
        height: 30
      }]
      this.setData({ markers,pointStr : options.point })
    }
    wx.getLocation({
      success: res => {
        points.push({ latitude: res.latitude, longitude: res.longitude })
        this.setData({
          points,
          lat: res.latitude,
          lon: res.longitude
        })
      },
    })
  },

  getNowInfo(id,isRefresh = false){
    myhttp.get(`api/tool/BusDetail/${id}`).then(res => {
      debugger;
      let busList = this.getMintime(res.Services);
      this.setData({ busList, currentId: id })
      if(isRefresh){
        setTimeout(() => {
          wx.stopPullDownRefresh();
          wx.showToast({
            title: '数据已更新'
          })
        },500)
      }
    })
  },

  getMintime(arr){
    arr.forEach(item => {
      let nextTime = this.formatTime(item.NextBus.EstimatedArrival);
      let nextTime2 = this.formatTime(item.NextBus2.EstimatedArrival);
      let nextTime3 = this.formatTime(item.NextBus3.EstimatedArrival);
      item.NextBus.EstimatedArrival = this.formatTime(nextTime,2);
      item.NextBus2.EstimatedArrival = this.formatTime(nextTime2, 2);
      item.NextBus3.EstimatedArrival = this.formatTime(nextTime3, 2);
      if (item.NextBus.EstimatedArrival <= 0){
        item.NextBus.EstimatedArrival = item.NextBus2.EstimatedArrival;
        item.NextBus2.EstimatedArrival = item.NextBus3.EstimatedArrival;
      }
    })
    return arr;
  },

  formatTime(str,type = 1){
    if(!str){
      return ''
    }
    if(type == 1){
      return str.substr(0, 19).split('T').join(' ').replace(/-/g, '/');
    }else{
      return parseInt((new Date(str).getTime() - new Date().getTime()) / 60000);
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    app.globalData.share = false
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
    this.getNowInfo(this.data.currentId,true);
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
    return {
      title: '新加坡百宝箱',
      path: `/pages/busItem/busItem?id=${this.data.currentId}&stop=${this.data.stop}&point=${this.data.pointStr}`
    }
  }
})
