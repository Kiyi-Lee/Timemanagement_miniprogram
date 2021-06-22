//logs.js
const util = require('../../utils/util.js')

Page({
  data: {
    logs:[],
    dayList:[],
    list: [],
    actionIndex: 0,
    logsHeight: 0,
    sum:[
      {
        title:'今日番茄次数',
        val:'0次',
      },
      {
        title:'累计番茄次数',
        val:'0次',
      },
      {
        title:'今日专注时长',
        val:'0分钟',
      },
      {
        title:'累计专注时长',
        val:'0分钟',
      },
    ],
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
        icon:'read',
        text:'阅读',
      }
    ],
    showHeight: 0,
  },
  onLaunch: function () {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },
  onShow: function () {
    var res=wx.getSystemInfoSync();
    var rate=750 /res.windowWidth;
    var lHeight=rate*res.windowHeight;
    this.setData({
      rate:750 / res.windowWidth,
      logsHeight:lHeight
    })
    var tests=wx.getStorageSync('tests') || [];
    var perToday=0;
    var perTotal=tests.length;
    var attentionTimeToday=0; 
    var attentionTimeTotal=0;
    var dayList=[];
    if(tests.length>0){
      for(var i=0;i<tests.length;i++){
        if((typeof tests[i].date!="undefined") && (tests[i].date.substr(0,10) == util.formatTime(new Date).substr(0,10))){
          perToday = perToday + 1;
          attentionTimeToday = attentionTimeToday + parseInt(tests[i].time);
          dayList.push(tests[i]);
          this.setData({
            dayList:dayList,
            list:dayList,
          })
          attentionTimeTotal = attentionTimeTotal + parseInt(tests[i].time);
        }
        else if((typeof tests[i].date!="undefined") && (tests[i].date.substr(0,10) != util.formatTime(new Date).substr(0,10))){
          attentionTimeTotal=attentionTimeTotal + parseInt(tests[i].time);
        }
        this.setData({
          'sum[0].val':perToday+'次',
          'sum[1].val':perTotal+'次',
          'sum[2].val':attentionTimeToday+'分钟',
          'sum[3].val':attentionTimeTotal+'分钟',
        })
      }
    }else{
      this.setData({
        'sum[0].val':0+'次',
        'sum[1].val':0+'次',
        'sum[2].val':0+'分钟',
        'sum[3].val':0+'分钟',
        logs:[],
        dayList:[],
        list: [],
      })
    }
  },
  changeType: function(e){
    var index=e.currentTarget.dataset.index;
    if(index==0){
      this.setData({
        list:this.data.dayList,
      }) 
    }else if(index==1){
      var tests=wx.getStorageSync('tests') || [];
      this.setData({
        list:tests,
      })
    }
    this.setData({
      actionIndex:index,
    })
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
      path: 'pages/logs/logs?id=2',
      imageUrl: '',
      promise 
    }
  }
})


