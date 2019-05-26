<template>
  <div class="wave" @click="onclick">
    <div class="wave-slot">
      <slot></slot>
    </div>
    <span class="wave-back" v-show="showWave" :style="wStyle" ref="wave"></span>
  </div>
</template>

<script>
  export default {
    name: "xWave",
    props: {
      duration: {
        type: Number,
        default: 500
      }
    },
    data() {
      return {
        showWave: false
      }
    },
    mounted() {
      this.$refs.wave.addEventListener('animationend', this.endWave)
    },
    methods: {
      onclick(e){
        this.$emit('click', e)
        if(this.showWave){ return }
        let {offsetX: x, offsetY: y} = e
        this.showWave = true
        this.$refs.wave.style.left = x + 'px'
        this.$refs.wave.style.top = y + 'px'
      },
      endWave(){
        this.showWave = false
      }
    },
    beforeDestroy(){
      this.$refs.wave.addEventListener('animationend', this.endWave)
    },
    computed: {
      wStyle() {
        return {
          ['animation-duration']: `${this.duration}ms`
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  $wave-bg: rgba(0, 0, 0, .04);
  .wave {
    width: 100%;
    height: 100%;
    position: relative;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    border-radius: 4px;
    cursor: pointer;
    overflow: hidden;
    > .wave-slot {
      pointer-events: none;
    }
    > .wave-back {
      pointer-events: none;
      position: absolute;
      border-radius: inherit;
      width: 5px;
      height: 5px;
      transform: translate(-50%, -50%);
      background: $wave-bg;
      animation-name: wave-active;
      animation-timing-function: linear;
    }
  }
  @keyframes wave-active {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(40);
    }
  }
</style>
