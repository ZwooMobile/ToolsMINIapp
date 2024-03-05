// pages/allStar/allStar.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarData: {
      showCapsule: 1,
      title: '我的星座',
    },
    height: app.globalData.height * 2 + 20,
    starData: [
      {
        title : '白羊座',
        icon : 'aries',
        date : '3.21~4.19'
      },
      {
        title: '金牛座',
        icon: 'taurus',
        date : '4.20~5.20'
      },
      {
        title: '双子座',
        icon: 'gemini',
        date: '5.21~6.21'
      },
      {
        title: '巨蟹座',
        icon: 'cancer',
        date: '6.22~7.22'
      },
      {
        title: '狮子座',
        icon: 'leo',
        date: '7.23~8.22'
      },
      {
        title: '处女座',
        icon: 'virgo',
        date: '8.23~9.22'
      },
      {
        title: '天秤座',
        icon: 'libra',
        date: '9.23~10.23'
      },
      {
        title: '天蝎座',
        icon: 'scorpio',
        date: '10.24~11.22'
      },
      {
        title: '射手座',
        icon: 'sagittarius',
        date: '11.23~12.21'
      },
      {
        title: '摩羯座',
        icon: 'capricorn',
        date: '12.22~1.19'
      },
      {
        title: '水瓶座',
        icon: 'aquarius',
        date: '1.20~2.12'
      },
      {
        title: '双鱼座',
        icon: 'pisces',
        date: '2.19~3.20'
      }
    ],
    myStar : '白羊座'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    options.myStar && 
    this.setData({ myStar : options.myStar })
  },

  selectStar(e){
    let myStar = e.currentTarget.dataset.id;
    this.setData({ myStar })
  },

  save(){
    let pages = getCurrentPages();
    let prevPage = pages[pages.length - 2];
    if (prevPage.data.name != this.data.myStar){
      prevPage.setData({
        name : this.data.myStar,
        isSame : false
      });
    }else{
      prevPage.setData({
        isSame : true
      })
    }
    wx.navigateBack({//返回
      delta: 1
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