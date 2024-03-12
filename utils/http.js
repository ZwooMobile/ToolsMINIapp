// const HTTP_URL = "http://192.168.2.161:8000/";
// const HTTP_URL = "https://tools.xiaojishida.net/";
// const HTTP_URL = "https://38m8925n07.imdo.co/";
const HTTP_URL = "https://api.gowhere.asia/";
const HTTP_Method = {GET : 'GET',POST : 'POST',PUT : 'PUT',DELETE : 'DELETE'};

const get = (url,data = {}) => {
  return new Promise((resolve,reject) => {
    wx.request({
      url: HTTP_URL + url,
      method: HTTP_Method.GET,
      data,
      success : res => {
        resolve(res.data);
      },
      fail : err => {
        reject(err)
      }
    })
  })
}

const post = (url,data = {}) => {
  return new Promise((resolve,reject) => {
    wx.request({
      url: HTTP_URL + url,
      method: HTTP_Method.POST,
      data,
      success : res => {
        resolve(res.data);
      },
      fail : err => {
        reject(err);
      }
    })
  })
}

module.exports = {
  get,
  post
}
