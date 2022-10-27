// pages/tap6/tap6.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show_introduce: false,
    show_logs: false,
    show_tips: false,
  },

  display_detail(e) {
    var index = e.currentTarget.dataset.index
    if(index == 'show_introduce'){
      this.setData({
        show_introduce: true,
        show_logs: false,
        show_tips: false
      })
    } else if (index == 'show_logs') {
      this.setData({
        show_introduce: false,
        show_logs: true,
        show_tips: false
      })
    } else {
      this.setData({
        show_introduce: false,
        show_logs: false,
        show_tips: true
      })
    }
    // console.log(e.currentTarget.dataset.index)
  },

    // 分享功能 
    onShareAppMessage() {
      const promise = new Promise(resolve => {
        setTimeout(() => {
          resolve({
            title: '番茄Todo时间管理'
          })
        }, 2000)
      })
      return {
        title: '番茄Todo时间管理',
        path: 'pages/index/index?id=1',
        imageUrl: '',
        promise
      }
    },

  onLaunch: function () {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    });
  },
})