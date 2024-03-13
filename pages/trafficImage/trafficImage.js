// pages/trafficImage/trafficImage.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarData: {
      showCapsule: 1, //是否显示左上角图标   1表示显示    0表示不显示
      isHome: false,
      title: '实时路况', //导航栏 中间的标题
    },
    // 此页面 页面内容距最顶部的距离
    height: app.globalData.height * 2 + 20,
    totalList: [
      {
        gate: 'Woodlands Checkpoint Area',
        road: [
          {
            name: 'WOODLANDS CAUSEWAY – TOWARDS JOHOR',
            url: 'https://odis.sgp1.digitaloceanspaces.com/node/woodland_to_johor'
          },
          {
            name: 'WOODLANDS CHECKPOINT – TOWARDS BKE',
            url: 'https://odis.sgp1.digitaloceanspaces.com/node/Woodland_to_BKE'
          },
          {
            name: 'WOODLANDS FLYOVER – TOWARDS CHECKPOINT',
            url: 'https://odis.sgp1.digitaloceanspaces.com/node/Woodlands_Flyover'
          }
        ]
      },
      {
        gate: 'Tuas Checkpoint Area',
        road: [
          {
            name: 'TUAS SECOND LINK',
            url: 'https://odis.sgp1.digitaloceanspaces.com/node/Tuas_second_link'
          },
          {
            name: 'TUAS CHECKPOINT',
            url: 'https://odis.sgp1.digitaloceanspaces.com/node/Tuas_Checkpoint'
          },
          {
            name: 'AFTER TUAS WEST ROAD',
            url: 'https://odis.sgp1.digitaloceanspaces.com/node/After_Tuas_West'
          }
        ]
      },
      {
        gate: 'Second Link Checkpoint Area',
        road: [
          {
            name: 'SECOND LINK MALAYSIA 1.3KM',
            url: 'https://odis.sgp1.digitaloceanspaces.com/node/second_link_1.3'
          }
        ]
      }
    ],
    array: [
      'Woodlands Checkpoint Area',
      'Tuas Checkpoint Area',
      'Second Link Checkpoint Area',
      'All'
    ],
    imgList: [],
    index:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      imgList : this.data.totalList[0].road
    })
  },

  bindPickerChange: function (e) {
    let index = e.detail.value;
    this.setData({ index })
    const totalRoad = this.data.totalList.reduce((t,r,i) => {
      return (i == 1) ? t.road.concat(r.road) : t.concat(r.road)
    })
    let imgList = (index < 3) ? this.data.totalList[index].road : totalRoad;
    this.setData({ imgList })
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
