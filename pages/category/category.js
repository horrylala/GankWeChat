var request = require('../../request/request.js');
var util = require('../../utils/util.js');

Page({
  data:{
    category:"Page category",
    categoryData: {},
    //请求页数
    page: 1
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
    this.setData({category: options.category});
  },
  onReady:function(){
    // 页面渲染完成
    var categoryObj = {
      categery: this.data.category,
      size: 10,
      page: 1
    }
    request.getNewsCategory(categoryObj, (res) =>{
       var categories = res.data.results;
       if(this.data.category=='福利'){
           for(var i =0; i<categories.length; i++){
             categories[i].url = categories[i].url.replace("ww","ws");
            }
       }
      this.setData({categoryData: categories})
    },null,null)
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  loadingMore: function() {
    var categoryObj = {
      categery: this.data.category,
      size: 10,
      page: this.data.page + 1
    }
    request.getNewsCategory(categoryObj, (res) =>{
      this.setData({categoryData: this.data.categoryData.concat(res.data.results)});
    },null,null)
  }
})