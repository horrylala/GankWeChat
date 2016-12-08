var api = require("api.js");
var util = require('../utils/util.js')


// requestData
function requestData(url, data, successCallback, errorCallback, completeCallback){
    wx.request({
      url: url,
      data: data,
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function(res){
        // success
        console.log( 'response data: ', res );
        if(res.statusCode == 200)
          return util.isFunction(successCallback) && successCallback(res);
        else
          return util.isFunction(errorCallback) && errorCallback();
      },
      fail: function() {
        // fail
        return util.isFunction(errorCallback) && errorCallback();
      },
      complete: function() {
        // complete
      return util.isFunction(completeCallback) && completeCallback();
      }
    })
}

function getNewsDay(date, successCallback, errorCallback, completeCallback){
  return requestData(api.getDayNews(date.year, date.month, date.day), {}, successCallback, errorCallback, completeCallback);
}

function getNewsCategory(categeryObj,successCallback, errorCallback, completeCallback){
  return requestData(api.getCategoryNews(categeryObj.categery, categeryObj.size, categeryObj.page), {}, successCallback, errorCallback, completeCallback);
}
module.exports = {
  getNewsDay: getNewsDay,
  getNewsCategory: getNewsCategory
}