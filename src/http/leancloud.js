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
  return user.signUp()
}

export function logInLean(username, password) {
  console.log('登录')
  return AV.User.logIn(username, password)
}
