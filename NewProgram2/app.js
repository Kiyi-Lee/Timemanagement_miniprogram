//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    // var Logsys = wx.getStorageSync('Logsys') || []
    // Logsys.unshift(Date.now())
    // wx.setStorageSync('Logsys', Logsys)
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  globalData: {
    userInfo: null,
    canConvert:0,
    index:0,
  }
})