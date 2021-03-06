export default function errorCode(error) {
  let code = error.code
  switch (code) {
    case 202:
      return '用户名已经被占用';
    case 203:
      return '电子邮箱地址已经被占用';
    case 210:
      return '用户名和密码不匹配';
    case 211:
      return '找不到用户';
    case 219:
      return '登录失败次数超过限制，请稍候再试';
    default:
      return '未知错误'
  }
}
