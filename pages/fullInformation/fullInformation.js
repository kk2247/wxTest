// pages/fullInformation/fullInformation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:['校卡','其他证件','其他'],
    contactArray:['QQ','微信','电话'],
    contactIndex:0,
    index:0,
    tip:'学号',
    tipText:'学号',
    losttype:'schoolcard',
    addUrl: "http://localhost:8081/lostandfound/superadmin/addschoolcard"
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

  selectType:function(e){
    var newIndex = e.detail.value; 
    this.setData({
      index: e.detail.value
    });
    if (newIndex == 1) {
      this.setData({
        tip:'持卡人名称',
        tipText:'失主姓名',
        losttype:'card',
        addUrl: "http://localhost:8081/lostandfound/superadmin/addcard",
      });
    } else if (newIndex==0){
      this.setData({
        tip: '学号',
        tipText: '学号',
         losttype: 'schoolcard',
         addUrl: "http://localhost:8081/lostandfound/superadmin/addschoolcard",
      });
    }else{
      this.setData({
        tip: '特征描述',
        tipText: '颜色什么的啊',
        losttype: 'others',
        addUrl:"http://localhost:8081/lostandfound/superadmin/addothers",
      })
    }
  },

  selectContact: function (e) {
    var newIndex = e.detail.value;
    this.setData({
      contactIndex: e.detail.value
    });
    
  },

  formSubmit: function (e) {
    var that = this;
    var formData = e.detail.value;
    formData.contactWay=that.data.contactArray[that.data.contactIndex]+":"+formData.contact;
    var url = that.data.addUrl;
    wx.request({
      url: url,
      data: JSON.stringify(formData),
      method: 'POST',
      header: {
        'Content-type': 'application/json'
      },
      success: function (res) {
        var result = res.data.success
        var toastText = "操作成功!";
        if (result != true) {
          toastText = "操作失败" + res.data.errMsg;
        }
        wx.navigateTo({
          url: '../submitPictures/submitPictures?lostThingId='+result,
        })
      }
      
    })
  }
})