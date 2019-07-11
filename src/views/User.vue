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
          <li @click="onClickAction('changeName')">修改昵称</li>
          <li @click="onClickAction('changePassword')">修改密码</li>
          <li @click="onClickAction('logout')">注销登陆</li>
        </ul>
      </transition>
    </header>
    <div class="user-main">
      <p>main</p>
      <x-todo></x-todo>
    </div>
  </div>
</template>
<script>
  import xIcon from '@/components/icon'
  import xTodo from '@/components/todo'
  import { mapState, mapMutations } from 'vuex'
  import {getCurrentUer, logOut} from '@/http/leancloud'

  export default {
    name: 'User',
    components: { xIcon, xTodo },
    data(){
      return {
        actionVisible: false,
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

        }
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
    height: 96px;
  }
</style>
