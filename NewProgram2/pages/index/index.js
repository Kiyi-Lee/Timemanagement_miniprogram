//index.js
//获取应用实例
const util = require('../../utils/util.js')
const ringAudio = wx.createInnerAudioContext()
const app = getApp()
const boardArr = app.globalData.boardArr

Page({
  data: {
    showmodal: false, // 模板信息展示标识
    attentionTimeToday: 0, // 今日番茄时长
    attentionTimeTotal: 0, // 总番茄时长
    clockmusic: false, // 完成提示音标识
    clockShow: false, // 番茄时钟界面展示标识
    clockHeight: 0, // 番茄时钟高度
    time: '30', // 单次番茄时长
    cateActive: 0, // 任务栏选中标识
    rate: "", // rpx px转换率
    mtime: 1200000,
    timer: null, // 定时器
    lastTime: '0', // 剩余时间
    test: [], // 番茄时钟数据存储
    okShow: false, // 完成按钮显示
    pauseShow: true, // 暂停按钮显示
    continueCancleShow: false, // 继续、放弃按钮显示
    boardArr: [], // 任务栏具体信息
    text: '自定义' // 自定义任务名称
  },

  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },

  // 滑块设置时间
  sliderChange: function (e) {
    this.setData({
      time: e.detail.value,
    });
  },

  // 选择番茄时钟任务分类
  clickCate: function (e) {
    this.setData({
      cateActive: e.currentTarget.dataset.index,
    });
    // 如果选择自定义，显示模板消息
    if (e.currentTarget.dataset.index == 5) {
      this.setData({
        showmodal: true
      })
    }
  },

  // 根据模板信息，自定义任务名称
  setText: function (e) {
    var text = e.detail.value
    this.setData({
      text: text
    })
  },

  // 关闭模板信息
  cancel: function () {
    this.setData({
      showmodal: false
    })
  },

  // 确认自定义模板信息
  confirm: function (e) {
    console.log(e)
    if (this.data.text.length <= 1 || this.data.length > 6) {
      wx.showToast({
        title: '长度不正确',
        image: '../../images/wrong2.png',
        duration: 1200
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else {
      this.setData({
        showmodal: false,
        ['boardArr[5].text']: this.data.text
      })
    }
  },

  // 自定义操作，展示模板信息
  // showCustom: function(){
  //   this.setData({
  //     showmodal: true
  //   })
  // },

  // 开始专注操作
  start: function () {
    this.setData({
      clockShow: true,
      mtime: this.data.time * 60 * 1000,
      lastTime: parseInt(this.data.time) < 10 ? '0' + this.data.time + ':00' : this.data.time + ':00',
    })
    this.drawBg();
    this.drawActive();
  },

  // 绘图展示背景槽
  drawBg: function () {
    var lineWidth = 6 / this.data.rate; // px
    var ctx = wx.createCanvasContext('progress_bg');
    ctx.setLineWidth(lineWidth);
    ctx.setStrokeStyle('#ffffff');
    ctx.setLineCap('round');
    ctx.beginPath();
    ctx.arc(400 / this.data.rate / 2, 400 / this.data.rate / 2, 400 / this.data.rate / 2 - 2 * lineWidth, 0, 2 * Math.PI, false);
    ctx.stroke();
    ctx.draw();
  },

  // 动态绘图--展示进度条
  drawActive: function () {
    //1.5 - 3.5
    //0 2
    //300000 100
    //2 / 3000
    var _this = this;
    var timer = setInterval(function () {
      var angle = 1.5 + 2 * (_this.data.time * 60 * 1000 - _this.data.mtime) / (_this.data.time * 60 * 1000);
      var currentTime = _this.data.mtime - 100;
      _this.setData({
        mtime: currentTime,
      });
      if (angle < 3.5) {
        if (currentTime % 1000 == 0) {
          var timeStr1 = currentTime / 1000;//sec
          var timeStr2 = parseInt(timeStr1 / 60);//min
          var timeStr3 = (timeStr1 - timeStr2 * 60) >= 10 ? (timeStr1 - timeStr2 * 60) : '0' + (timeStr1 - timeStr2 * 60);
          //不足分钟
          var timeStr2 = timeStr2 >= 10 ? timeStr2 : '0' + timeStr2;//分钟十位变化
          _this.setData({
            lastTime: timeStr2 + ':' + timeStr3,
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
      } else {
        if (_this.data.lastTime != '0') {
          var tests = wx.getStorageSync('tests') || [];
          tests.unshift({
            cate: _this.data.cateActive == 5 ? boardArr[5].text : _this.data.cateActive,
            date: util.formatTime(new Date),
            time: _this.data.time,
          })
          wx.setStorageSync('tests', tests);
        }
        _this.setData({
          lastTime: '00:00',
          okShow: true,
          pauseShow: false,
          continueCancleShow: false,
          clockmusic: true
        })
        // 响铃音效
        ringAudio.loop = true;
        ringAudio.src = '/pages/index/audio/ring.mp3';
        ringAudio.play();
        clearInterval(timer);
      }
    }, 100);
    _this.setData({
      timer: timer
    })
  },

  // 暂停操作
  pause: function () {
    clearInterval(this.data.timer);
    this.setData({
      okShow: false,
      pauseShow: false,
      continueCancleShow: true,
    })
  },

  // 继续操作
  continue: function () {
    this.drawActive();
    this.setData({
      okShow: false,
      pauseShow: true,
      continueCancleShow: false,
    })
  },

  // 取消操作
  cancle: function () {
    clearInterval(this.data.timer);
    this.setData({
      okShow: false,
      pauseShow: true,
      continueCancleShow: false,
      clockShow: false,
    })
  },

  // 完成操作
  ok: function () {
    clearInterval(this.data.timer);
    this.setData({
      okShow: false,
      pauseShow: true,
      continueCancleShow: false,
      clockShow: false,
      clockmusic: false,
    })
    ringAudio.stop();
    this.refresh();
  },

  refresh: function () {
    wx.cloud.init({ env: 'cloud1-6g5wybika29da54a' })
    const db = wx.cloud.database()
    const _ = db.command
    var infos = wx.getStorageSync('infos') || [];
    var tests = wx.getStorageSync('tests') || []; //获取日志数据缓存
    var attentionTimeToday = 0;
    var attentionTimeTotal = 0;
    if (infos.length != 0) {
      console.log("测试刷新")
      if (tests.length > 0) { //如果存在日志数据
        console.log('999')
        for (var i = 0; i < tests.length; i++) { //遍历数组
          if ((typeof tests[i].date != "undefined")) { //如果遍历数据有今日数据
            if (tests[i].date.substr(0, 10) == util.formatTime(new Date).substr(0, 10)) {
              attentionTimeToday = attentionTimeToday + parseInt(tests[i].time); //今日专注时长更新
            }
              attentionTimeTotal += parseInt(tests[i].time); //累计专注时长更新
          }
        }
        var openid = wx.getStorageSync('openid') || [];
        var that = this
        db.collection('userInfos').where({
          //通过查询当前用户的openid，判断是否存在该用户在集合todos里面的记录
          user_openid: openid
        })
          .get({
            success: function (res) {
              if (res.data[0] != undefined) {
                console.log("exit")
                db.collection('userInfos').where({
                  user_openid: openid
                }).update({
                  data: {
                    attentionTimeToday: attentionTimeToday,
                    attentionTimeTotal: attentionTimeTotal,
                    nickname: infos.nickName,
                    headpictureUrl: infos.avatarUrl,
                    user_openid: openid,
                  }
                })
              } else {
                db.collection('userInfos').add({
                  data: {
                    attentionTimeToday: that.data.attentionTimeToday,
                    attentionTimeTotal: that.data.attentionTimeTotal,
                    nickname: infos.nickName,
                    headpictureUrl: infos.avatarUrl,
                    user_openid: openid,
                  },
                })
              }
            }
          })
      }
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

    // 获取小程序高度，适应机型
    // 小程序默认宽度为750rpx，rate=750rpx/res.windowWidth =?/res.windowHeight
    var res = wx.getSystemInfoSync();
    var rate = 750 / res.windowWidth;
    var cHeight = rate * res.windowHeight;
    // 设置数据
    this.setData({
      rate: 750 / res.windowWidth, // 小程序rpx px转换率
      clockHeight: cHeight, // 番茄时钟高度
      boardArr: boardArr // 任务栏信息
    })
  },
})
