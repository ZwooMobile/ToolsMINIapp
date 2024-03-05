// pages/subway/subway.js
var a = require('../../utils/subway.js')
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarData: {
      showCapsule: 1,
      title: '站点详情',
    },
    height: app.globalData.height * 2 + 20,   
    subwayList: [],
    searchList: [],
    type: '',
    search: false,
    filterList: [
      { line: 'EW', color: '#339933', name: 'East West line', filter: ['EW', 'CG'] },
      { line: 'NS', color: '#CC3333', name: 'North South Line', filter: ['NS'] },
      { line: 'NE', color: '#663399', name: 'North East line', filter: ['NE'] },
      { line: 'CC', color: '#FF9933', name: 'Circle Line', filter: ['CC', 'CE'] },
      { line: 'DT', color: '#336699', name: 'Downtown Line', filter: ['DT'] },
      { line: 'BP', color: '#999999', name: 'Bukit Panjang LRT', filter: ['BP'] },
      { line: 'SK', color: '#999999', name: 'SengKang LRT', filter: ['SE', 'SW', 'STC'] },
      { line: 'PG', color: '#999999', name: 'Punggol LRT', filter: ['PE', 'PW', 'PTC'] },
    ],
    filterIndex: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var subwayList = this.filterFirst('EW').sort(this.sortSubway)
    subwayList = subwayList.concat(this.filterFirst('CG').sort(this.sortSubway))
    this.setData({
      subwayList: subwayList,
      type: options.type
    })
  },
  filterFirst(line) {
    let newData = []
    var str = JSON.stringify(a)
    var data = JSON.parse(str) 
    data = data.filter((items, index) => {
      newData[index] = items
      newData[index].code = items.code.filter(res =>
        res.substring(0, 2) == line
      )
      return newData[index].code.length == 1
    })
    return data
  },
  sortSubway(a, b) {
    return parseInt(a.code[0].slice(2, 4)) - parseInt(b.code[0].slice(2, 4))
  },
  bindFilter(e) {
    var line = this.data.filterList[e.currentTarget.dataset.line].filter
    var subwayList = []
    for (var i = 0; i < line.length; i++) {
      subwayList = subwayList.concat(this.filterFirst(line[i]).sort(this.sortSubway))
    }
    // console.log(a)
    this.setData({
      filterIndex: e.currentTarget.dataset.line,
      subwayList: subwayList
    })
  },
  bindinput(e) {
    var str = JSON.stringify(a)
    var data = JSON.parse(str)
    var dataTwo = JSON.parse(str)
    var searchWord = e.detail.value
    var newData = [], that = this
    if (searchWord.length != 0) {
      data = data.filter(item =>
        item.name.toLowerCase().indexOf(searchWord.toLowerCase()) > -1
      )
      dataTwo = dataTwo.filter(item =>
        item.cnname.indexOf(searchWord) > -1
      )
      that.setData({
        searchList: newData.concat(data).concat(dataTwo),
        search: true
      })
    } else {
      that.setData({
        searchList: [],
        search: false
      })
    }
  },
  chooseMRT(e) {
    // console.log(e.currentTarget.dataset.id)
    var nameId = e.currentTarget.dataset.id
    var name = e.currentTarget.dataset.name
    let pages = getCurrentPages(); //获取当前页面js里面的pages里的所有信息。

    let prevPage = pages[pages.length - 2];

    //prevPage 是获取上一个页面的js里面的pages的所有信息。 -2 是上一个页面，-3是上上个页面以此类推。

    prevPage.setData({  // 将我们想要传递的参数在这里直接setData。上个页面就会执行这里的操作。
      type: this.data.type,
      nameId: nameId,
      name: name
    })

    //上一个页面内执行setData操作，将我们想要的信息保存住。当我们返回去的时候，页面已经处理完毕。


    //最后就是返回上一个页面。

    wx.navigateBack({

      delta: 1  // 返回上一级页面。

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
    return {
      title: '新加坡百宝箱',
      path: '/pages/MRT/MRT'
    }
  }
})