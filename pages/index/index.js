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
    pageData: {},
    maskDisplay: 'none',
    slideAnimation: '',
    ballBottom: 20,
    ballRight: 20
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
      for(var i=0; i< images.length; i++){
        //地址被封，换地址
        images[i].url = images[i].url.replace("ww","ws");
      }
      _this.setData({imageUrls: images});
      console.log(images);
      
      _this.setData({pageData: results});
    },() => {
      console.log('callbackerror');
    },() => {
      console.log('callbackcomplete');
    })
  },
  //slide up
   ballClickEvent: function() {
    slideUp.call(this);
  },
  slideCloseEvent: function() {
    slideDown.call(this);
  },
  //浮动球移动事件
  ballMoveEvent: function( e ) {
    var touchs = e.touches[ 0 ];
    var pageX = touchs.pageX;
    var pageY = touchs.pageY;
    if( pageX < 25 ) return;
    if( pageX > this.data.screenWidth - 25 ) return;
    if( this.data.screenHeight - pageY <= 25 ) return;
    if( pageY <= 25 ) return;
    var x = this.data.screenWidth - pageX - 25;
    var y = this.data.screenHeight - pageY - 25;
    this.setData( {
      ballBottom: y,
      ballRight: x
    });
  },
  toCategory: function(category) {
    wx.navigateTo({
      url: '../category/category',
    })
  }
});

  function slideUp(){
    var animation = wx.createAnimation({
      duration:600
    });
    this.setData({maskDisplay: 'block'});
    animation.left('0%').step();
    this.setData({slideAnimation: animation.export()});
  }

function slideDown() {
    var animation = wx.createAnimation({
      duration:400
    });
    animation.left('-70%').step();
    this.setData({slideAnimation: animation.export()});
    this.setData({maskDisplay: 'none'});
}