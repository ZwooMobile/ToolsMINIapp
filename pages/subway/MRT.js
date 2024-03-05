// pages/subway/MRT.js
const app = getApp()
var subwayList = require('../../utils/subway.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarData: {
      showCapsule: 1, 
      title: 'MRT', 
    },
    height: app.globalData.height * 2 + 20,   
    start:'',
    end:'',
    showRoute: false,
    showmap:true,
    showStation:false,
    notification:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.request({
      url: 'https://tools.xiaojishida.net/api/mrtNotification',
      success: res => {
        console.log(res)
        if (res.data.results.length > 0){
          this.setData({
            notification: res.data.results[0].message.split('http://bit.ly/2VuZ0sB')[0]
          })
        }
      }
    })
  },


  start(){
    wx.navigateTo({
      url: '../subway/subway?type=start',
    })
  },

  end() {
    wx.navigateTo({
      url: '../subway/subway?type=end',
    })
  },
  change(){
    wx.showLoading({
      title: '玩命加载中',
    })
    var start = this.data.start,
    startId = this.data.startId,
    end = this.data.end,
    endId = this.data.endId,
    that = this
    if (start != '' || end!=''){
      this.setData({
        start:end,
        startId:endId,
        end:start,
        endId:startId,
      })
      if (start != '' && end != ''){
        that.setData({
          showRoute: false
        })
        that.calculateRoute(that.data.startId, that.data.endId)
      }
    }
  },


  calculateRoute(start, end){
    this.setData({
      showStation: false
    })
    var that = this
    wx.request({
      url: 'https://tools.xiaojishida.net/api/getRoute',
      data:{
        start:this.data.startId,
        end:this.data.endId
      },
      method:'POST',
      success(res){
        wx.hideLoading()
        console.log(res)
        var route = res.data.route
        route[0][0].color = route[0][1].color
        // 方向表  a>b>c>
        var towardList = []
        var routeList = [],time=0,distance=0
        for(var i=0;i<route.length;i++){
          towardList.push(route[i][route[i].length-1].color)
          routeList=routeList.concat(route[i])
        }
        for (var j = 0; j < routeList.length; j++) {
          time += routeList[j].time
          distance +=routeList[j].distance
        }
        // console.log(time)
     

        that.setData({
           showRoute:true,
           route:{
             route: route,
             towardList: towardList,
             time:time,
             distance:distance.toFixed(1)
           }
        })
        console.log(that.data.route)
      },
      fail(err){
        console.log(err)
      }
    })
  },




  showimage(){
    wx.previewImage({
      urls: ['https://tools.xiaojishida.net/media/imgs/maps.png'] // 需要预览的图片http链接列表
    })
  },
  showStation(){
    this.setData({
      showStation:true
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
    if (this.data.type == 'start') {
      this.setData({
        start: this.data.name,
        startId: this.data.nameId
      })
    } else if (this.data.type == 'end') {
      this.setData({
        end: this.data.name,
        endId: this.data.nameId
      })
    }
    if (this.data.start != '' && this.data.end != '' && (this.data.end != this.data.start)){
      wx.showLoading({
        title: '玩命加载中',
      })
      this.calculateRoute(this.data.startId, this.data.endId)
    }
  },


  // 根据英文名称获取站点
  filterStation(a){
    var str = JSON.stringify(subwayList)
    var list = JSON.parse(str)
    return list.filter(item =>
      item.name == a
    )[0]
  },

  // 根据nameid获取站点
  nameIDfilterStation(a) {
    var str = JSON.stringify(subwayList)
    var list = JSON.parse(str)
    return list.filter(item =>
      item.nameId == a
    )[0]
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