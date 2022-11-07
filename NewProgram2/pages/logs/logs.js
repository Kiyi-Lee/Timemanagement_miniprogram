//logs.js
const util = require('../../utils/util.js')
const recent7days = require('../../utils/recent7days');//应用模块
const app = getApp()
const boardArr = app.globalData.boardArr


import * as echarts from '../ec-canvas/echarts';
var option = [];//图表配置项 声明
// 初始化图表函数  开始
let chart = null;
function initChart(canvas, width, height, dpr) {
  chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr
  })
  canvas.setChart(chart)
  return chart;
}

Page({
  data: {
    logs: [], //记录
    dayList: [], //当日记录
    list: [], //历史记录
    actionIndex: 0, //今日历史切换标记
    logsHeight: 0, //记录显示高度
    sum: [
      {
        title: '今日番茄次数',
        val: '0次',
      },
      {
        title: '累计番茄次数',
        val: '0次',
      },
      {
        title: '今日专注时长',
        val: '0分钟',
      },
      {
        title: '累计专注时长',
        val: '0分钟',
      },
    ], //统计单项数据展示
    boardArr: [], //番茄时钟任务栏
    showHeight: 0,
    ec: {
      onInit: initChart
    },
    type_index: 0,
    pieList: [],
    dateLast: [],
    line_data: [],
    show_echart: [
      {
        display: false,
        time: '2022-01-01'
      }
    ],
    type: 'phone',
  },

  onLaunch: function () {
    // 分享功能
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
  },

  // onLoad(){
  //   var tests = wx.getStorageSync('tests') || [];
  //   tests.unshift({
  //     cate: 0,
  //     date: '2022-06-17',
  //     time: 5,
  //   })
  //   tests.unshift({
  //     cate: 0,
  //     date: '2022-06-22',
  //     time: 5,
  //   })
  //   tests.unshift({
  //     cate: 0,
  //     date: '2022-06-22',
  //     time: 7,
  //   })
  //   tests.unshift({
  //     cate: 0,
  //     date: '2022-06-23',
  //     time: 3,
  //   })
  //   tests.unshift({
  //     cate: 0,
  //     date: '2022-06-23',
  //     time: 15,
  //   })
  //   wx.setStorageSync('tests', tests);
  // },

  // show_ad() {
  //   // 在页面中定义激励视频广告
  //   let videoAd = null
  //   // 在页面onLoad回调事件中创建激励视频广告实例
  //   if (wx.createRewardedVideoAd) {
  //     videoAd = wx.createRewardedVideoAd({
  //       adUnitId: 'adunit-14c7b41710947071'
  //     })
  //     videoAd.onLoad(() => { })
  //     videoAd.onError((err) => { })
  //     videoAd.onClose((res) => {
  //       console.log('ad close')
  //       if (res && res.isEnded) {
  //         this.close_options()
  //       } else {
  //         wx.showToast({
  //           title: '解锁失败',
  //           icon: "error",
  //           duration: 1200
  //         })
  //       }
  //     })
  //   }

  //   // 用户触发广告后，显示激励视频广告
  //   if (videoAd) {
  //     videoAd.show().catch(() => {
  //       // 失败重试
  //       videoAd.load()
  //         .then(() => videoAd.show())
  //         .catch(err => {
  //           console.log('激励视频 广告显示失败')
  //         })
  //     })
  //   }
  // },

  // close_options() {
  //   var echarts = [
  //     {
  //       display: true,
  //       time: recent7days.formatDate(new Date())
  //     }
  //   ];
  //   this.setData({
  //     show_echart: echarts
  //   })
  //   var show_echart = wx.getStorageSync('show_echart');
  //   show_echart = this.data.show_echart;
  //   wx.setStorageSync('show_echart', show_echart);
  //   this.line()
  // },

  // getSysInfo() {
  //   var that = this
  //   wx.getSystemInfo({
  //     success: (res) => {
  //       if(res.platform == 'windows' || res.platform == 'mac' || res.platform == 'devtools')
  //         that.setData({
  //           type: 'other'
  //         })
  //     },
  //   })
  // },

  onShow: function () {
    // this.getSysInfo()
    this.getDate()
    this.pushlist() //载入数据
    this.setData({
      boardArr: boardArr
    }) //载入任务栏信息
    var res = wx.getSystemInfoSync();
    var rate = 750 / res.windowWidth;
    var lHeight = rate * res.windowHeight;
    this.setData({
      rate: 750 / res.windowWidth,
      logsHeight: lHeight
    }) //高度设置
    var tests = wx.getStorageSync('tests') || []; //获取日志数据缓存
    var show_echart = wx.getStorageSync('show_echart') || [];
    if (show_echart.length > 0 && show_echart[0].display == true) {
      this.setData({
        show_echart: show_echart
      })
      // console.log("is exit")
    } else {
      // console.log("not exit")
    }
    // var attentionTime_Total=wx.getStorageSync('attentionTime_Total'); 
    //获取累计时长缓存
    var perToday = 0; //今日番茄次数
    var perTotal = tests.length; //累计番茄次数
    var attentionTimeToday = 0; //今日专注时间
    var attentionTimeTotal = 0; //累计专注时间
    var dayList = []; //初始化今日数据集合
    if (tests.length > 0) { //如果存在日志数据
      // console.log('999')
      for (var i = 0; i < tests.length; i++) { //遍历数组
        if ((typeof tests[i].date != "undefined")) { //如果遍历数据有今日数据
          if (tests[i].date.substr(0, 10) == util.formatTime(new Date).substr(0, 10)) {
            perToday = perToday + 1; //今日番茄次数+1
            attentionTimeToday = attentionTimeToday + parseInt(tests[i].time); //今日专注时长更新
            dayList.push(tests[i]); //载入今日番茄数据
            this.setData({
              dayList: dayList, //中转数据集合
              list: dayList,
            }) //更新数据，最后遍历的list
          }
        }
        attentionTimeTotal += parseInt(tests[i].time); //累计专注时长更新
      }
      this.setData({
        'sum[0].val': perToday + '次',
        'sum[1].val': perTotal + '次',
        'sum[2].val': attentionTimeToday + '分钟',
        'sum[3].val': attentionTimeTotal + '分钟',
      })
    } else {
      // 如果不存在日志数据，全部置为0
      this.setData({
        'sum[0].val': 0 + '次',
        'sum[1].val': 0 + '次',
        'sum[2].val': 0 + '分钟',
        'sum[3].val': 0 + '分钟',
        logs: [],
        dayList: [],
        list: [],
      })
    }
  },

  // 获取日期
  getDate() {
    // var date = recent7days.formatDate(new Date());
    var dateLast = recent7days.getTimeLastWeek(new Date());//前7天时间
    // console.log(dateLast)
    this.setData({
      dateLast: dateLast
    });
    this.get_week_data()
    if(this.data.actionIndex==2){
      this.setData({
        type_index: 0
      })
      this.line();
      console.log("init line")
    }
      
  },

  get_week_data() {
    var tests = wx.getStorageSync('tests') || []; //获取日志数据缓存
    if (tests.length > 0) { //如果存在日志数据
      var arrays = [0,0,0,0,0,0,0]  //y轴数据，每日专注时间
      var dateLast = this.data.dateLast //最近七天日期数组
      var length = dateLast.length // 最近七天日期数组数组长度
      var flag = 0
      outer:
      for (var i = length - 1; i >= 0; i--) { // 遍历最近七天数组
        var time_count = 0; // 每日专注时间计数器
        dateLast[i] = dateLast[i].substr(5, 5) // 截取字符串，规范日期格式为 ‘xx-xx’
        inter:
        for (var j = flag; j < tests.length; j++) { // 遍历日志数组
          // console.log("test[j]:" + tests[j].date.substr(5, 5) + '   date:' + dateLast[i])
          if (typeof tests[j].date != "undefined") {
            if (tests[j].date.substr(5, 5) == dateLast[i]) {
              // 如果当前日志数组元素date属性不是未定义 
              // 且 当前日志数组元素date规范后等于当前七天数组元素 ，即日期相等时计算当日专注时间
              time_count += parseInt(tests[j].time) // 每日专注时间相加
              arrays[i] = parseInt(time_count)
              // console.log("当天:" + time_count+'    j:'+j+'    i:'+i)
              flag = j
            } else {
              // 如果当前日志数组元素date属性是未定义 
              // 或者 当前日志数组元素date规范后不等于当前七天数组元素
              // 即日期相等时计算当日专注时间
              // 再插入每日专注时间数组即y轴数据，然后退出本次循环
              // arrays.unshift(time_count)
              arrays[i] = parseInt(time_count)
              flag = j
              // console.log("break_j:"+j+"   i:"+i)
              // console.log(arrays)
              break inter;
            }
          }
        }
      }
      this.setData({
        line_data: arrays
      })
      // console.log("count" + count)
    }
  },

  // get_week_data() {
  //   var tests = wx.getStorageSync('tests') || []; //获取日志数据缓存
  //   if (tests.length > 0) { //如果存在日志数据
  //     var arrays = []  //y轴数据，每日专注时间
  //     var dateLast = this.data.dateLast //最近七天日期数组
  //     var length = dateLast.length // 最近七天日期数组数组长度
  //     console.log(length)
  //     var flag = 0
  //     console.log(tests[0].date.substr(0, 10) == dateLast[6])
  //     var time_count = 0; // 每日专注时间计数器
  //     for (var i = length - 1; i >= 0; i--) { // 遍历最近七天数组
  //       // count++;
  //       dateLast[i] = dateLast[i].substr(5, 5) // 截取字符串，规范日期格式为 ‘xx-xx’
  //       for (var j = flag; j < tests.length; j++) { // 遍历日志数组
  //         console.log("test[j]:" + tests[j].date.substr(5, 5) + '   date:' + dateLast[i])
  //         if (typeof tests[j].date != "undefined"){
  //           if (tests[j].date.substr(5, 5) == dateLast[i]) {
  //             // 如果当前日志数组元素date属性不是未定义 
  //             // 且 当前日志数组元素date规范后等于当前七天数组元素 ，即日期相等时计算当日专注时间
  //             console.log("in")
  //             time_count += tests[j].time // 每日专注时间相加
  //             console.log("tc:" + time_count)
  //           } else {
  //             // 如果当前日志数组元素date属性是未定义 
  //             // 或者 当前日志数组元素date规范后不等于当前七天数组元素
  //             // 即日期相等时计算当日专注时间
  //             // 再插入每日专注时间数组即y轴数据，然后退出本次循环
  //             flag = i
  //             console.log("in 2")
  //             arrays.unshift(time_count)
  //             time_count = 0
  //             console.log(arrays)
  //             break;
  //           }
  //         } else {
  //           arrays.unshift(time_count)
  //         }
  //       }
  //       this.setData({
  //         line_data: arrays
  //       })
  //     }
  //     // console.log("count" + count)
  //   }
  // },

  pushPie() {
    var tests = wx.getStorageSync('tests') || []; //获取日志数据缓存
    if (tests.length > 0) { //如果存在日志数据
      var arrays = []
      for (var i = 0; i < tests.length; i++) { //遍历数组
        if ((typeof tests[i].date != "undefined")) { //如果遍历数据有今日数据
          if (tests[i].date.substr(0, 10) == util.formatTime(new Date).substr(0, 10)) {
            switch (tests[i].cate) {
              case 0: tests[i].cate = '工作'; break;
              case 1: tests[i].cate = '学习'; break;
              case 2: tests[i].cate = '思考'; break;
              case 3: tests[i].cate = '写作'; break;
              case 4: tests[i].cate = '运动'; break;
              default: break;
            }
            arrays.push({ "name": tests[i].cate, "value": tests[i].time });
          } else {
            break;
          }
          this.setData({
            pieList: arrays, //中转数据集合
          }) //更新数据，最后遍历的list
        }
      }
      this.pie()
    }
  },

  // 今日历史切换
  changeType: function (e) {
    var index = e.currentTarget.dataset.index;
    this.setData({
      actionIndex: index,
    })
    if (index != 2) {
      this.pushlist();
      this.setData({
        type_index: 0
      })
    } else {
        this.line()
    }
  },

  // unlock() {
  //   // if(this.data.type == 'phone')
  //   //   this.show_ad()
  //   // else
  //   //   this.onShareAppMessage()
  //   this.show_ad()
  // },

  // 展示对应数据
  pushlist: function () {
    var that = this
    if (that.data.actionIndex == 0) {
      that.setData({
        list: that.data.dayList,
      })
    } else if (that.data.actionIndex != 0) {
      wx.getStorage({
        key: 'tests',
        success(res) {
          that.setData({
            list: res.data,
          })
        }
      })
    }
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
      path: 'pages/logs/logs?id=2',
      imageUrl: '',
      promise
    }
  },

  changeChart(e) {
    // console.log(e)
    if (e.currentTarget.dataset.type_index == 0) {
      this.line()
      this.setData({
        type_index: 0
      })
    } else {
        this.pushPie()
      this.setData({
        type_index: 1
      })
    }
  },

  line() {
    // this.setData({
    //   typeIndex: 0
    // })
    // var data_x = this.data.histogramData1;
    // var data_y = this.data.histogramData2;
    if(this.data.line_data.length>0){
    var data_x = this.data.dateLast;
    var data_y = this.data.line_data;
    option = {
      xAxis: {
        type: 'category',
        data: data_x,
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          label: { //数据显示
            show: true,
            color: 'inherit',
            position: 'top',
            fontSize: 10,
          },
          data: data_y,
          type: 'line'
        }
      ]
    }
    setTimeout(() => {
      chart.setOption(option, true);
    }, 800);
    // chart.setOption(option, true);
    }
  },

  bar() {
    // this.setData({
    //   typeIndex: 1
    // })
    option = {
      xAxis: {
        type: 'category',
        data: this.data.histogramData1
      },
      yAxis: {
        type: 'value'
      },

      series: [{
        label: { //数据显示
          show: true,
          color: 'inherit',
          position: 'top',
          fontSize: 10,
        },
        data: this.data.histogramData2,
        type: 'bar',
        showBackground: true,
        backgroundStyle: {
          color: 'rgba(180, 180, 180, 0.2)'
        }
      },
      ]
    }
    chart.setOption(option, true);
  },

  pie() {
    // this.setData({
    //   typeIndex: 2
    // })
    option = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        top: '5%',
        left: 'center'
      },
      series: [
        {
          name: '今日专注数据',
          type: 'pie',
          radius: ['40%', '70%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 1
          },
          label: {
            show: false,
            position: 'center'
          },
          emphasis: {
            label: {
              show: true,
              fontSize: '18',
              fontWeight: 'bold'
            }
          },
          labelLine: {
            show: false
          },
          // data: this.data.histogramData3,
          data: this.data.pieList,
        }
      ]
    };
    setTimeout(() => {
      chart.setOption(option, true);
    }, 500);
  },
})


