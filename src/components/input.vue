<template>
  <div class="x-input">
    <span class="label" :class="{[`on-focus`]: onFocus || value}">{{placeholder}}</span>
    <input type="type"
           :value="value"
           @focus="focus"
           @blur="blur"
           @change="$emit('change',$event.target.value)"
           @input="$emit('input',$event.target.value)"
    >
    <div class="input-line" :class="{active: onFocus}"></div>
  </div>
</template>

<script>
  export default {
    name: "xInput",
    props: {
      value: {
        type: String
      },
      placeholder: {
        type: String
      },
      type: {
        type: String,
        default: 'text'
      }
    },
    data(){
      return {
        onFocus: false
      }
    },
    methods: {
      focus(e) {
        this.$emit('focus', e)
        this.onFocus = true
      },
      blur(e) {
        this.$emit('blur', e)
        this.onFocus = false
      }
    }
  }
</script>

<style lang="scss" scoped>
  $borderbase:1px solid rgba(0, 0, 0, .15);
  $input-fontSize: 16px;
  $input-lineHeight: 24px;
  $input-color: #36b1bf;
  $main:rgba(0, 0, 0, .8);
  $sub:rgba(0, 0, 0, .4);
  .x-input {
    position: relative;
    width: 100%;
    > input {
      background: transparent;
      border: none;
      width: 100%;
      border-bottom: $borderbase;
      font-size: $input-fontSize;
      line-height: $input-lineHeight;
      padding: 2px 0;
      color: $main;
      &:focus {
        outline: none;
      }
    }
    > .label {
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      transition: all .3s ease-in-out;
      color: $sub;
      font-size: $input-fontSize;
      line-height: $input-lineHeight;
      pointer-events: none;
      user-select: none;
      &.on-focus {
        font-size: $input-fontSize*0.8;
        transform: translateY(-170%);
        color: $input-color;
      }
    }
    > .input-line {
        position: absolute;
        left: 50%;
        bottom: 0;
        height: 2px;
        width: 0;
        background: $input-color;
        transition: all .2s ease-in-out;
        border-radius: 1px;
        &.active {
          width: 100%;
          transform: translateX(-50%);
        }
    }
  }
</style>
