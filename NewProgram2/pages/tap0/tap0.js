// pages/tap4/tap4.js
var postsData = require('../tap0/source.js');
const app = getApp()
const appData = app.globalData
Page({
  /**
   * 页面的初始数据
   */
  data: {
    flag: 0,
    used: 0,
    //已经兑换次数
    canConvert: 0, //可兑换次数
    pertotal: 0, //总兑换次数
    pick: 0,
    cateActive: 0,
    text: "兑换",
    usedcloth: [],
    clothflag:[0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0,0,0,0,
      0,0,0,0,0,0,0],
    timeConvert:  60
  },
  onLaunch: function () {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
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
      path: 'pages/tap0/tap0?id=10',
      imageUrl: '',
      promise 
    }
  },
  onShow: function () {
    // var Height = wx.getSystemInfoSync().windowHeight;
    this.setData({
      boardArr: postsData.boardArr,
      array0: postsData.array0,
      // height1: Height*0.1,
      // height2: Height*0.1,
      // height2: Height*0.8
    })
    var choose = wx.getStorageSync('picChoose') || [];
    var tests = wx.getStorageSync('tests') || [];
    var used = wx.getStorageSync('used') || [];
    var showPic = wx.getStorageSync('showPic') || [];
    if(showPic.length > 0){
      this.setData({
        clothflag : showPic,
      })
    }else{
      showPic = this.data.clothflag;
      wx.setStorageSync('showPic', showPic)
    }
    // wx.removeStorageSync('clothFlag')
    var totalTime = 0;
    if (tests.length > 0) { //如果番茄时钟有数据
      // console.log("length进来了")
      for (var i = 0; i < tests.length; i++) {
        totalTime = totalTime + parseInt(tests[i].time);
      } //获取总时长
      // console.log("totalTime:" + totalTime);
      this.setData({
        pertotal: parseInt(totalTime / this.data.timeConvert)
      }) //计算总兑换次数，加載時使用
      // console.log("this.data.pertotal: " + this.data.pertotal)
      //获取缓存中使用次数，便于计算每次加载可兑换次数
      // console.log("used:" + used)
      //如果没有兑换过，即used没有数据
      if (used.length <= 0) {
        // console.log("used.length<=0,used:" + used)
        appData.canConvert = this.data.pertotal;
        used = this.data.used;
        wx.setStorageSync('used', used);
        // console.log("appData.canConvert: " + appData.canConvert)
        this.setData({
          canConvert: appData.canConvert,
          //首条数据（没兑换时，used=0）插入，可兑换次数就是总兑换次数
        })
        // console.log("data的canConvert: " + this.data.canConvert)
        // console.log("used=null时(0)used= " + used)

      } else {
        //used存在数据，即兑换过
        // console.log("used！=null")
        this.setData({
          used: used,
        })
        appData.canConvert = this.data.pertotal - this.data.used;
        // console.log("!=null,appData.canConvert: " + appData.canConvert)
        //总兑换次数减去已经兑换的次数，也是数据刷新
        this.setData({
          canConvert: appData.canConvert,
        })
      }
    }
    if (choose != null || choose != undefined) {
      this.setData({
        pick: choose
      })
    }
  },

  clickCate: function (e) {
    this.setData({
      cateActive: e.currentTarget.dataset.index,
    });
    var usedCloth = wx.getStorageSync('usedCloth') || [];
    if (usedCloth.length > 0) {
      for (var i = 0; i < usedCloth.length; i++) {
        // console.log(usedCloth[i].Pick)
        if (e.currentTarget.dataset.index==usedCloth[i].Pick) {
          this.setData({
            flag: 1,
            text: "使用"
          })
          break;
        } else {
          this.setData({
            flag: 0,
            text: "兑换"
          })
        }
      }
    } else {
      //...
    }
  },

  changePic: function () {
    //如果可兑换次数大于0，则进行兑换，否则弹窗提示
    if (this.data.flag == 0) {
      if (appData.canConvert > 0 && this.data.canConvert > 0) {
        //插入数据
        var usedCloth = wx.getStorageSync('usedCloth') || [];
        var showPic = wx.getStorageSync('showPic') || [];
        showPic[this.data.cateActive] = 1;
        wx.setStorageSync('showPic', showPic);
        usedCloth.unshift({
          Pick: this.data.cateActive
        })
        wx.setStorageSync('usedCloth', usedCloth);
        this.setData({
          pick: this.data.cateActive,
          clothflag: showPic
        })
        var choose = wx.getStorageSync('picChoose') || []
        choose = this.data.pick;
        wx.setStorageSync('picChoose', choose)
        //设置选择的图片，以方便下次加载选择的那张
        // console.log("change" + choose)
        this.setData({
          used: this.data.used + 1,
          canConvert: this.data.canConvert - 1
        })
        // console.log("changepic的data的used：" + this.data.used)
        var used = wx.getStorageSync('used') || [];
        used = this.data.used;
        wx.setStorageSync('used', used);
        // console.log("changepic的used[]：" + used)

      } else {
        wx.showToast({
          title: '无可兑换次数',
          image: '../../images/wrong.jpg',
          duration: 1500
        })
        setTimeout(function () {
          wx.hideToast()
        }, 2000)
      }
    }else{
      this.setData({
        pick: this.data.cateActive
      })
      var choose = wx.getStorageSync('picChoose') || []
      choose = this.data.pick;
      wx.setStorageSync('picChoose', choose)
      //设置选择的图片，以方便下次加载选择的那张
      // console.log("change2" + choose)
    }
  }
})