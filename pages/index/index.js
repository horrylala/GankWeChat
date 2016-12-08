//index.js
//获取应用实例
var app = getApp();
var request = require('../../request/request.js');
var util = require('../../utils/util.js');
Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    // imageUrls: [
    //   'http://img02.tooopen.com/images/20150928/tooopen_sy_143912755726.jpg',
    //   'http://img06.tooopen.com/images/20160818/tooopen_sy_175866434296.jpg',
    //   'http://img06.tooopen.com/images/20160818/tooopen_sy_175833047715.jpg'
    // ],
    imageUrls:[],
    indicatorDots: true,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    pageData: {}
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    });
  },
  onReady: function() {
    console.log('onReady');
    var _this = this;
    var date = util.getCurrentDate();
    request.getNewsDay(date, (data) => {
      console.log(data);
      var category = data.data.category;
      var results = data.data.results;
      var images = results.福利;
      _this.setData({imageUrls: images});
      console.log(images);
      _this.setData({pageData: results});
    },() => {
      console.log('callbackerror');
    },() => {
      console.log('callbackcomplete');
    })
  }
})
