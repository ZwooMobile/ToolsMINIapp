const weather = {
  "Showers" : "阵雨",
  "PassingShowers" : "过境阵雨",
  "ThunderyShowers" : "雷阵雨",
  "Cloudy" : "多云",
  "Sunny"  :  "晴",
  "Fair" : "晴转多云",
  "Fair&Warm" : "晴",
  "Overcast" : "阴",
  "LightRain" : "小雨",
  "ModerateRain" : "中雨",
  "HeavyRain" : "大雨",
  "PartlyCloudy" : "局部多云",
  "Windy" : "大风",
  "Hazy": "雾霾",
  "SlightlyHazy": "轻度雾霾",
}

const getWeatherCN = (en) => {
  //去除空格以及括号内容
  en = en.replace(/ |\([^\)]*\)/g, '');
  return weather[en];
}

const getWeatherEN = (en) => {
  let str = en.replace(/ |\([^\)]*\)/g, '');
  if  (str.indexOf('Fair') > -1) str = 'Fair'
  if (str == 'PassingShowers') str = 'Showers'
  return str;
}

module.exports = {
  getWeatherCN,
  getWeatherEN
}