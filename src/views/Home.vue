<template>
  <div class="home">
    <div class="welcome">
      <h3>{{sentence.en}}</h3>
      <h3>{{sentence.zh}}</h3>
    </div>
    <div class="home-input login" v-if="isLogin">
      <p class="home-msg">{{loginMsg}}</p>
      <div class="username">
        <x-input v-model="username" placeholder="输入用户名"></x-input>
      </div>
      <div class="password">
        <x-input v-model="password" placeholder="输入密码" type="password"></x-input>
      </div>
      <div class="button-group">
        <x-wave class="home-button" @click="logIn">确认登录</x-wave>
        <x-wave class="home-button" @click="changeInput">注册</x-wave>
      </div>
    </div>
    <div class="home-input signup" v-else>
      <p class="home-msg">{{signMsg}}</p>
      <div class="username">
        <x-input v-model="username" placeholder="输入用户名"></x-input>
      </div>
      <div class="password">
        <x-input v-model="password" placeholder="输入密码" type="password"></x-input>
      </div>
      <div class="password">
        <x-input v-model="repeatPassword" placeholder="重复密码" type="password"></x-input>
      </div>
      <div class="button-group">
        <x-wave class="home-button" @click="signUp">注册并登陆</x-wave>
        <x-wave class="home-button" @click="changeInput">登录</x-wave>
      </div>
    </div>
  </div>
</template>

<script>
import xInput from '@/components/input'
import xWave from '@/components/wave'
import perday from '@/assets/js/perday'
import {signUpLean, logInLean} from '@/http/leancloud'
import errorCode from '@/assets/js/errorCode'
import { mapMutations } from 'vuex'

export default {
  name: 'home',
  data() {
    return {
      sentence : null,
      username: '',
      password: '',
      repeatPassword: '',
      loginMsg: '欢迎使用X备忘',
      signMsg: '欢迎注册',
      isLogin: true
    }
  },
  created() {
    this.getSentence()
  },
  mounted() {
  },
  methods: {
    ...mapMutations(['setUser', 'setLogin']),
    getSentence() {
      let index = Math.floor(Math.random() * perday.length)
      this.sentence = perday[index]
    },
    changeInput() {
      this.isLogin = !this.isLogin
      this.username = ''
      this.password = ''
      this.repeatPassword= ''
    },
    signUp() {
      console.log('signUp')
      signUpLean(this.username, this.password).then( res => {
        this.setUser(res)
        this.setLogin(true)
        this.$router.push('/user')
      }, e => {
        this.signMsg = errorCode(e)
      })
    },
    logIn() {
      console.log('login');
      logInLean(this.username, this.password).then( res => {
        this.setUser(res)
        this.setLogin(true)
        this.$router.push('/user')
      }, rev => {
        this.loginMsg = errorCode(rev)
      })
    }
  },
  components: {xInput, xWave}
}
</script>
<style lang="scss">
  $login-color: #ff2e63;
  .home {
    height: 100%;
    width: 100%;
    background: #74ebd5; /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom, #ACB6E5, #74ebd5); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to bottom, #ACB6E5, #74ebd5);
  }
  .welcome {
    text-align: center;
    padding-top: 20px;
    color: #FFF;
    font-family: 'Helvetica Neue', Helvetica, sans-serif;
    > h3 {
      margin-top: 4px;
      font-size: 14px;
    }
  }
  .home-input {
    position: absolute;
    top:  50%;
    left: 50%;
    transform: translate(-50%, -50%);
    max-width: 350px;
    max-height: 350px;
    height: 70%;
    width: 80%;
    background: #fff;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    > .username, .password {
      width: 80%;
    }
    > .home-msg {
      font-size: 16px;
      color: $login-color;
      font-weight: 600;
      user-select: none;
    }
    > .button-group {
      width: 120px;
      > .home-button {
        color: #3e4149;
        height: 40px;
        &:hover {
          background: rgba(0, 0, 0, .04);
        }
      }
    }
  }
</style>
