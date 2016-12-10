function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function getCurrentDate() {
  var date = new Date();
  return {
    date: date,
    year: date.getFullYear(),
    month: date.getMonth(),
    day: date.getDay()- 2
  }
}
function isFunction(val){
  return typeof val === 'function'
}

module.exports = {
  formatTime: formatTime,
  isFunction: isFunction,
  getCurrentDate: getCurrentDate
}
