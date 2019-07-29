<template>
  <div class="user">
    <header class="user-header">
      <div class="user-menu">
        <x-icon name="menu" style="width:20px;height:20px;"></x-icon>
      </div>
      <div class="user-logo">
        <x-icon name="logo" style="width:24px;height:24px;"></x-icon>
        <span class="text">备忘本</span>
      </div>
      <div class="user-info" @click="onClickUserInfo">
        <x-icon name="login" style="width:20px;height:20px;"></x-icon>
        <div class="user-name">{{user.username}}</div>
      </div>
      <transition name="action-slide">
        <ul class="action" v-show="actionVisible">
<!--          <li @click="onClickAction('changeName')">修改用户名</li>-->
<!--          <li @click="onClickAction('changePassword')">修改密码</li>-->
          <li @click="onClickAction('logout')">注销登陆</li>
        </ul>
      </transition>
    </header>
    <div class="mask" v-show="dialogVisible">
      <div class="dialog">
        <x-icon name="close" class="dialog-close" @click="closeDialog"></x-icon>
        <span class="dialog-title">{{dialogTitle}}</span>
        <x-input class="dialog-input" v-model.trim="newInfo"></x-input>
        <x-wave class="dialog-btn" @click="submitChange">确定</x-wave>
      </div>
    </div>
    <div class="user-main">
      <p>main</p>
      <x-todo></x-todo>
    </div>
  </div>
</template>
<script>
  import xIcon from '@/components/icon'
  import xInput from '@/components/input'
  import xTodo from '@/components/todo'
  import xWave from '@/components/wave'
  import { mapState } from 'vuex'
  import {getCurrentUer, logOut, setPassword} from '@/http/leancloud'

  export default {
    name: 'User',
    components: { xIcon, xInput, xWave,  xTodo },
    data(){
      return {
        actionVisible: false,
        dialogVisible: false,
        dialogTitle: '请输入新密码',
        newInfo: '',
        changeType: ''
      }
    },
    computed: {
      ...mapState({
        user: state => state.auth.user
      })
    },
    mounted() {
      this.getUser()
    },
    methods: {
      getUser() {
        console.log(getCurrentUer())
      },
      onClickUserInfo(){
        this.actionVisible = !this.actionVisible
      },
      onClickAction(type) {
        if(type === 'logout') {
          logOut()
          console.log(getCurrentUer())
          this.$router.push('/')
        } else {
          this.dialogVisible = true
          if(type === 'changeName') {
            this.dialogTitle = '请输入新的用户名'
            this.changeType = type
            this.newInfo = ''
          } else if (type === 'changePassword') {
            this.dialogTitle =  '请输入新的密码'
            this.changeType = type
            this.newInfo = ''
          }
        }
      },
      submitChange(){
        if(this.changeType === 'changeName') {
          alert('changename')
          this.closeDialog()
        }else {
          setPassword(this.newInfo)
          this.closeDialog()
        }
      },
      closeDialog() {
        this.dialogVisible = false
      }
    }
  }
</script>
<style lang="scss" scoped>
  $user-bg-color: rgba(0, 0, 0, 0.65);
  $header-bg-color: #fff;

  .user {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    background-color: $user-bg-color;
    /*background-color: #fff;*/
    > .user-header {
      height: 60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 30px;
      background: linear-gradient(to right, $header-bg-color, #fff);
      box-shadow: 0 4px 4px -4px rgba(0, 0, 0, 0.15);
      position: relative;
      z-index: 10;
      > .user-menu {
        width: 35px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        border-radius: 2px;
        background: transparent;
        transition: all 0.2s linear;
        &:hover {
          background: rgba(0, 0, 0, 0.15);
        }
      }
      > .user-logo {
        display: flex;
        justify-content: flex-start;
        align-items: center;
        user-select: none;
        >.text {
          font-size: 22px;
          font-weight: 600;
          margin-left: 4px;
          font-style: italic;
        }
      }
      > .user-info {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        height: 100%;
        text-align: center;
        width: 100px;
        &:hover {
          background: rgba(0, 0, 0, 0.15);
        }
        >.user-name {
          font-size: 14px;
          margin-left: 6px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          user-select: none;
        }
      }
      > .action {
        position: absolute;
        top: 100%;
        right: 30px;
        cursor: pointer;
        background-color: #fff;
        border-bottom-left-radius: 4px;
        border-bottom-right-radius: 4px;
        > li {
          font-size: 16px;
          width: 100px;
          padding: 8px 8px;
          background: transparent;
          text-align: center;
          &:hover {
            background-color: #ccc;
          }
          &:last-child {
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
          }
        }
      }
    }
    > .mask {
      width: 100%;
      height: 100%;
      position: fixed;
      z-index: 5;
      background: rgba(0, 0, 0, 0.04);
      > .dialog {
        width: 300px;
        height: 200px;
        position: fixed;
        top: 30%;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        border-radius: 4px;
        background: rgba(255, 255, 255, 0.85);
        > .dialog-close {
          position: absolute;
          top: 10px;
          right: 10px;
          color: #000;
          cursor: pointer;
          font-size: 18px;
        }
        > .dialog-title {
          font-size: 18px;
          font-weight: 600;
          user-select: none;
        }
        > .dialog-input {
          width: 70%;
        }
        > .dialog-btn {
          width: 100px;
          height: 35px;
          border-radius: 4px;
          cursor: pointer;
          background: transparent;
          transition: all 0.2s linear;
          &:hover {
            background: rgba(0, 0, 0, .04);
          }
        }

      }
    }
  }

  .action-slide-enter-active,
  .action-slide-leave-active {
    transition: all 0.3s ease-in-out;
    overflow: hidden;
  }
  .action-slide-enter,
  .action-slide-leave-to {
    height: 0;
  }
  .action-slide-enter-to,
  .action-slide-leave {
    height: 32px;
  }
</style>
