<template>
  <div id="todo">
    <input type="checkbox">
    <span class="todo-content">{{todo.content}}</span>
    <x-icon name="add" class="todo-delete"></x-icon>
  </div>
</template>

<script>
  import xIcon from '@/components/icon.vue'

  export default {
    name: "xTodo",
    components: {xIcon},
    props: {
      todo: {
        type: Object
      }
    }
  }
</script>

<style lang="scss" scoped>
  #todo {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    font-size: 18px;
    font-family: 'Helvetica Neue', Helvetica, sans-serif;
    padding: 10px 12px;
    background: #00BFFF;
    margin-bottom: 20px;
    border-radius: 8px;
    &:hover {
      box-shadow: 0px 0px 3px 3px rgba(0,191,255,0.57);
    }
    > .todo-content {
      flex-grow: 1;
      text-align: left;
      margin-left: 10px;
      margin-right: 20px;
      cursor: pointer;
    }
    > .todo-delete {
      flex-shrink: 0;
    }
  }
</style>
