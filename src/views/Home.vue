<template>
  <div class="home">
    <div class="welcome">
      <h1>欢迎使用X-List备忘本</h1>
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
        <x-wave class="home-button" @click="signUp">确认注册</x-wave>
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
export default {
  name: 'home',
  data() {
    return {
      sentence : null,
      username: '',
      password: '',
      repeatPassword: '',
      loginMsg: '欢迎登录',
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
      signUpLean(this.username, this.password).then(e => {
        this.$router.push('/user')
      }, e => {
        this.signMsg = errorCode(e)
      })
    },
    logIn() {
      console.log('login');
      logInLean(this.username, this.password).then(e => {
        this.$router.push('/user')
      }, e => {
        this.loginMsg = errorCode(e)
      })
    }
  },
  components: {xInput, xWave}
}
</script>
<style lang="scss">
  $wel-fontSize: 32px;
  $wel-fontColor: #48466d;
  $wel-size: 500px;
  $login-size: 360px;
  $login-shadow: #928a97;
  $login-color: #36b1bf;
  .home {
    height: 100%;
    display: flex;
    min-width: 980px;
    justify-content: space-around;
    align-items: center;
    background: #74ebd5; /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom, #ACB6E5, #74ebd5); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to bottom, #ACB6E5, #74ebd5);
  }
  .welcome {
    width: $wel-size;
    > h1 {
      font-size: $wel-fontSize;
      color: $wel-fontColor;
    }
    > h3 {
      font-size: $wel-fontSize/2;
      color: $wel-fontColor;
      margin-top: $wel-fontSize;
    }
  }
  .home-input {
    height: $login-size;
    width: $login-size;
    background: rgba(255,255,255,.6);
    border-radius: 4px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    > .username, .password {
      width: $login-size*0.8;
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
        color: $login-color;
        height: 40px;
        &:hover {
          background: rgba(0, 0, 0, .04);
        }
      }
    }
  }
</style>
