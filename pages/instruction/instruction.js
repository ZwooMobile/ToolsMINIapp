// pages/instruction/instruction.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbarData: {
      showCapsule: 1,
      title: '旅游须知',
    },
    height: app.globalData.height * 2 + 20,
    list:[
      { image: '../../imgs/currency.jpg', title: '货币', content:'这里使用新加坡元，面值为 2 新元、5 新元、10 新元、50 新元、100 新元、1000 新元和 1 万新元。硬币的面值是 5、10、20 和 50 分以及 1 新元。'},
      { image: '../../imgs/drawback.jpg', title: '退税  ', content: '新加坡执行7%消费税（Goods and Services Tax），来访的游客如果在参与“消费税退税”计划的商店消费 100 新元以上，就可申请退税。' },
      { image: '../../imgs/consolution.jpg', title: '消费者咨询', content: '为了您能购物愉快， 请记得货比三家，在购物前先询问退款规定和保修条款，购物后也请检查收据确保准确无误。' },
      { image: '../../imgs/wifi.jpg', title: '无线网络', content: '游客可凭自己的海外手机号码，在任何 Wireless@SG 热点注册获得免费的公共 Wi-Fi 账户。可能产生国际漫游费用。' },
      { image: '../../imgs/language.jpg', title: '语言', content: '您可以同新加坡人说英语，这里大多数人都精通英语。许多新加坡人还可以说其他语言，通常是华语、马来语或淡米尔语。' },
      { image: '../../imgs/weather.jpg', title: '天气', content: '新加坡全年炎热湿润，气温通常会达到 30 摄氏度以上。您应当随时备好雨具，这里经常有短时暴雨。' },
      { image: '../../imgs/powerSource.jpg', title: '电源插座', content: '新加坡使用的标准电流是 220-240 伏特交流电（50 赫兹），在这里，您可以使用三眼电源插座。' },
      { image: '../../imgs/fee.jpg', title: '小费', content: '当您享受到良好的服务时，我们建议您给小费，通常的标准是您的账单金额的 10%，但有些餐厅和酒店的小费要高一些。' },
      { image: '../../imgs/banSmoking.jpg', title: '禁烟区', content: '所有空调区域都禁止吸烟，例如商场和餐馆。有些娱乐场所和开放型餐厅提供指定吸烟区域。' },
      { image: '../../imgs/water.jpg', title: '安全饮用水', content: '您可以直接饮用自来水，新加坡的饮用水已经达到世界卫生组织标准。您也很方便地买到瓶装水。' },
      { image: '../../imgs/wheelChair.jpg', title: '无障碍设施', content: '新加坡致力于满足各种游客的需求，为老年人、轮椅使用者、视觉或听觉障碍游客提供便利。' },
    ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    app.globalData.share = false
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