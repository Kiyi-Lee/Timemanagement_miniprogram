// pages/tap6/tap6.js
const util = require('../../utils/util.js')

Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUseGetUserProfile: false,
    showgetUserinfo: false,
    allRecords: [],
    list: [],
    attentionTimeToday: 0,
    attentionTimeTotal: 0,
    actionIndex: 0,
    rankbytotal: [],
    rate: 0,
    rankHeight: 0,
  },

  onLaunch: function () {
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  async getRank(){
    var infos = wx.getStorageSync('infos') || [];
    if (infos.length != 0) {
    const db = wx.cloud.database()
    wx.showLoading({
      title: '加载中',
    })
    //获取数据的总个数
    let count = await db.collection('userInfos').count()
    count = count.total
    let all = []
    //通过for循环做多次请求，并把多次请求的数据放在应该数组里
    for (let i=0; i<count ;i+=20){
      let list = await db.collection('userInfos').orderBy('attentionTimeToday','desc').skip(i).get()
      all = all.concat(list.data);
    }
    // console.log("ALL"+all)
    this.setData({
      allRecords : all
    })
    wx.hideLoading()
    // this.refresh();
    }
  },

  onShow() {
    var res=wx.getSystemInfoSync();
    var rate=750 /res.windowWidth;
    var rHeight=rate*res.windowHeight;
    this.setData({
      rate:750 / res.windowWidth,
      rankHeight:rHeight
    })
    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
    var infos = wx.getStorageSync('infos') || []
    if(infos.length!=0){
      this.setData({
        showgetUserinfo: true,
        userInfo: infos
      })
    }
    wx.cloud.init({
      env: 'cloud1-6g5wybika29da54a'
    })
    const db = wx.cloud.database()
    const _ = db.command
    this.getRank()

    // function compare(arg) {
    //   return function(a, b) {
    //       return a[arg] - b[arg];
    //   }
    // }
    // this.setData({
    //   totalRank : this.data.allRecords.sort(compare('attentionTimeTotal'))
    // })
  },

  getUserProfile(e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
    // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '用于排行榜展示', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          showgetUserinfo: true
        })
        var infos = wx.getStorageSync('infos') || []
        infos = this.data.userInfo
        wx.setStorageSync('infos', infos)
        // this.getRank()
        this.refresh();
      }
    })
  },

  getUserInfo(e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true,
      showgetUserinfo: true
    })
    var infos = wx.getStorageSync('infos') || []
    infos = this.data.userInfo
    wx.setStorageSync('infos', infos)
    // this.refresh()
  },

  changeType: function(e){
    var index=e.currentTarget.dataset.index;
      if(index==1){
      function compare(property){
        return function(a,b){
            //value1 - value2升序
            //value2 - value1降序
            var value1 = a[property];
            var value2 = b[property];
            return value2 - value1;//降序
        }
      }
      this.setData({
        rankbytotal:this.data.allRecords.sort(compare("attentionTimeTotal")),
      })
    }
    this.setData({actionIndex:index,})
  },

  refresh() {
    console.log("refresh")
    wx.cloud.init({ env: 'cloud1-6g5wybika29da54a' })
    const db = wx.cloud.database()
    const _ = db.command
    var infos = wx.getStorageSync('infos') || [];
    var tests = wx.getStorageSync('tests') || []; //获取日志数据缓存
    var attentionTimeToday = 0;
    var attentionTimeTotal = 0;
    console.log(infos.length)
    // if (infos.length > 0) {
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
      this.getRank()
  // }
},
  
  // refresh: function () {
  //   var infos = wx.getStorageSync('infos') || []
  //   if(infos.length!=0){
  //     var tests=wx.getStorageSync('tests') || [];
  //     // var perToday=0;
  //     var attentionTimeToday=0; 
  //     var attentionTimeTotal=0;
  //     if(tests.length>0){
  //       for(var i=0;i<tests.length;i++){
  //         if((typeof tests[i].date!="undefined")){ //如果遍历数据有今日数据
  //           if(tests[i].date.substr(0,10) == util.formatTime(new Date).substr(0,10)){
  //             attentionTimeToday = attentionTimeToday + parseInt(tests[i].time); //今日专注时长更新
  //           }
  //         }
  //         attentionTimeTotal += parseInt(tests[i].time); //累计专注时长更新
  //         this.setData({
  //           attentionTimeToday: attentionTimeToday,
  //           attentionTimeTotal: attentionTimeTotal
  //         })
  //       }
  //     }else{
  //       this.setData({
  //         attentionTimeToday: 0,
  //         attentionTimeTotal: 0
  //       })
  //     }
  //     wx.cloud.init({ env: 'cloud1-6g5wybika29da54a' })
  //     const db = wx.cloud.database()
  //     const _ = db.command
  //     var useropenid
  //     var that = this
  //     wx.cloud.callFunction({
  //       // 云函数名称
  //       name: 'getopen_id',
  //       success: function(res) {
  //         useropenid = res.result.openid
  //         db.collection('userInfos').where({//通过查询当前用户的openid，判断是否存在该用户在集合todos里面的记录
  //           user_openid: useropenid
  //         })
  //         .get({
  //           success: function(res) {
  //             // console.log("1")
  //             if (res.data[0] != undefined) {
  //               // console.log("1.1.1")
  //               db.collection('userInfos').where({
  //                 user_openid: useropenid
  //               }).update({
  //                 data: {
  //                   attentionTimeToday: that.data.attentionTimeToday,
  //                   attentionTimeTotal: that.data.attentionTimeTotal,
  //                   nickname: infos.nickName,
  //                   headpictureUrl: infos.avatarUrl,
  //                   user_openid: useropenid,
  //                 }
  //               })
  //             }else{
  //               db.collection('userInfos').add({
  //                 data: {
  //                   attentionTimeToday: that.data.attentionTimeToday,
  //                   attentionTimeTotal: that.data.attentionTimeTotal,
  //                   nickname: infos.nickName,
  //                   headpictureUrl: infos.avatarUrl,
  //                   user_openid: useropenid,
  //                 },
  //               })
  //             }
  //             that.showToast();
  //           }
  //         })
  //       },
  //       fail: console.error
  //     })
  //   }
  // },

  showToast : function(){
    wx.showToast({
      image: '/images2/right6.png',
      title: '刷新成功',
      duration: 1200
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
      path: 'pages/tap5/tap5?id=15',
      imageUrl: '',
      promise 
    }
  }
})