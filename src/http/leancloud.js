//数据开发指南 https://leancloud.cn/docs/leanstorage_guide-js.html
import AV from 'leancloud-storage'

const APP_ID = 'mDDFlWAeVIznVyJ9QqVXLtjc-gzGzoHsz';
const APP_KEY = '0Vm4Is5zyItX0QfssMs2bKA1';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export function signUpLean(username, password, email) {
  const user = new AV.User()
  user.setUsername(username)
  user.setPassword(password)
  user.setEmail(email)
  console.log('注册')
  setNickname(username,password,username)
  return user.signUp()
}

export function logInLean(username, password) {
  console.log('登录')
  return AV.User.logIn(username, password)
}

function getUserFromAVUser(AVUser) {
  return {
    id: AVUser.id,
    nickName: AVUser.attributes.username,
    ...AVUser.attributes
  }
}
export function getCurrentUer() {
  let currentUser = AV.User.current()
  //console.log(currentUser);
  if(currentUser) {
    return getUserFromAVUser(currentUser)
  }
}
export function setNickname(username, password, nickName) {
  return AV.User.logIn(username, password).then(function (loggedInUser) {
    loggedInUser.set('nickName', nickName);
    return loggedInUser.save();
  })
}

export function logOut() {
  AV.User.logOut()
}
