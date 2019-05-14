// pages/showLost/showLost.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    choice:'listschoolcard',
    description:'学号',
    tip:'请输入学号',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if(options.choice=="listcard"){
      this.setData({
        choice: options.choice,
        description:'持有者名称',
        tip:'请输入失主姓名'
      })
    } else if (options.choice == "listothers"){
      this.setData({
        choice: options.choice,
        description: '特点',
        tip:'请输入颜色等特征，搜索未必精准',
      })
    }else{
      this.setData({
        choice: options.choice
      })
    }
    

  
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
    var that = this;
    wx.request({
      url: 'http://localhost:8081/lostandfound/superadmin/'+this.data.choice,
      method: 'GET',
      data: {},
      success: function (res) {
        var list = res.data.list;
        if (list == null) {
          var toastText = '获取数据失败' + res.data.errMsg;
          wx.showToast({
            title: toastText,
            icon: 'loading',
            duration: 2000
          });
        } else {
          that.setData({
            list: list
          })
        }
      }
    })
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
  
  },

  checkInformation:function(){
    wx.navigateTo({
      url: '../change/change?lostThingId=',
    })
  },

  formSubmit:function(e){
    var that = this;
    var formData = e.detail.value;
    wx.request({
      url: 'http://localhost:8081/lostandfound/superadmin/getlostbydescription',
      method: 'GET',
      data: {"description":formData.text},
      success: function (res) {
        var result = res.data.success
        var toastText = "操作成功!";
        that.setData({
          list: res.data.lost
        })
      }
    })
  }
})