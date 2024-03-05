const app = getApp()
Component({
  properties: {
    navbarData: {   //navbarData   由父页面传递的数据，变量名字自命名
      type: Object,
      value: {
        isHome: false,
        showCapsule: 1
      }
    },
    bgColor: {
      type: String,
      value: 'rgba(0, 0, 0, 0)',
      
    },
    textColor: {
      type: String,
      value: '#000'
    },
    theme: {
      type: String,
      value: 'd'
    }
  },
  data: {
    height: '',
  },
  attached: function () {
    // 获取是否是通过分享进入的小程序
    this.setData({
      share: app.globalData.share
    })
    // 定义导航栏的高度   方便对齐
    this.setData({
      height: app.globalData.height
    })
  },
  methods: {
    // 返回上一页面
    _navback() {
      wx.navigateBack()
    },
    //返回到首页
    _backhome() {
      console.log('home')
      wx.navigateTo({
        url: '/pages/index/index',
      })
    }
  }

}) 