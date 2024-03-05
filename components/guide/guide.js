// components/guide.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {},

  /**
   * 组件的初始数据
   */
  data: {
    isHidden : true,
    height: app.globalData.height * 2 + 20,
    share: app.globalData.share
  },

  attached() {
    
  },

  lifetimes:{
    attached: function () {
      if (!wx.getStorageSync('isHidden')) {
        this.setData({
          isHidden: false
        })
      }
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {
    iKnow(){
      wx.setStorageSync('isHidden',true);
      this.setData({ isHidden : true })
    }
  }
})
