<template>
  <div id="todo">
    <div class="todo-time">
      <span>{{intervalDay}}</span>
      <span>{{todoTime}}</span>
    </div>
    <div class="todo-main">
      <input type="checkbox"  class="todo-change" @click="sendChangeId" :checked="isDone">
      <span class="todo-content" :class="{done: isDone}">{{todo.content}}</span>
      <x-icon name="add" class="todo-delete" @click="sendDeleteId"></x-icon>
    </div>
  </div>
</template>

<script>
  import xIcon from '@/components/icon.vue'
  import {FormattingTime, getIntervalDay} from '@/assets/js/FormattingTime.js'

  export default {
    name: "xTodo",
    components: {xIcon},
    props: {
      todo: {
        type: Object
      }
    },
    computed: {
      todoTime(){
        return FormattingTime(this.todo)
      },
      intervalDay(){
        return getIntervalDay(this.todo)
      },
      isDone(){
        if(this.todo.status === 'processing') {
          return false
        }else {
          return true
        }
      }
    },
    methods: {
      sendDeleteId(){
        this.$emit('sendDeleteIdByItem', this.todo.id)
      },
      sendChangeId(){
        let status = this.todo.status === 'processing' ? 'completed' : 'processing'
        let payload = {id: this.todo.id, status: status}
        this.$emit('sendChangeIdByItem', payload)
      }
    }
  }
</script>

<style lang="scss" scoped>
  #todo {
    margin: 0 10px;
    > .todo-time {
      display: flex;
      align-items: center;
      padding: 2px 10px;
      color: #aaa;
      margin-bottom: 2px;
      cursor: default;
      & > span:first-child {
        font-size: 14px;

      }
      & > span:nth-child(2) {
        margin: 0 auto;
      }
    }
    > .todo-main {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      font-size: 18px;
      font-family: 'Helvetica Neue', Helvetica, sans-serif;
      padding: 10px 12px;
      background: #fff;
      margin-bottom: 10px;
      border-radius: 8px;
      &:hover {
        box-shadow: 0px 0px 3px 3px rgba(265,265,265,0.8);
        .todo-delete {
          visibility: visible;
        }
      }
      > .todo-change {
        position: relative;
        text-align: center;
        cursor: pointer;
        &:after {
          position: absolute;
          content: '';
          width: 16px;
          height: 16px;
          border: 2px solid #000;
          background-color: #fff;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
        }
        &:checked:after {
          position: absolute;
          border: none;
          width: 18px;
          height: 18px;
          line-height: 18px;
          content: '✓';
          font-weight: bolder;
          color: #fff;
          background-color: #00CCFF;
          font-size: 16px;
        }
      }
      > .todo-content {
        flex-grow: 1;
        text-align: left;
        margin-left: 10px;
        margin-right: 20px;
        cursor: default;
        letter-spacing: revert;
      }
      > .todo-content.done {
        color: #ccc;
        text-decoration: line-through;
      }
      > .todo-delete {
        visibility: hidden;
        flex-shrink: 0;
        transform: rotate(45deg);
        font-size: 18px;
        color: #ed1250;
        cursor: pointer;
      }
    }
  }
</style>
