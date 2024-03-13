// pages/visa/visa.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarData: {
      showCapsule: 1,
      title: '签证办理',
    },
    height: app.globalData.height * 2 + 20,
    list: [
      { image: 'imgs/sin.png', title: '新加坡签证', content: '中国居民办理新加坡签证' },
      // { image: 'imgs/nine.png', title: '东南亚9国签证', content: '中国居民办理东南亚九国签证' },
      // { image: 'imgs/gat.png', title: '新加坡前往港澳台...', content: '在新加坡申请港澳，台湾，日本，韩国，美国，加拿大旅游签证' },
      // { image: 'imgs/alabo.png', title: '新加坡前往阿拉伯...', content: '在新加坡办理印度和阿拉伯旅游签证' },
      // { image: 'imgs/eur.png', title: '新加坡前往欧洲', content: '新加坡申请申根签攻略，游遍欧洲25国！' },
      // { image: 'imgs/aus.png', title: '新加坡前往澳大利亚...', content: '在新加坡办理澳大利亚、英国、新西兰旅游签证' }
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  jump(e){
    let index = e.currentTarget.dataset.idx
    if(index==0){
      wx.navigateTo({
        url: '../visaSin/visaSin',
      })
    }else{
      wx.navigateTo({
        url: '../visaDetail/visaDetail?id=' + index,
      })
    }
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
