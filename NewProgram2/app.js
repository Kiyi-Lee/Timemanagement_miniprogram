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
    hourlog: [],
    datalog: [],
    logscate: 0,
    userInfo: null,
    canConvert:0,
    index:0,
    boardArr:[
      {
        icon:'work',
        text:'工作'
      },
      {
        icon:'study',
        text:'学习',
      },
      {
        icon:'think',
        text:'思考',
      },
      {
        icon:'write',
        text:'写作',
      },
      {
        icon:'sport',
        text:'运动',
      },
      {
        icon:'custom',
        text:'自定义',
      }
    ],
  }
})