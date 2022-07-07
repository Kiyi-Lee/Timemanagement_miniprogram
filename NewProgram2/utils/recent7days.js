const formatTime = time => {
  const year = time.getFullYear()
  const month = time.getMonth() + 1
  const day = time.getDate()
  const hour = time.getHours()
  const minute = time.getMinutes()
  const second = time.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const formatDate = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return [year, month, day].map(formatNumber).join('-')
}

const getTimeLastWeek = last => {
  const year = last.getFullYear()
  const day = last.getDate()
  var rencent7 = []
  var ti = day
  for (var i = 1; i <= 7; i++) {
    // const ti = day - 7
    // const month6 = last.getMonth() + 1
    // const dayOfWeek = last.getDay() //今天本周的第几天  
    // 判断是否月初
    if (ti <= 0) {
      const month = last.getMonth()
      const d = new Date(year, month, 0)
      const dayBig = d.getDate() //获取当月的所有天数
      const ti1 = dayBig + ti
      rencent7.unshift([year, month, ti1].map(formatNumber).join('-'))
      // console.log(rencent7)
      // rencent7.unshift([month, ti1].map(formatNumber).join('-'))
    } else {
      const month = last.getMonth() + 1
      rencent7.unshift([year, month, ti].map(formatNumber).join('-'))
      // console.log(rencent7)
      // rencent7.unshift([month, ti].map(formatNumber).join('-'))
    }
    ti--;
  }
  // console.log(rencent7)
  return rencent7
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  getTimeLastWeek: getTimeLastWeek
}