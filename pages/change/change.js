// pages/fullInformation/fullInformation.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tip: '学号',
    lostThingName:'',
    lostType:'',
    lostName:'',
    description:'',
    lostTime:'',
    place:'',
    contactWay:'',
    lostThingId:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    if (options.lostThingId == undefined) {
      return "";
    }
    this.setData({
      lostThingId: options.lostThingId
    });
    wx.request({
      url: "http://localhost:8081/lostandfound/superadmin/getlostbyid",
      data: { 'lostId': options.lostThingId },
      method: 'GET',
      success: function (res) {
        var lost = res.data.lost;
        if (lost == undefined) {
          var toastText = "获取数据失败" + options.lostThingId;
          wx.showToast({
            title: toastText,
            icon: '',
            duration: 2000
          });
        } else {
          that.setData({
            lostThingName: lost.name,
            lostType: lost.type,
            description:lost.description,
            lostTime: lost.lostTime,
            place: lost.place,
            contactWay: lost.contactWay,
          });
          if(lost.type==2){
            that.setData({
              tip: '持有者信息'
            });
          }else if(lost.type==3){
            that.setData({
              tip: '特征'
            });
          }
        }
      }
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

  confirm:function(){

  },
  
  deletelost:function(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要删除[' + this.data.lostThingName + ']吗？',
      success: function (sm) {
        if (sm.confirm) {
          wx.request({
            url: 'http://localhost:8081/lostandfound/superadmin/removelost',
            data: { "lostThingId": that.data.lostThingId },
            method: 'GET',
            success: function (res) {
              var result = res.data.success;
              var toastText = "删除成功";
              if (result != true) {
                toastText = "删除失败";

              } else {
                wx.showToast({
                  title: toastText,
                  icon: '',
                  duration: 2000
                });
                wx.redirectTo({
                  url: '../choosePage/choosePage',
                })
              }
            }
          })
        }
      }
    })
  },

  confirm: function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定要领取[' + this.data.lostThingName + ']吗？',
      success: function (sm) {
        if (sm.confirm) {
          wx.request({
            url: 'http://localhost:8081/lostandfound/superadmin/confirm',
            data: { "lostThingId": that.data.lostThingId },
            method: 'GET',
            success: function (res) {
              var result = res.data.success;
              var toastText = "领取成功";
              if (result != true) {
                toastText = "领取失败";

              } else {
                wx.showToast({
                  title: toastText,
                  icon: '',
                  duration: 2000
                });
                wx.navigateBack({
                  delta: 3
                })
              }
            }
          })
        }
      }
    })
  }
})