//app.js
const recent7days = require('./utils/recent7days');//应用模块
App({
  onLaunch: function () {
    this.get_openId();
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
    var show_echart = wx.getStorageSync('show_echart');
    // console.log(show_echart);
    // console.log(show_echart[0].time)
    if(show_echart.length > 0 && (show_echart[0].time != recent7days.formatDate(new Date()))){
      // console.log(recent7days.formatDate(new Date()))
      show_echart[0].display = false;
      wx.setStorageSync('show_echart', show_echart);
    }
  },
  
  globalData: {
    hourlog: [],
    datalog: [],
    logscate: 0,
    userInfo: null,
    canConvert: 0,
    index: 0,
    boardArr: [
      {
        icon: 'work',
        text: '工作'
      },
      {
        icon: 'study',
        text: '学习',
      },
      {
        icon: 'think',
        text: '思考',
      },
      {
        icon: 'write',
        text: '写作',
      },
      {
        icon: 'sport',
        text: '运动',
      },
      {
        icon: 'custom',
        text: '自定义',
      }
    ],
  },

  get_openId : function(){
    var openid = wx.getStorageSync('openid') || [];
    if(openid=='' || openid==undefined){
      wx.cloud.init({ env: 'cloud1-6g5wybika29da54a' })
      const db = wx.cloud.database()
      const _ = db.command
      wx.cloud.callFunction({
        // 云函数名称
        name: 'getopen_id',
        success: function (res) {
          openid = res.result.openid
          wx.setStorageSync('openid', openid)
        },
        fail: console.error
      })
    }
  }
})