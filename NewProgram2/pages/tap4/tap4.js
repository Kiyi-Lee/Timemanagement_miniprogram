const date = new Date()

Page({
  data: {
    sty: 0,
    sty2: 0,
    score: 'darkkhaki',
    score2: 'darkkhaki',
    showtime: '',
    DateTest: ''
  },
  score: function (e) {
    //点击按钮，样式改变
    let that = this;
    that.setData({
      sty: 1,
      score: 'rgba(252,178,22, 0.3)'
    });
  },

  showtime: function () {
    var nowtime = new Date(); //获取当前时间
    console.log('nowtime:'+nowtime+'string:'+JSON.stringify(nowtime));
    var endtime = new Date("2021/12/12"); //定义结束时间
    // var test_time1 = new Date("2022/6/1");
    // var test_time2 = new Date("2022/6/13");
    // var test_time3 = new Date("2022/12/1");
    // var test_time4 = new Date("2022/11/21");
    // console.log('1:'+endtime+'2:'+test_time1+'3:'+test_time2+'4:'+test_time3+'5:'+test_time4)
    var lefttime = endtime.getTime() - nowtime.getTime(); //距离结束时间的毫秒数
    var leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24));  //计算天数
    var lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24); //计算小时数
    var leftm = Math.floor(lefttime / (1000 * 60) % 60);  //计算分钟数
    var lefts = Math.floor(lefttime / 1000 % 60);  //计算秒数
    // var showtime = leftd + "天" + lefth + ":" + leftm + ":" + lefts;
    var showtime = ( lefth>0 || leftm>0 || lefts>0 ) ? ((leftd + 1) + '天') : (leftd + '天')
    this.setData({
      showtime: showtime,
      DateTest: JSON.stringify(date).substr(9,1)>0 ? JSON.stringify(date).substr(9,2) :JSON.stringify(date).substr(10,1),
    }) //返回倒计时的字符串
  },

  onShow: function () {
    this.showtime();
  },

  //同步
  pace: function () {
    //点击按钮，样式改变
    let that = this;
    that.setData({
      sty: 1,
      score: 'white'
    });
    wx.cloud.init({
      env: 'cloud1-6g5wybika29da54a'
    })
    const db = wx.cloud.database()
    const _ = db.command
    // var test
    var openid
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getopen_id',
      // 传给云函数的参数
      success: function (res) {
        openid = res.result.openid
        // console.log(res.result.openid + "///" + res.result.appid + "///" + res.result.unionid + "[[[" + openid) // 3
        db.collection('storages').where({
          user_openid: openid,
          // userID: 1
        })
          .get({
            success: function (res) {
              // res.data 是包含以上定义的两条记录的数组
              // console.log(res.data[0].todos+res.data[0].table)
              // test = res.data[0].todos || []
              var todos = wx.getStorageSync('todo_list') || []
              var todos2 = wx.getStorageSync('todo_list2') || []
              var usedCloths = wx.getStorageSync('usedCloth') || []
              var cutdownLogs = wx.getStorageSync('cutdownLogs') || []
              var tests = wx.getStorageSync('tests') || []
              var showPics = wx.getStorageSync('showPic') || []
              var useds = wx.getStorageSync('used')
              var picChooses = wx.getStorageSync('picChoose')
              var contents = wx.getStorageSync('content') || []
              // wx.showToast({
              //   image: '/images2/right1.png',
              //   title: '数据已同步'
              // })
              if (todos) {
                todos = res.data[0].todos || []; wx.setStorageSync('todo_list', todos);
              }
              if (todos2) {
                todos2 = res.data[0].todos2 || []; wx.setStorageSync('todo_list2', todos2);
              }
              if (usedCloths) { usedCloths = res.data[0].usedCloths || []; wx.setStorageSync('usedCloth', usedCloths) }
              if (cutdownLogs) { cutdownLogs = res.data[0].cutdownLogs || []; wx.setStorageSync('cutdownLogs', cutdownLogs) }
              if (tests) { tests = res.data[0].tests || []; wx.setStorageSync('tests', tests) }
              if (showPics) { showPics = res.data[0].showPics || []; wx.setStorageSync('showPic', showPics) }
              if (useds >= 0) { useds = res.data[0].useds; wx.setStorageSync('used', useds) }
              if (picChooses >= 0) { picChooses = res.data[0].picChooses; wx.setStorageSync('picChoose', picChooses) }
              if (contents) {
                contents = res.data[0].contents || [];
                wx.setStorageSync('content', contents)
              }
              wx.showToast({
                image: '/images2/right1.png',
                title: '数据已同步'
              })
            },
            fail: function (err) {
              wx.showToast({
                image: '/images/wrong2.png',
                title: '同步失败'
              })
            }
          })
      },
    })
  },
  //上传
  upload: function () {
    //点击按钮，样式改变
    let that = this;
    that.setData({
      sty2: 1,
      score2: 'white'
    });
    var todos = wx.getStorageSync('todo_list') || []
    var todos2 = wx.getStorageSync('todo_list2') || []
    var usedCloths = wx.getStorageSync('usedCloth') || []
    var cutdownLogs = wx.getStorageSync('cutdownLogs') || []
    var tests = wx.getStorageSync('tests') || []
    var showPics = wx.getStorageSync('showPic') || []
    var useds = wx.getStorageSync('used')
    var picChooses = wx.getStorageSync('picChoose')
    var contents = wx.getStorageSync('content') || []
    var showPicsflag = 0
    var usedsflag = 0
    var picChoosesflag = 0
    var contentsflag = 0
    var todosflag = 0
    var todos2flag = 0
    var usedClothsflag = 0
    var cutdownLogsflag = 0
    var testsflag = 0
    var clothflag = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0]
    if (showPics.length > 0) { showPicsflag = 1 }
    if (useds != 0) { usedsflag = 1 }
    if (picChooses != 0) { picChoosesflag = 1 }
    if (contents.length > 0) { contentsflag = 1 }
    if (todos.length > 0) { todosflag = 1 }
    if (todos2.length > 0) { todos2flag = 1 }
    if (usedCloths.length > 0) { usedClothsflag = 1 }
    if (cutdownLogs.length > 0) { cutdownLogsflag = 1 }
    if (tests.length > 0) { testsflag = 1 }
    var useropenid = wx.getStorageSync('useropenid') || []
    wx.cloud.init({ env: 'cloud1-6g5wybika29da54a' })
    const db = wx.cloud.database()
    const _ = db.command
    wx.cloud.callFunction({//获取用户openid
      // 云函数名称
      name: 'getopen_id',
      // 传给云函数的参数
      success: function (res) {
        useropenid = res.result.openid
        wx.setStorageSync('useropenid', useropenid)//将用户openid放入缓存
        // console.log(res.result.openid + "///" + useropenid)
        db.collection('storages').where({//通过查询当前用户的openid，判断是否存在该用户在集合todos里面的记录
          user_openid: useropenid
        })
          .get({
            success: function (res) {
              // console.log("什么玩意儿" + res + res.data[0])
              // console.log(res.data[0] + "]]][]" + res + "mmmmm" + useropenid)
              if (res.data[0] != undefined) {//如果存在用户记录，就更新
                if (showPics || useds || picChooses || contents) {//更新操作，只要存在任一缓存存在数据就可以更新，同时没有数据的缓存记录赋初值，达到多条更新的效果
                  //符合条件的缓存名称有，showPic，used，usedCloth？，picChoose，content
                  //不符合条件的有，tests，cutdownLogs，todo_list
                  //符合条件的直接add进去，因为赋初值对展现没影响，只要一条记录为真就可以，即多个缓存||
                  //不符合条件的可通过多建集合，像todos一样操作，但会无法好的showtoast；或者可通过update插入，但是需要判断，有点麻烦，switch？
                  //pace可通过读取数据判断缓存是否存在而更新，也是bad solution
                  db.collection('storages').where({
                    user_openid: useropenid
                  }).update({
                    data: {
                      showPics: showPicsflag == 0 ? clothflag : showPics,
                      useds: usedsflag == 0 ? 0 : useds,
                      picChooses: picChoosesflag == 0 ? 0 : picChooses,
                      contents: contentsflag == 0 ? [] : contents,
                      todos: todosflag == 0 ? [] : todos,
                      todos2: todos2flag == 0 ? [] : todos2,
                      usedCloths: usedClothsflag == 0 ? [] : usedCloths,
                      cutdownLogs: cutdownLogsflag == 0 ? [] : cutdownLogs,
                      tests: testsflag == 0 ? [] : tests,
                      user_openid: useropenid,
                    },
                    success: function (res) {
                      wx.showToast({
                        image: '/images2/right6.png',
                        title: '上传成功'
                      })
                    },
                    fail: function (err) {
                      wx.showToast({
                        image: '/images/wrong2.png',
                        title: '上传失败'
                      })
                    }
                  })
                  // wx.showToast({
                  //   image: '/images2/right5.png',
                  //   title: '数据已上传'
                  // })
                  // wx.showToast({
                  //   image: '/images/wrong2.png',
                  //   title: '更新失败标记'
                  // })
                }
              } else {//否则（即不存在当前用户的记录），就增加一条纪录
                if (showPics || useds || picChooses || contents) {
                  db.collection('storages').add({
                    data: {
                      showPics: showPicsflag == 0 ? clothflag : showPics,
                      useds: usedsflag == 0 ? 0 : useds,
                      picChooses: picChoosesflag == 0 ? 0 : picChooses,
                      contents: contentsflag == 0 ? [] : contents,
                      todos: todosflag == 0 ? [] : todos,
                      todos2: todos2flag == 0 ? [] : todos2,
                      usedCloths: usedClothsflag == 0 ? [] : usedCloths,
                      cutdownLogs: cutdownLogsflag == 0 ? [] : cutdownLogs,
                      tests: testsflag == 0 ? [] : tests,
                      user_openid: useropenid,
                    },
                    success: function (res) {
                      wx.showToast({
                        image: '/images2/right6.png',
                        title: '数据已添加'
                      })
                    },
                    fail: function (err) {
                      wx.showToast({
                        image: '/images/wrong2.png',
                        title: '添加失败'
                      })
                    }
                  })
                }
              }
            },
            fail: function (err) {
              wx.showToast({
                image: '/images/wrong2.png',
                title: '上传失败'
              })
            }
          })
      },
      fail: function (err) {
        wx.showToast({
          image: '/images2/wrong10.png',
          title: '失败'
        })
      }
    })
  },
})