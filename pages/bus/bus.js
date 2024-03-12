// pages/bus/bus.js
const app = getApp()
const util = require("../../utils/busStop.js");
const myhttp = require("../../utils/http.js")

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 组件所需的参数
    nvabarData: {
      showCapsule: 1,
      title: '新加坡公交',
    },
    height: app.globalData.height * 2 + 20,
    roadList : [],
    loading : true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getNearList();
  },

  getNearList(){
    wx.getLocation({
      success: res => {
        let lat = res.latitude;
        let lng = res.longitude;
        //lat: 1.3884141666958, lng: 103.9897163888532
        myhttp.get("api/tool/busList", { lat, lng}).then(res => {
          this.setData({ loading : false })
          res.data.forEach(r => r.distance = r.distance.toFixed(2))
          let roadList = util.getNearByStation(res.data, lat, lng);
          console.log(roadList);
          this.setData({ roadList })
        })
      }, fail: function (err) {
        console.log(err)
      }
    })
  },

  search(e){
    let str = e.detail.value;
    if(str.length > 1){
      myhttp.get("api/filterBus", { name: 'loop' }).then(res => {
        let roadList = util.getNearByStation(res.data);
        console.log(roadList);
        this.setData({ roadList })
      })
    }else{
      this.getNearList();
    }
  },

  getDetail(e){
    let id = e.currentTarget.dataset.id
    let stop = e.currentTarget.dataset.stop
    let point = e.currentTarget.dataset.point
    wx.navigateTo({
      url: `../busItem/busItem?id=${id}&stop=${stop}&point=${point}`,
    })
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
