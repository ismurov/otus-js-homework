<template lang="pug">
.timer(
  :class="{blink: currentTime < 10}"
  :style="`background: linear-gradient(to right, #f6f6f6 ${barValue}%, #b3d5f1 ${barValue}%)`"
)
  | {{timeToView}}
</template>

<script>
  export default {
    name: "Timer",
    props: {
      isWorked: Boolean,
      roundTime: Number,
      currentTime: Number
    },
    computed: {
      timeToView() {
        const
          options = {minute: '2-digit', second: '2-digit'},
          rule = new Intl.DateTimeFormat("en-US", options).format,
          time = new Date(this.currentTime * 1000);

        return rule(time);
      },
      barValue() {
        return Math.floor((this.roundTime - this.currentTime) * 100 / this.roundTime);
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .timer
    position absolute
    width 5.25em
    height 1.65em
    top 1.6em
    right 3em
    text-align center
    line-height 1.65em
    text-transform uppercase
    font-size 1.3em
    color #35495e
    background-color #b3d5f1
    border 2px solid #b3d5f1

  .blink
    animation blink 1s linear infinite

  @keyframes blink
    0%
      color #FFAEAE
    100%
      color #35495e
    0%
      color #FFAEAE
</style>
