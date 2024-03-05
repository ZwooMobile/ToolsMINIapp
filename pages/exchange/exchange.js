// pages/exchange/exchange.js
const app = getApp()
var wxCharts = require('../../components/wxcharts-min')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarData: {
      showCapsule: 1,
      title: '新加坡实时汇率',
    },
    height: app.globalData.height * 2 + 20, 
    baseSGD: '100.00',
    baseRMB: '504.84',
    percent: '5.05',
    SGDVal: '',
    RMBVal: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var exchange='', a=[], b=[] 
    if(options.num){
      let percent = options.num;
      let baseRMB = (100 * percent).toFixed(2);
      exchange = JSON.parse(options.exchange) 
      this.setData({
        percent,
        baseRMB,
      })
    }

    for (var i=0;i<exchange.length;i++){
      a.push(exchange[i].create_time.slice(5,10))
      b.push(exchange[i].SGD2CNY)
    }

    console.log(a)
    console.log(exchange)

    this.canvasGet(a.reverse(), b.reverse())
  },

  inputSGD(e){
    let RMBVal = e.detail.value ? (e.detail.value * this.data.percent).toFixed(2) : '';
    this.setData({
      SGDVal : e.detail.value,
      RMBVal
    })
  },

  inputRMB(e){
    let SGDVal = e.detail.value ? (e.detail.value / this.data.percent).toFixed(2) : '';
    this.setData({
      RMBVal : e.detail.value,
      SGDVal
    })
  },

  touchSGD(){
    let baseRMB = (this.data.percent * 100).toFixed(2);
    this.setData({
      baseRMB,
      baseSGD: '100.00'
    })
  },

  touchRMB(){
    let baseSGD = (100 / this.data.percent).toFixed(2);
    this.setData({
      baseSGD,
      baseRMB: '100.00',
    })
  },

  canvasGet: function (a, b) {

    new wxCharts(
      {
        canvasId: 'lineCanvas',
        type: 'line',

        categories: a,
        series: [{
          name: '成交量1',
          data: b,
          format: function (val) {
            return val.toFixed(3) + '元';
          }
        }],
        yAxis: {
          title: '每一元新币兑换人民币',
          format: function (val) {
            return val.toFixed(2);
          },
          min: 5
        },
        width: 300,
        height: 180
      });
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
    return {
      title: '新加坡百宝箱',
      path: '/pages/index/index'
    }
  }
})