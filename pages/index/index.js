//index.js
//获取应用实例
const app = getApp()
const util = require("../../utils/weather.js");
const myhttp = require("../../utils/http.js");

Page({
  data: {
    navbarData: {
      showCapsule: 1,
      isHome: true,
      title: '狮城百宝箱',
    },
    height: app.globalData.height * 2 + 20,
    rmb : '',
    sgd : '',
    show_tip : false,
    tools:[
      {
        img:'../../imgs/tools/bus.png',
        title:'公交',
        subtitle:'Bus',
        page:'bus'
      }, {
        img: '../../imgs/tools/subway.png',
        title: '地铁',
        subtitle: 'MRT',
        page:'subway/MRT'
      },
      // {
      //   img: '../../imgs/tools/recharge.png',
      //   title: '手机充值',
      //   subtitle: 'Top up',
      //   jump:'recharge',
      // },
      {
        img: '../../imgs/tools/contact.png',
        title: '常用号码本',
        subtitle: 'Contact',
        page: 'contact'
      },
      // {
      //   img: '../../imgs/tools/4D.png',
      //   title: '万字票',
      //   subtitle: '4D',
      //   jump:'fourD'
      // }, {
      //   img: '../../imgs/tools/TOTO.png',
      //   title: '彩票',
      //   subtitle: 'TOTO',
      //   jump:'TOTO'
      // },
      {
        img: '../../imgs/tools/ticket.png',
        title: '特价门票',
        subtitle: 'Attractions',
        page:'ticket?'
      },
      // {
      //   img: '../../imgs/tools/food.png',
      //   title: '餐饮团购',
      //   subtitle: 'Food',
      //   jump:'food'
      // },
      {
        img: '../../imgs/tools/calendar.png',
        title: '新加坡黄历',
        subtitle: 'Calendar',
        page: 'calendar'
      }, {
        img: '../../imgs/tools/tour.png',
        title: '旅游须知',
        subtitle: 'Tourist Notes',
        page: 'instruction'
      },
      // {
      //   img: '../../imgs/tools/plane.png',
      //   title: '机票促销',
      //   subtitle: 'Promotion',
      //   jump:'promo'
      // },
      // {
      //   img: '../../imgs/tools/video.png',
      //   title: '实时路况',
      //   subtitle: 'Traffic',
      //   page: 'traffic'
      // },
      // {
      //   img: '../../imgs/tools/constellation.png',
      //   title: '星座运势',
      //   subtitle: 'Constellation',
      //   page: 'constellation'
      // },
      // {
      //   img: '../../imgs/tools/pr.png',
      //   title: '永久居民',
      //   subtitle: 'PR',
      //   page: 'pr'
      // },
      {
        img: '../../imgs/tools/visa.png',
        title: '签证',
        subtitle: 'Visa',
        page: 'visa'
      },
      // {
      //   img: '../../imgs/tools/study.png',
      //   title: '留学须知',
      //   subtitle: 'Study Abroad',
      //   page: 'study'
      // }
    ],
    weather:{},
    loadingWeather:true,
    loadingExchange:true
  },
  //事件处理函数

  onLoad: function () {
    this.getWeather()
    this.getExchange();
    if(!wx.getStorageSync('token')){
      this.setData({ show_tip : true })
    }
  },

  toPage(e){
    let url = e.currentTarget.dataset.id;
    if(url.indexOf('?') > -1){
      wx.navigateToMiniProgram({
        appId: 'wx82e96075b0aa72d0',
        path: 'pages/ex_index/index'
      })
      return;
    }
    url = (url.indexOf('/') == -1) ? `../${url}/${url}` : `../${url}`;
    wx.navigateTo({url})
  },

  exchange(){
    wx.navigateTo({
      url: `../exchange/exchange?num=${this.data.rmb}&exchange=${this.data.exchange}`
    })
  },

  iKnow(){
    this.setData({ show_tip : false });
    wx.setStorageSync('token', 'true');
  },

  getWeather(){
    var that=this
    wx.request({
      url: app.globalData.base_url+'api/tool/getWeather',
      success(res){
        console.log(res)
        var weather=res.data
        //中文天气
        weather.cn = util.getWeatherCN(weather.forecast);
        weather.forecast = app.globalData.base_url+"weather/" + util.getWeatherEN(weather.forecast) + ".png"
        that.setData({
          weather: weather,
          loadingWeather:false
        })
      }
    })
  },

  getExchange(){
    myhttp.get("api/tool/getExchange").then(res => {
      console.log(res);
      // let exchange = JSON.stringify(res.data)
      // let rmb = res.data[0].SGD2CNY.toFixed(2);
      // let sgd = res.data[0].CNY2SGD.toFixed(2);
      let exchange = JSON.stringify(res)
      let rmb =parseFloat(res.SGD2CNY).toFixed(2);
      let sgd =parseFloat(res.CNY2SGD).toFixed(2);
      this.setData({ rmb, sgd, exchange, loadingExchange: false })
    })
  },

  food() {
    wx.navigateToMiniProgram({
      appId: 'wx82e96075b0aa72d0',
      path: 'pages/food/food'
    })
  },

  onReady: function () {
    app.globalData.share = false
  },
  onUnload(){

  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
