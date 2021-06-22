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
  for (let i = 1990; i <= date.getFullYear() + 20; i++) {
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
    cutdownList: [],
    cutdownShow: false,
    years,
    year: date.getFullYear(),
    months,
    month: date.getMonth() + 1,
    days,
    day: 1,
    value: [date.getFullYear() - 1990, date.getMonth(), 1],
    CutdownName: '',
    count: '',
    height1:'',
    height2:'',
    rank:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    // console.log(date.getDay());
    var Height = wx.getSystemInfoSync().windowHeight;
    this.setData({
      height1: Height*0.2,
      height2: Height*0.8
    })
    setDate(this.data.year, this.data.month, this);
    var cutdownLogs = wx.getStorageSync('cutdownLogs') || [];
    var list1 = [];
    if (cutdownLogs.length > 0) {
      list1 = cutdownLogs;
      // for(var i=0;i< list1.length;i++)
      //   console.log(list1[i].Day)
      // for (var i = 0; i < cutdownLogs.length; i++) {
      //   list1.push(cutdownLogs[i]);
        this.setData({
          cutdownList: list1
        })
      // }
    }
    for (var j = 0; j < this.data.cutdownList.length; j++) {
      // console.log("j::" + j);
      var k = this.data.cutdownList[j];
      var str2 = k.Nowyear + "-" + k.Nowmonth + "-" + k.Nowday;
      // console.log(str2);

      var str1 = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      // console.log(str1);

      if (str1 != str2) {
        // console.log("0---------------------")
        this.finish(k.Year, k.Month, k.Day);
        // console.log("1---------------------")
        this.refresh(j);
        this.setData({
          cutdownList: cutdownLogs
        })
        // console.log("2---------------------")
      }
    }
    this.sortlist()
  },

  sortlist: function(e){
    if(this.data.cutdownList!=null){
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
        cutdownList:this.data.cutdownList.sort(compare("Daysum")),
      })
    }
  },

  bindChange(e) {
    const val = e.detail.value
    setDate(this.data.years[val[0]], this.data.months[val[1]], this)
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
      // isDaytime: !val[3]
    })
  },

  return: function () {
    // console.log("返回2级页面------");
    this.setData({
      cutdownShow: false
    })
    // wx.removeStorage({
    //   key: 'cutdownLogs',
    //   success (res) {
    //     console.log(res)
    //   }
    // })

    //   var cutdownLogs=wx.getStorageSync('cutdownLogs') || [];
    //   cutdownLogs.unshift({
    //     Nowyear:2021,
    //     Nowmonth:3,
    //     Nowday: 1,

    //     Year: 2021,
    //     Month: 3,
    //     Day: 20,
    //     Importance: "09九九九",
    //     CutdownName: "开口",
    //     Daysum: 31,
    // })
    // wx.setStorageSync('cutdownLogs', cutdownLogs);
  },
  return2: function () {
    // console.log("返回1级页面------");
    wx.navigateBack({
      delta: 0,
    })
  },
  formSubmit: function (e) {
    var CutdownName = e.detail.value.cutdownName;
    this.setData({
      CutdownName: CutdownName
    })
    // console.log(CutdownName);
    if (CutdownName.length == 0 || CutdownName.length >= 6) {
      wx.showToast({
        title: '不能为空或过长',
        image: '../../images/wrong.jpg',
        duration: 1500
      })
      setTimeout(function () {
        wx.hideToast()
      }, 2000)
    } else {
      if (date.getFullYear() > this.data.year) {
        wx.showToast({
          title: '不能设置过去时间',
          image: '../../images/wrong.jpg',
          duration: 1500
        })
        setTimeout(function () {
          wx.hideToast()
        }, 2000)
      } else if (date.getFullYear() == this.data.year) {
        if (date.getMonth() + 1 > this.data.month) {
          wx.showToast({
            title: '不能设定过去时间',
            image: '../../images/wrong.jpg',
            duration: 1500
          })
          setTimeout(function () {
            wx.hideToast()
          }, 2000)
        }
        else if (date.getMonth() + 1 == this.data.month) {
          if (date.getDate() > this.data.day) {
            wx.showToast({
              title: '不能设定过去时间',
              image: '../../images/wrong.jpg',
              duration: 1500
            })
            setTimeout(function () {
              wx.hideToast()
            }, 2000)
          }
          else if (date.getDate() == this.data.day) {
            wx.showToast({
              title: '无法设定今天日期',
              image: '../../images/wrong.jpg',
              duration: 1500
            })
            setTimeout(function () {
              wx.hideToast()
            }, 2000)
          }
          else {
            this.finish(this.data.year, this.data.month, this.data.day);
            this.Save(this.data.year, this.data.month, this.data.day);
          }
        }
        else {
          this.finish(this.data.year, this.data.month, this.data.day);
          this.Save(this.data.year, this.data.month, this.data.day);
        }
      }
      else {
        this.finish(this.data.year, this.data.month, this.data.day);
        this.Save(this.data.year, this.data.month, this.data.day);
      }
    }
  },
  formReset: function (e) {
    this.setData({
      CutdownName: ''
    })
  },
  setCutdown: function (e) {
    // console.log("主界面------" + e);
    this.setData({
      cutdownShow: true,
    })
  },
  finish: function (syear, smonth, sday) {
    var m = 0, n = 0,
      sm = 0,//保存年份总和
      m1 = 0, m2 = 0, m3 = 0, m4 = 0, M = 0, test = 0;  //m1大月，m2小月,m3闰二月，m4平二月
    var flag = 0;//标记闰年
    if (((syear % 4 === 0) && ((syear % 100) !== 0)) || (syear % 400 === 0)) {
      flag = 1;
    }

    //开始判断
    if (date.getMonth() < smonth) {
      for (var i = date.getFullYear(); i < syear; i++) {
        if (((i % 4 === 0) && ((i % 100) !== 0)) || (i % 400 === 0)) {
          m++;//  闰年
        }
        else {
          n++      //平年
        }
        sm = 366 * m + 365 * n   //年的总和天数         
      }
      for (var j = date.getMonth() + 1; j < smonth; j++) {
        //判断大月以及小月
        if ((j == 1) || (j == 3) || (j == 5) || (j == 7) || (j == 8) || (j == 10) || (j == 12)) {
          m1++;
        }
        else if ((j == 4) || (j == 6) || (j == 9) || (j == 11)) {
          m2++;
        } else if (j == 2 && flag == 1) {
          m3++;
        } else if (j == 2 && flag == 0) {
          m4++;
        }
      }
      M = m1 * 31 + m2 * 30 + m3 * 29 + m4 * 28;
      // console.log("M" + M);
      // console.log("m1:" + m1 + "m2:" + m2 + "m3:" + m3 + "m4:" + m4);

      if (date.getDate() >= sday) {  //判断两个数据天数大小
        test = sm + M - Math.abs(date.getDate() - sday);
      } else {
        test = sm + M + Math.abs(date.getDate() - sday);
      }
      this.setData({
        daysum: flag == 1 ? Math.abs(test + 1) : Math.abs(test),
        count: flag == 1 ? Math.abs(test + 1) : Math.abs(test),
      })
    }
    //-------------------------------------------------------------------
    else {  //判断月份大小
      for (var i = date.getFullYear(); i < syear; i++) {
        if (((i % 4 === 0) && ((i % 100) !== 0)) || (i % 400 === 0)) {
          m++;//  闰年
          // console.log(333);
        }
        else {
          n++      //平年
          // console.log(444);
        }
        sm = 366 * m + 365 * n//整年天数
        // console.log("m:" + m + "n:" + n + "sm:" + sm);
      }
      for (var j = smonth; j < date.getMonth() + 1; j++) {
        // console.log(smonth + "现在的月份" + date.getMonth() + 1);
        if ((j == 1) || (j == 3) || (j == 5) || (j == 7) || (j == 8) || (j == 10) || (j == 12)) {
          // sn=sn+31;
          m1++;
        }
        else if ((j == 4) || (j == 6) || (j == 9) || (j == 11)) {
          m2++;
        } else if (j == 2 && flag == 1) {
          m3++;//29天

        } else if (j == 2 && flag == 0) {
          m4++;//28天
        }
      }
      //还没判断nowday，setday大小
      M = m1 * 31 + m2 * 30 + m3 * 29 + m4 * 28;//整月天数
      // console.log("M" + M);
      // console.log("m1:" + m1 + "m2:" + m2 + "m3:" + m3 + "m4:" + m4);

      if (date.getDate() >= sday) {
        test = sm - M - Math.abs(date.getDate() - sday);
        // console.log("test:" + test)
      } else {
        test = sm - M + Math.abs(date.getDate() - sday);
        // console.log("test1:" + test)
      }

      this.setData({
        daysum: flag == 1 ? Math.abs(test + 1) : Math.abs(test),
        count: flag == 1 ? Math.abs(test + 1) : Math.abs(test),
      })
      // console.log("daysum:" + this.data.daysum);
    }
  },

  refresh: function (j) {
    // console.log("refresh")
    var cutdownLogs = wx.getStorageSync('cutdownLogs') || [];
    var MMset;//设定日期的月
    if(cutdownLogs[j].Month<10)
      MMset='0'+cutdownLogs[j].Month
    else
      MMset=(cutdownLogs[j].Month).toString()
    var DDset;//设定日期的日
    if(cutdownLogs[j].Day<10)
      DDset='0'+cutdownLogs[j].Day
    else
      DDset=(cutdownLogs[j].Day).toString()
    var MMnow;//现在的月
    if((date.getMonth() + 1)<10)
      MMnow='0'+(date.getMonth() + 1)
    else
      MMnow=(date.getMonth() + 1).toString()
    var DDnow;//现在的日
    if((date.getDate())<10)
      DDnow='0'+date.getDate()
    else
      DDnow=(date.getDate()).toString()
    // console.log(cutdownLogs[j].Day+"[]"+MMset+"/"+DDset+"/"+MMnow+"/"+DDnow)
    var str1 = (cutdownLogs[j].Year).toString()+MMset+DDset//目标日期
    var str2 = (date.getFullYear()).toString()+MMnow+DDnow//现在日期
    // console.log("1:"+"str1"+str1+"|||||||str2"+str2)
    // console.log(str1>str2)
    if(str1>=str2){
      this.data.cutdownList[j].Daysum = this.data.count;
      this.data.cutdownList[j].Nowyear = date.getFullYear(),
      this.data.cutdownList[j].Nowmonth = date.getMonth() + 1,
      this.data.cutdownList[j].Nowday = date.getDate(),
      cutdownLogs = this.data.cutdownList;
      wx.setStorageSync('cutdownLogs', cutdownLogs);
      // this.setData({
      //   cutdownList: cutdownLogs
      // })
    }else{
      this.data.cutdownList[j].Daysum = 0;
      cutdownLogs = this.data.cutdownList;
      wx.setStorageSync('cutdownLogs', cutdownLogs);
    }
  },

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
    wx.setStorageSync('cutdownLogs', cutdownLogs);
    this.setData({
      cutdownShow: false
    })

    var list1 = [];
    if (cutdownLogs.length > 0) {
      for (var i = 0; i < cutdownLogs.length; i++) {
        list1.push(cutdownLogs[i]);
        this.setData({
          cutdownList: list1
        })
      }
    }
  },

})