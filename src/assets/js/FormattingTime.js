export default function FormattingTime(date) {
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
