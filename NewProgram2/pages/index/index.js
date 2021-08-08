//index.js
//获取应用实例
const util = require('../../utils/util.js')
const ringAudio = wx.createInnerAudioContext()
const app = getApp()
const boardArr = app.globalData.boardArr

Page({
  data: {
    showmodal: false,
    attentionTimeToday: 0,
    attentionTimeTotal: 0,
    clockmusic:false,
    clockShow:false,
    clockHeight:0,
    time: '30',//单次番茄时长
    cateActive: 0,
    rate:"",
    mtime:1200000,
    timer:null,
    lastTime:'0',
    test:[],
    okShow:false,
    pauseShow:true,
    continueCancleShow:false,
    boardArr:[],
    text:'自定义'
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  sliderChange: function (e){
    this.setData({
      time:e.detail.value,
    });
  },
  clickCate: function (e){
    this.setData({
      cateActive: e.currentTarget.dataset.index,
    });
    if( e.currentTarget.dataset.index==5){
      this.setData({
        showmodal: true
      })
    }
  },
  setText: function(e) {
    var text = e.detail.value
    this.setData({
      text: text
    })
    // boardArr[5].text = this.data.text
  },
  cancel: function(){
    this.setData({
      showmodal: false
    })
  },
  confirm: function(){
    if(this.data.text.length<=1 || this.data.length>6)
    {
      wx.showToast({
        title: '长度不正确',
        image: '../../images/wrong2.png',
        duration: 1200
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    }else{
      this.setData({
        showmodal: false,
        ['boardArr[5].text']: this.data.text
      })
    }
  },
  showCustom: function(){
    this.setData({
      showmodal: true
    })
  },
  start: function(){
    this.setData({
      clockShow:true,
      mtime:this.data.time*60*1000,
      lastTime:parseInt(this.data.time)<10?'0'+this.data.time+':00':this.data.time+':00',
    })
    this.drawBg();
    this.drawActive();
  },
  drawBg:function () {
    var lineWidth = 6 / this.data.rate; // px
    var ctx =wx.createCanvasContext('progress_bg');
    ctx.setLineWidth(lineWidth);
    ctx.setStrokeStyle('#ffffff');
    ctx.setLineCap('round');
    ctx.beginPath();
    ctx.arc(400/this.data.rate/2,400/this.data.rate/2,400/this.data.rate/2- 2* lineWidth,0,2*Math.PI,false);
    ctx.stroke();
    ctx.draw();
  },
  drawActive: function(){
    //1.5 - 3.5
    //0 2
    //300000 100
    //2 / 3000
    var _this = this;
    var timer=setInterval(function(){
      var angle=1.5 + 2* (_this.data.time *60 *1000 - _this.data.mtime) / (_this.data.time *60 *1000);
      var currentTime=_this.data.mtime - 100;
      _this.setData({
        mtime:currentTime,
      });
      if(angle < 3.5){
        if (currentTime % 1000 ==0) {
          var timeStr1=currentTime/1000;//sec
          var timeStr2=parseInt(timeStr1/60);//min
          var timeStr3=(timeStr1-timeStr2*60)>=10?(timeStr1-timeStr2*60):'0'+(timeStr1-timeStr2*60);
          //不足分钟
          var timeStr2=timeStr2>=10?timeStr2:'0'+timeStr2;//分钟十位变化
          _this.setData({
            lastTime:timeStr2+':'+timeStr3,
          })
        }
        var lineWidth = 6 / _this.data.rate; // px
        var ctx = wx.createCanvasContext('progress_active');
        ctx.setLineWidth(lineWidth);
        ctx.setStrokeStyle('#ef83cc');
        ctx.setLineCap('round');
        ctx.beginPath();
        ctx.arc(400 / _this.data.rate / 2, 400 / _this.data.rate / 2, 400 / _this.data.rate / 2 - 2 * lineWidth, 1.5 * Math.PI, angle * Math.PI, false);
        ctx.stroke();
        ctx.draw();
      }else{
        if(_this.data.lastTime!='0'){
          var tests=wx.getStorageSync('tests') || [];
          tests.unshift({
            date:util.formatTime(new Date),
            cate:_this.data.cateActive==5?boardArr[5].text:_this.data.cateActive,
            time:_this.data.time,
          })
          wx.setStorageSync('tests', tests);
        }
        _this.setData({
          lastTime:'00:00',
          okShow:true,
          pauseShow:false,
          continueCancleShow:false,
          clockmusic:true
        })
        // 响铃音效
        ringAudio.loop = true;
        ringAudio.src = '/pages/index/audio/ring.mp3';
        ringAudio.play();
        clearInterval(timer);
      }
    },100);
    _this.setData({
      timer:timer
    })
  },
  pause: function(){
    clearInterval(this.data.timer);
    this.setData({
      okShow:false,
      pauseShow:false,
      continueCancleShow:true,
    })
  },
  continue: function(){
    this.drawActive();
    this.setData({
      okShow:false,
      pauseShow:true,
      continueCancleShow:false,
    })
  },
  cancle: function(){
    clearInterval(this.data.timer);
    this.setData({
      okShow:false,
      pauseShow:true,
      continueCancleShow:false,
      clockShow:false,
    })
  },
  ok: function(){
    clearInterval(this.data.timer);
    this.setData({
      okShow:false,
      pauseShow:true,
      continueCancleShow:false,
      clockShow:false,
      clockmusic:false,
    })
    ringAudio.stop();
    this.refresh();
  },
  refresh: function(){
    var infos = wx.getStorageSync('infos') || [];
    if(infos.length!=0){
      var tests=wx.getStorageSync('tests') || [];
      var attentionTimeToday=0; 
      var attentionTimeTotal=0;
      if(tests.length>0){
        for(var i=0;i<tests.length;i++){
          if((typeof tests[i].date!="undefined") && (tests[i].date.substr(0,10) == util.formatTime(new Date).substr(0,10))){
            attentionTimeToday = attentionTimeToday + parseInt(tests[i].time);
            attentionTimeTotal = attentionTimeTotal + parseInt(tests[i].time);
          }
          else if((typeof tests[i].date!="undefined") && (tests[i].date.substr(0,10) != util.formatTime(new Date).substr(0,10))){
            attentionTimeTotal=attentionTimeTotal + parseInt(tests[i].time);
          }
          this.setData({
            attentionTimeToday: attentionTimeToday,
            attentionTimeTotal: attentionTimeTotal
          })
        }
      }
      wx.cloud.init({ env: 'cloud1-6g5wybika29da54a' })
      const db = wx.cloud.database()
      const _ = db.command
      var useropenid
      var that = this
      wx.cloud.callFunction({
        // 云函数名称
        name: 'getopen_id',
        success: function(res) {
          useropenid = res.result.openid
          db.collection('userInfos').where({//通过查询当前用户的openid，判断是否存在该用户在集合todos里面的记录
            user_openid: useropenid
          })
          .get({
            success: function(res) {
              if (res.data[0] != undefined) {
                db.collection('userInfos').where({
                  user_openid: useropenid
                }).update({
                  data: {
                    attentionTimeToday: that.data.attentionTimeToday,
                    attentionTimeTotal: that.data.attentionTimeTotal,
                    nickname: infos.nickName,
                    headpictureUrl: infos.avatarUrl,
                    user_openid: useropenid,
                  }
                })
              }else{
                db.collection('userInfos').add({
                  data: {
                    attentionTimeToday: that.data.attentionTimeToday,
                    attentionTimeTotal: that.data.attentionTimeTotal,
                    nickname: infos.nickName,
                    headpictureUrl: infos.avatarUrl,
                    user_openid: useropenid,
                  },
                })
              }
            }
          })
        },
        fail: console.error
      })
    }
  },
  onShow: function () {
    // wx.removeStorage({
    //   key: 'tests',
    //   success (res) {
    //     console.log(res)
    //   }
    // })
    // wx.removeStorageSync('logs')
    //小程序默认高度750rpx，rate=750rpx/res.windowWidth =?/res.windowHeight
    var res=wx.getSystemInfoSync();
    var rate=750 /res.windowWidth;
    var cHeight=rate*res.windowHeight;
    this.setData({
      rate:750 / res.windowWidth,
      clockHeight:cHeight,
      boardArr: boardArr
    })
  },
})
