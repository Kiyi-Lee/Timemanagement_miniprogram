// pages/tap6/tap6.js
const util = require('../../utils/util.js')
const date = new Date()
import * as echarts from '../ec-canvas/echarts';

const app = getApp();
function initChart(canvas, width, height) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height
  });
  canvas.setChart(chart);
  var option = {
    title: {
      text: '数据统计',
      left: 'center',
      textStyle: {
        fontSize: 15
      } 
    },
    color: ["#37A2DA"],
    legend: {
      data: ['A','B'],
      top: 20,
      left: 'center',
      backgroundColor: '#dbdbdb',
      z: 3
    },
    grid: {
        left: 10,//折线图距离左边距
        right: 50,//折线图距离右边距
        top: 50,//折线图距离上边距
        bottom: 10,
        containLabel: true,
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    xAxis: {
      name: '相位',
      type: 'category',
      boundaryGap: true,
      // data: ['0°', '90°', '180°', '270°', '360°'],
      data: app.globalData.datalog,
      axisPointer:{
        snap :true
      },
    //   axisLabel: {
    //     interval: 0,
    //     formatter:function(value)
    //     {
    //         return value.split("").join("\n");
    //     }
    // },
      // data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
      axisTick: {
        alignWithLabel:false,
        interval: 0,
        show: true,
      },
      axisLine: {
        show: true,
        width: 0.1,
        // lineStyle: {
        //   color: 'red'
        // }
      },
      //设置x轴的样式
      axisLabel: {
        //横坐标最后的标注颜色变深
        interval: 1,
        // formatter:function(value)
        // {
        //     return value.split("").join("\n");
        // },
        show: true,
        textStyle: {
          color: '#000000',
          fontSize: '8'
        },
        rotate:45
      },
    },
    yAxis: {
      name: '值',
      x: 'center',
      type: 'value',
      // boundaryGap: ['0.1', '0.1'],
      splitLine: {
        lineStyle: {
          type: 'solid'
        }
      },
      //设置y轴字体样式
      axisLabel: {
        show: true,
        textStyle: {
          color: '#808080',
          fontSize: '10',
        }
      },
      show: true
    },
    series: [
    //   {
    //   name: 'A',
    //   type: 'line',
    //   smooth: true,
    //   // data: app.globalData.datalog
    //   data: [-50,-18, 45, 65, 30, 78, 40, 0]
    // },
    {
        name: 'B',
        type: 'line',
        smooth: false,
        data: app.globalData.hourlog
        // data: [-26, -12, 40, 56, 85, 65, 20, 10],
      }]
  };
  chart.setOption(option);
  return chart;
}
Page({
  data: {
    ec: {
      onInit: initChart
    },
    datalog:[],
    hourlog:[],
    Width:0,
    Height:0
  },
  onShow() {
        //小程序默认高度750rpx，rate=750rpx/res.windowWidth =?/res.windowHeight
        var res=wx.getSystemInfoSync();
        var rate=750 /res.windowWidth;
        var cHeight=rate*res.windowHeight;
        this.setData({
          Width:750 / res.windowWidth,
          Height:cHeight,
        })
    var tests=wx.getStorageSync('tests') || [];
    // console.log(typeof(tests[0].date))
    // console.log(typeof(tests.toString()))
    var demo = tests
    var datatest = []
    var hourtest = []
    var list= []
    var datelist = []
    var count = 0
    // var month = date.getMonth()+1
    var month = 8
    var Sum = 0
      for(var i=0;i<tests.length;i++){
        console.log("0:"+i+"1:"+tests[i].date.slice(7,8)+"2:"+tests[i].date+"3:"+tests[i].date.slice(6,7))
        if((typeof tests[i].date!="undefined") && (tests[i].date.slice(6,7)==month)){
              var timesum = parseInt(demo[i].time)
              list[count]= timesum
              datelist[count] = demo[i].date.slice(5,10)
              count++
              Sum += timesum
              console.log(Sum+"--------"+tests[i].date.slice(7,8)+tests[i].date)
        }else if(tests[i].date.slice(6,7)<month){
          break;
        }
        // else if((typeof tests[i].date!="undefined") && (tests[i].date.slice(6,7)>month)){
        //   break;
        // }
      }
      // app.globalData.datalog = datatest
      app.globalData.hourlog = list
      this.setData({
        hourlog: app.globalData.hourlog
      })
    console.log("sum"+Sum)
    for(var i=0;i<datelist.length;i++){
      console.log(datelist[i]+" ")
    }
    // for(var i=0;i<=demo.length;i++){
      // console.log(i+typeof(tests))
      // console.log(tests[i].date)
      // var demo = tests
      // console.log(demo+typeof(demo))
      // var test = JSON.stringify(demo);
      // test = JSON.parse(demo)
  //     console.log(demo+"{{{{{{{{{{{{{"+typeof(demo))
  // console.log("newData:"+JSON.parse(demo));
  // console.log("new code :" + demo[i].date.slice(6,7)+typeof(demo));  
//       var Sum = 0
// if((demo[i].date.slice(6,7)==month)){
//     var timesum = demo[i].time
//     Sum += timesum
//   }
// }
      console.log('[[[[[[[[['+Sum+"]]]]]]]]]]")
    for(var i=0;i<=7;i++){
      datatest[i] = i
      hourtest[i] = i-100
      // console.log(tests[i].date.substr(5,6))
    }
    app.globalData.datalog = datelist
    // app.globalData.hourlog = hourtest
    this.setData({
      datalog: app.globalData.datalog,
      // hourlog: app.globalData.hourlog
    })
  }
});