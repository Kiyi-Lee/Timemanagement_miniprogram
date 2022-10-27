// pages/tap1/tap1.js
const date = new Date()
const years = []//创建年月日数组
const months = []
const days = []

for (let i = 1990; i <= date.getFullYear() + 20; i++) {
  years.push(i)
}//年选择范围

for (let i = 1; i <= 12; i++) {
  months.push(i)
}//月选择范围

let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
// 根据年月 获取当月的总天数
let getDays = function (year, month) {
  if (month === 2) {
    return ((year % 4 === 0) && ((year % 100) !== 0)) || (year % 400 === 0) ? 29 : 28
  } else {
    return daysInMonth[month - 1]
  }
}

// 根据年月日设置当前月有多少天 并更新年月日数组
let setDate = function (year, month, _th) {
  let daysNum = getDays(year, month)
  let years = []
  let months = []
  let days = []
  // 重新设置年份列表
  for (let i = 1990; i <= date.getFullYear() + 40; i++) {
    years.push(i)
  }
  // 重新设置月份列表
  for (let i = 1; i <= 12; i++) {
    months.push(i)
  }
  // 重新设置日期列表
  for (let i = 1; i <= daysNum; i++) {
    days.push(i)
  }

  _th.setData({
    years: years,//年份列表
    months: months,//月份列表
    days: days,//日期列表
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: 1,
    daysumRefresh: ''
  })
}

Page({

  /**页面的初始数据*/
  data: {
    cutdownList: [], // 倒计时展示数组
    cutdownShow: false, // 设置倒计时展示标记
    years, // 年数组
    year: date.getFullYear(), // 当前年份
    months, // 月数组 
    month: date.getMonth() + 1, // 当前月份
    days, // 天数组
    day: 1,
    value: [date.getFullYear() - 1990, date.getMonth(), 1], // 当前天数
    CutdownName: '', // 倒计时名称
    count: '', // 计算
    height1: '',  // 高度1，2
    height2: '',
    rank: '', // 排序
    showmodal: false, // 展示模板信息标记
    index: 0, // 选中标记
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    // console.log(date.getDay());
    var Height = wx.getSystemInfoSync().windowHeight; // 获取页面高度
    this.setData({
      height1: Height * 0.2,
      height2: Height * 0.8,
    }) // 设置高度值
    setDate(this.data.year, this.data.month, this);
    // 调用方法 设置当前月有多少天 并更新年月日数组
    var cutdownLogs = wx.getStorageSync('cutdownLogs') || []; // 获取倒计时缓存
    var list1 = []; // 初始化list1数组
    if (cutdownLogs.length > 0) { // 如果倒计时存在数据
      list1 = cutdownLogs; // 将倒计时缓存数据赋值给list1
      this.countDay(list1);
    }
  },

  countDay(list1) {
    for (var j = 0; j < list1.length; j++) { //遍历倒计时数组
      var nowtime = new Date(); //获取当前时间
      var k = list1[j];
      var str = k.Year + "/" + k.Month + "/" + k.Day;
      var endtime = new Date(str); //定义结束时间
      var lefttime = endtime.getTime() - nowtime.getTime(); //距离结束时间的毫秒数
      var leftd = Math.floor(lefttime / (1000 * 60 * 60 * 24));  //计算天数
      var lefth = Math.floor(lefttime / (1000 * 60 * 60) % 24); //计算小时数
      var leftm = Math.floor(lefttime / (1000 * 60) % 60);  //计算分钟数
      var lefts = Math.floor(lefttime / 1000 % 60);  //计算秒数
      var showtime = (lefth > 0 || leftm > 0 || lefts > 0) ? (leftd + 1) : leftd
      k.Daysum = showtime < 0 ? (showtime + 1) : showtime;
    }
    this.sortlist(list1)
  },

  // 排序
  sortlist: function (list) {
    var cutdownList = list;
    function sortDaysum(a, b) {
      return b.Daysum - a.Daysum
    }
    cutdownList.sort(sortDaysum);
    // console.log(cutdownList)
    this.setData({
      cutdownList: cutdownList
    })
    wx.setStorageSync('cutdownLogs', this.data.cutdownList);
  },

  // 日期选择器，日期监听改变事件
  bindChange(e) {
    const val = e.detail.value
    // console.log(val)
    setDate(this.data.years[val[0]], this.data.months[val[1]], this)
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
      // isDaytime: !val[3]
    })
  },

  // 点击事件，选择修改或者删除
  option: function (e) {
    console.log(e)
    this.setData({
      showmodal: !this.data.showmodal,
      index: e.currentTarget.dataset.index
    })
  },

  // 关闭模板信息
  cancel: function () {
    console.log("取消")
    this.setData({
      showmodal: !this.data.showmodal
    })
  },

  // 删除所选倒数日
  delete: function () {
    console.log("删除")
    var list = this.data.cutdownList
    list.splice(this.data.index, 1)
    this.setData({
      cutdownList: list,
      showmodal: !this.data.showmodal
    })
    wx.setStorageSync('cutdownLogs', list);
    wx.showToast({
      title: '删除成功',
      icon: 'success',
      duration: 1200
    })
  },

  // 设置倒数日界面返回
  return: function () {
    // console.log("返回2级页面------");
    this.setData({
      cutdownShow: false
    })
  },

  // 倒数日展示界面返回
  return2: function () {
    // console.log("返回1级页面------");
    wx.navigateBack({
      delta: 0,
    })
  },

  // 倒数日表单提交
  formSubmit: function (e) {
    var CutdownName = e.detail.value.cutdownName;
    this.setData({
      CutdownName: CutdownName
    })
    // console.log(CutdownName);
    if (CutdownName.length == 0 || CutdownName.length >= 6) {
      wx.showToast({
        title: '不能为空或过长',
        icon: 'error',
        duration: 1500
      })
    } else {
      var nowtime = new Date(); //获取当前时间
      var str = this.data.year + "/" + this.data.month + "/" + this.data.day;
      var endtime = new Date(str); //定义结束时间
      var lefttime = endtime.getTime() - nowtime.getTime(); //距离结束时间的毫秒数
      if (lefttime <= 0) {
        wx.showToast({
          title: '时间不允许',
          icon: "error",
          duration: 1500
        })
      } else {
        wx.showToast({
          title: '设置成功',
          icon: 'success',
          duration: 1500
        })
        this.Save(this.data.year, this.data.month, this.data.day)
      }
      // if (date.getFullYear() > this.data.year) {
      //   wx.showToast({
      //     title: '不能设置过去时间',
      //     image: '../../images/wrong.jpg',
      //     duration: 1500
      //   })
      // } else if (date.getFullYear() == this.data.year) {
      //   if (date.getMonth() + 1 > this.data.month) {
      //     wx.showToast({
      //       title: '不能设定过去时间',
      //       image: '../../images/wrong.jpg',
      //       duration: 1500
      //     })
      //   }
      //   else if (date.getMonth() + 1 == this.data.month) {
      //     if (date.getDate() > this.data.day) {
      //       wx.showToast({
      //         title: '不能设定过去时间',
      //         image: '../../images/wrong.jpg',
      //         duration: 1500
      //       })
      //       setTimeout(function () {
      //         wx.hideToast()
      //       }, 2000)
      //     }
      //     else if (date.getDate() == this.data.day) {
      //       wx.showToast({
      //         title: '无法设定今天日期',
      //         image: '../../images/wrong.jpg',
      //         duration: 1500
      //       })
      //       setTimeout(function () {
      //         wx.hideToast()
      //       }, 2000)
      //     }
      //     else {
      //       this.finish(this.data.year, this.data.month, this.data.day);
      //       this.Save(this.data.year, this.data.month, this.data.day);
      //     }
      //   }
      //   else {
      //     this.finish(this.data.year, this.data.month, this.data.day);
      //     this.Save(this.data.year, this.data.month, this.data.day);
      //   }
      // }
      // else {
      //   this.finish(this.data.year, this.data.month, this.data.day);
      //   this.Save(this.data.year, this.data.month, this.data.day);
      // }
    }
  },

  // 重置倒计时名称
  formReset: function (e) {
    this.setData({
      CutdownName: ''
    })
  },

  // 设置倒数日
  setCutdown: function (e) {
    this.setData({
      cutdownShow: true,
    })
  },

  // 完成后计算天数
  // finish: function (syear, smonth, sday) {
  //   var m = 0, n = 0,
  //     sm = 0,//保存年份总和
  //     m1 = 0, m2 = 0, m3 = 0, m4 = 0, M = 0, test = 0;  //m1大月，m2小月,m3闰二月，m4平二月
  //   var flag = 0;//标记闰年
  //   if (((syear % 4 === 0) && ((syear % 100) !== 0)) || (syear % 400 === 0)) {
  //     flag = 1;
  //   }

  //   //开始判断
  //   if (date.getMonth() < smonth) {
  //     for (var i = date.getFullYear(); i < syear; i++) {
  //       if (((i % 4 === 0) && ((i % 100) !== 0)) || (i % 400 === 0)) {
  //         m++;//  闰年
  //       }
  //       else {
  //         n++      //平年
  //       }
  //       sm = 366 * m + 365 * n   //年的总和天数         
  //     }
  //     for (var j = date.getMonth() + 1; j < smonth; j++) {
  //       //判断大月以及小月
  //       if ((j == 1) || (j == 3) || (j == 5) || (j == 7) || (j == 8) || (j == 10) || (j == 12)) {
  //         m1++;
  //       }
  //       else if ((j == 4) || (j == 6) || (j == 9) || (j == 11)) {
  //         m2++;
  //       } else if (j == 2 && flag == 1) {
  //         m3++;
  //       } else if (j == 2 && flag == 0) {
  //         m4++;
  //       }
  //     }
  //     M = m1 * 31 + m2 * 30 + m3 * 29 + m4 * 28;
  //     // console.log("M" + M);
  //     // console.log("m1:" + m1 + "m2:" + m2 + "m3:" + m3 + "m4:" + m4);

  //     if (date.getDate() >= sday) {  //判断两个数据天数大小
  //       test = sm + M - Math.abs(date.getDate() - sday);
  //     } else {
  //       test = sm + M + Math.abs(date.getDate() - sday);
  //     }
  //     this.setData({
  //       daysum: flag == 1 ? Math.abs(test + 1) : Math.abs(test),
  //       count: flag == 1 ? Math.abs(test + 1) : Math.abs(test),
  //     })
  //   }
  //   //-------------------------------------------------------------------
  //   else {  //判断月份大小
  //     for (var i = date.getFullYear(); i < syear; i++) {
  //       if (((i % 4 === 0) && ((i % 100) !== 0)) || (i % 400 === 0)) {
  //         m++;//  闰年
  //         // console.log(333);
  //       }
  //       else {
  //         n++      //平年
  //         // console.log(444);
  //       }
  //       sm = 366 * m + 365 * n//整年天数
  //       // console.log("m:" + m + "n:" + n + "sm:" + sm);
  //     }
  //     for (var j = smonth; j < date.getMonth() + 1; j++) {
  //       // console.log(smonth + "现在的月份" + date.getMonth() + 1);
  //       if ((j == 1) || (j == 3) || (j == 5) || (j == 7) || (j == 8) || (j == 10) || (j == 12)) {
  //         // sn=sn+31;
  //         m1++;
  //       }
  //       else if ((j == 4) || (j == 6) || (j == 9) || (j == 11)) {
  //         m2++;
  //       } else if (j == 2 && flag == 1) {
  //         m3++;//29天

  //       } else if (j == 2 && flag == 0) {
  //         m4++;//28天
  //       }
  //     }
  //     //还没判断nowday，setday大小
  //     M = m1 * 31 + m2 * 30 + m3 * 29 + m4 * 28;//整月天数
  //     // console.log("M" + M);
  //     // console.log("m1:" + m1 + "m2:" + m2 + "m3:" + m3 + "m4:" + m4);

  //     if (date.getDate() >= sday) {
  //       test = sm - M - Math.abs(date.getDate() - sday);
  //       // console.log("test:" + test)
  //     } else {
  //       test = sm - M + Math.abs(date.getDate() - sday);
  //       // console.log("test1:" + test)
  //     }

  //     this.setData({
  //       daysum: flag == 1 ? Math.abs(test + 1) : Math.abs(test),
  //       count: flag == 1 ? Math.abs(test + 1) : Math.abs(test),
  //     })
  //     // console.log("daysum:" + this.data.daysum);
  //   }
  // },

  // 倒计时刷新
  // refresh: function (j) {
  //   // console.log("refresh")
  //   var cutdownLogs = wx.getStorageSync('cutdownLogs') || [];
  //   var MMset;//设定日期的月
  //   if (cutdownLogs[j].Month < 10)
  //     MMset = '0' + cutdownLogs[j].Month
  //   else
  //     MMset = (cutdownLogs[j].Month).toString()
  //   var DDset;//设定日期的日
  //   if (cutdownLogs[j].Day < 10)
  //     DDset = '0' + cutdownLogs[j].Day
  //   else
  //     DDset = (cutdownLogs[j].Day).toString()
  //   var MMnow;//现在的月
  //   if ((date.getMonth() + 1) < 10)
  //     MMnow = '0' + (date.getMonth() + 1)
  //   else
  //     MMnow = (date.getMonth() + 1).toString()
  //   var DDnow;//现在的日
  //   if ((date.getDate()) < 10)
  //     DDnow = '0' + date.getDate()
  //   else
  //     DDnow = (date.getDate()).toString()
  //   // console.log(cutdownLogs[j].Day+"[]"+MMset+"/"+DDset+"/"+MMnow+"/"+DDnow)
  //   var str1 = (cutdownLogs[j].Year).toString() + MMset + DDset//目标日期
  //   var str2 = (date.getFullYear()).toString() + MMnow + DDnow//现在日期
  //   // console.log("1:"+"str1"+str1+"|||||||str2"+str2)
  //   // console.log(str1>str2)
  //   if (str1 >= str2) {
  //     this.data.cutdownList[j].Daysum = this.data.count;
  //     this.data.cutdownList[j].Nowyear = date.getFullYear(),
  //       this.data.cutdownList[j].Nowmonth = date.getMonth() + 1,
  //       this.data.cutdownList[j].Nowday = date.getDate(),
  //       cutdownLogs = this.data.cutdownList;
  //     wx.setStorageSync('cutdownLogs', cutdownLogs);
  //     // this.setData({
  //     //   cutdownList: cutdownLogs
  //     // })
  //   } else {
  //     this.data.cutdownList[j].Daysum = 0;
  //     cutdownLogs = this.data.cutdownList;
  //     wx.setStorageSync('cutdownLogs', cutdownLogs);
  //   }
  // },

  // 保存倒计时
  Save: function (syear, smonth, sday) {
    var cutdownLogs = wx.getStorageSync('cutdownLogs') || [];
    cutdownLogs.unshift({

      Nowyear: date.getFullYear(),
      Nowmonth: date.getMonth() + 1,
      Nowday: date.getDate(),

      Year: syear,
      Month: smonth,
      Day: sday,
      // Importance: (this.data.isDaytime == true ? '重要' : '一般'),
      CutdownName: this.data.CutdownName,
      Daysum: this.data.daysum,
    })
    this.setData({
      cutdownShow: false,
      cutdownList: cutdownLogs
    })
    wx.setStorageSync('cutdownLogs', cutdownLogs);
    this.countDay(cutdownLogs)
    // var list1 = [];
    // if (cutdownLogs.length > 0) {
    //   for (var i = 0; i < cutdownLogs.length; i++) {
    //     list1.push(cutdownLogs[i]);
    //     this.setData({
    //       cutdownList: list1
    //     })
    //   }
    // }
  },

})