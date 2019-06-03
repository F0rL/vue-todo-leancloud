import AV from 'leancloud-storage'

const APP_ID = 'mDDFlWAeVIznVyJ9QqVXLtjc-gzGzoHsz';
const APP_KEY = '0Vm4Is5zyItX0QfssMs2bKA1';

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

class Leancloud {
  constructor(className) {
    this.className = className
  }

  create(data, dependentClassName, dependentId) {
    if(!data) {
      return Promise.reject('必须提供data数据')
    }
    if(typeof data !== 'object') {
      return Promise.reject('参数data必须为对象')
    }
    let entries = Object.entries(data)
    let instance = new AV.Object(this.className)
    if(dependentClassName && dependentId) {
      //本地构建一个 AV.Object 的方式，通过接口和 objectId 把数据从云端拉取到本地
      let dependentInstance = AV.Object(dependentClassName, dependentId)
      instance.set('dependent', dependentInstance)
    }
    entries.forEach(array => {
      instance.set(array[0], array[1])
    })
    console.log('create todo')
    return instance.save()
  }
}

export default Leancloud


