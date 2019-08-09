export function FormattingTime(date) {
  let time = date.createTime;
  let week;
  switch (time.getDay()) {
    case 1:
      week = '一';
      break;
    case 2:
      week = '二';
      break;
    case 3:
      week = '三';
      break;
    case 4:
      week = '四';
      break;
    case 5:
      week = '五';
      break;
    case 6:
      week = '六';
      break;
    case 7:
      week = '日';
      break;
  }
  let day = time.getDate();
  let month = time.getMonth() + 1;
  let year = time.getFullYear();
  return `${year}年${month}月${day}日星期${week}`
}

export function getIntervalDay(date){
  let createDay = Date.parse(date.createTime)
  let now = Date.now()
  let intervalSecond = createDay - now
  let n = Math.floor(intervalSecond/(1000 * 60 * 60 * 24))
  let str = ''
  switch (n) {
    case -3:
      str = '前天'
      break
    case -2:
      str = '昨天'
      break
    case -1:
      str = '今天'
      break
    case 0:
      str = '明天'
      break
    case 1:
      str = '后天'
      break
    default:
      str = n > 0 ? `${n+1}天后` : `${-(n+1)}天前`
      break
  }
  return str
}
