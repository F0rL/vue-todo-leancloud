<template>
  <div class="home">
    <div class="welcome">
      <h1>欢迎使用X-List备忘本</h1>
      <h3>{{sentence.en}}</h3>
      <h3>{{sentence.zh}}</h3>
    </div>
    <div class="login">
      <div class="username">
        <x-input v-model="username" placeholder="输入用户名"></x-input>
      </div>
      <div class="password">
        <x-input v-model="password" placeholder="输入密码" type="password"></x-input>
      </div>
      <div class="button-group">
        <x-wave class="home-button">登录</x-wave>
        <x-wave class="home-button">注册</x-wave>
      </div>
    </div>
  </div>
</template>

<script>
import xInput from '@/components/input'
import xWave from '@/components/wave'
import perday from '@/assets/js/perday'

export default {
  name: 'home',
  data() {
    return {
      sentence : null,
      username: '',
      password: ''
    }
  },
  created() {
    this.getSentence()
  },
  methods: {
    getSentence(){
      let index = Math.floor(Math.random() * perday.length)
      this.sentence = perday[index]
    }
  },
  components: {xInput, xWave}
}
</script>
<style lang="scss">
  $wel-fontSize: 32px;
  $wel-fontColor: #48466d;
  $welcome-size: 500px;
  $login-size: 360px;
  .home {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #74ebd5; /* fallback for old browsers */
    background: -webkit-linear-gradient(to bottom, #ACB6E5, #74ebd5); /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to bottom, #ACB6E5, #74ebd5);
  }
  .welcome {
    margin-right: 200px;
    width: $welcome-size;
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
  .login {
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
    > .button-group {
      width: 120px;
      > .home-button {
        height: 40px;
      }
    }
  }
</style>
