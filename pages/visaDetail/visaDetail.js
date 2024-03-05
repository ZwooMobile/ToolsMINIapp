// pages/visaDetail/visaDetail.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    choose: 0,
    id : '',
    url:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id)
    let id = options.id, navbarData={
      showCapsule: 1,
      title: '',
    }
    if(id == 0){
      navbarData.title='新加坡签证'
      this.setData({
        navbarData: navbarData,
        id:0
      })
    }else if(id==1){
      navbarData.title = '东南亚九国'
      this.setData({
        navbarData: navbarData,
        id: 1,
        url:'https://tools.xiaojishida.net/blog/article/1'
      })
    } else if (id == 2) {
      navbarData.title = '港澳台等'
      this.setData({
        navbarData: navbarData,
        id: 2,
        url: 'https://tools.xiaojishida.net/blog/article/2'
      })
    }
    else if (id == 3) {
      navbarData.title = '印度阿拉伯'
      this.setData({
        navbarData: navbarData,
        id: 3,
        url: 'https://tools.xiaojishida.net/blog/article/3'
      })
    }
    else if (id == 4) {
      navbarData.title = '欧洲'
      this.setData({
        navbarData: navbarData,
        id: 4,
        url: 'https://tools.xiaojishida.net/blog/article/4'
      })
    } else if (id == 5) {
      navbarData.title = '澳大利亚等'
      this.setData({
        navbarData: navbarData,
        id: 5,
        url: 'https://tools.xiaojishida.net/blog/article/5'
      })
    }
  },
  choose(e) {
    console.log(e)
    this.setData({
      choose: e.currentTarget.dataset.id
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