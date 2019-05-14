// pages/submitPictures/submitPictures.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgsrc:'d74273722e676a73682b9526eeeb07ea.jpg',
    lostThingId:'12'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      lostThingId:options.lostThingId
    })
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

  addFile: function (e) {
    var that = this;
    wx.chooseImage({
      success: function (res) {
        var tempFilePaths = res.tempFilePaths;
        var number = that.data.lostThingId;
        wx.uploadFile({
          url: 'http://localhost:8081/lostandfound/superadmin/uploadfile',
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': number,
          },
          success: function (res) {
            var success = res.data.result;
            var toastText;
            if (success == true) {
              toastText = "提交成功";
            } else {
              toastText = "提交失败";
            }
            wx.showToast({
              title: toastText,
              icon: '',
              duration: 200
            })
            wx.redirectTo({
              url: '../choosePage/choosePage',
            })
            //do something
          }
        })
      }
    })
  },
})