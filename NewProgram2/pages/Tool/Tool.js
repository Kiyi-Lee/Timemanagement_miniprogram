// pages/Tool/Tool.js

Page({

  //页面的初始数据
  data: {
    // width:0,
    cateActive: 0,
    boardArr:[
      {
        icon:'fish',
        text:'奖励盒子'
      },
      {
        icon:'countdown',
        text:'倒数日',
      },
      {
        icon:'fourQuadrant',
        text:'四象限',
      },
      {
        icon:'list',
        text:'待办清单',
      },
      {
        icon:'upload3',
        text:'数据同步',
      },
     {
        icon:'rank6',
        text:'排行榜',
      }, 
    ]
  },
  onLaunch: function () {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  clickCate: function (e){
    this.setData({
      cateActive: e.currentTarget.dataset.index,
    });
    var src= '/pages/tap'+e.currentTarget.dataset.index+'/tap'+e.currentTarget.dataset.index
    wx.navigateTo({
      url:src
    })
    //console.log(e.currentTarget.dataset.index);
  },
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
      path: 'pages/Tool/Tools?id=3',
      imageUrl: '',
      promise 
    }
  }
})