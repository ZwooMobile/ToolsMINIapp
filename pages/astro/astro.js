const app = getApp();
const myhttp = require("../../utils/http.js")

Page({
  data: {
    navbarData: {
      showCapsule: 1,
      title: '今日运势',
    },
    height: app.globalData.height * 2 + 20,
    activeIndex: 1,
    name: '',
    imgUrl: '',
    sourceData: [],
    isSame: true
  },

  onLoad: function() {
    if (wx.getStorageSync('myStar')) {
      let name = wx.getStorageSync('myStar');
      this.setData({ name })
      this.getData(name);
    }

    let imgUrl = this.checkName(this.data.name);
    this.setData({ imgUrl })
  },

  getData(name){
    wx.showLoading({
      title: '正在获取您的运势~',
    })
    wx.setStorageSync('myStar', name);
    myhttp.get(`api/getConstellation?consName=${name}`).then(res => {
      wx.hideLoading();
      if(res.status == 1){
        this.handleData(res.data);
        this.chartInit(res.data[0].all / 100);
        this.setData({
          sourceData : res.data,
          isSame : true
        })
      }
    })
  },

  choiceStar(){
    wx.navigateTo({
      url: `../allStar/allStar?myStar=${this.data.name}`,
    })
  },

  handleData(data){
    data.forEach((r,i) => {
      if(i == 0 || i == 1){
        r.date = r.date.substring(0, 4) + '年' + r.date.substring(4, 6) + '月'
          + r.date.substring(6, 8) + '日';
        r.health = Math.round(r.health * 1 / 20);
        r.love = Math.round(r.love * 1 / 20);
        r.work = Math.round(r.work * 1 / 20);
      }
      if (i == 2) r.all = Math.round(r.all * 1 / 20);
    })
  },

  bindDateChange: function (e) {
    let date = e.detail.value;
    wx.setStorageSync("birthday", date)
    this.getData(parseInt(date.split('-')[1]), parseInt(date.split('-')[2]),true);
    this.setData({
      date
    })
  },

  tabItemTap(e){
    let index = e.currentTarget.dataset.index;
    if(index == 1 || index == 2){
      this.chartInit(this.data.sourceData[index - 1].all / 100);
    }
    this.setData({
      activeIndex : index
    })
  },

  //初始化
  chartInit(percent = 0.86){
    this.loading('all', percent, '综合指数', ['#6666cc', '#6666cc','#6E6E6E']);
  },

  //画环
  paint(id,a,text,title,colorArr){
    let ctx = wx.createCanvasContext(id);
    ctx.beginPath();
    ctx.setLineWidth(8)
    ctx.setStrokeStyle(colorArr[0]);
    ctx.clearRect(0, 0, 100, 100)
    ctx.arc(50, 50, 40, -0.5 * Math.PI, a);
    ctx.stroke()
    ctx.setTextAlign('center')
    ctx.setTextBaseline('middle')
    ctx.setFontSize(18);
    ctx.setFillStyle(colorArr[1])
    ctx.fillText(text, 50, 50)
    ctx.setTextAlign('center')
    ctx.setTextBaseline('bottom')
    ctx.setFontSize(18);
    ctx.setFillStyle(colorArr[2])
    ctx.fillText(title, 50,125);
    ctx.draw()
  },

  //动态填充
  loading(id,percent = 1,title = '标题',colorArr = ['#fff','#fff','#fff']){
    let a = -0.5 * Math.PI;
    let text = '';
    let timmer = setInterval(() => {
      if (a < Math.PI * 2 * percent - 0.5 * Math.PI) {
        text = parseInt(((a + 0.5 * Math.PI) / (Math.PI * 2)) * 100) + '%';
        this.paint(id, a, text, title, colorArr);
        a += 0.1;
      } else {
        text = percent * 100 + '%';
        this.paint(id, a, text, title, colorArr);
        clearInterval(timmer);
      }
    }, 20)
  },

  //根据星座获取图片url
  checkName(name){
    switch(name){
      case '白羊座': return 'aries';
      case '金牛座': return 'taurus';
      case '双子座': return 'gemini';
      case '巨蟹座': return 'cancer';
      case '狮子座': return 'leo';
      case '处女座': return 'virgo';
      case '天秤座': return 'libra';
      case '天蝎座': return 'scorpio';
      case '射手座': return 'sagittarius';
      case '摩羯座': return 'capricorn';
      case '水瓶座': return 'aquarius';
      case '双鱼座': return 'pisces';
      default: return 'virgo';
    }
  },

  onShow(e){
    !this.data.isSame && this.getData(this.data.name);
    let imgUrl = this.checkName(this.data.name);
    this.setData({ imgUrl })
  },
  
  onShareAppMessage: function() {
      
  }
});