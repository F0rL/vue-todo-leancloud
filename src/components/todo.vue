<template>
  <div id="todo">
    <input type="checkbox">
    <span class="todo-content">{{todo.content}}</span>
    <x-icon name="add"></x-icon>
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
    padding: 10px 8px;
    background: deepskyblue;
    margin-bottom: 20px;
    border-radius: 8px;
    > .todo-content {
      flex-grow: 1;
      text-align: left;
      margin-left: 10px;
    }
  }
</style>
