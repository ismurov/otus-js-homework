<template lang="pug">
div
  input(
    :id="id"
    type="range"
    :name="id"
    min="1"
    :max="max"
    step="1"
    :value="value"
    @change="$emit('change', +($event.target.value))"
  )
  p
    label(:for="id")
      | {{ labelText }}
</template>

<script>
  export default {
    name: 'Range',
    model: {
      event: 'change'
    },
    props: {
      id: String,
      labelText: String,
      max: Number,
      value: Number
    }
  }
</script>

<style lang="stylus" scoped>
  input[type=range]
    height 25px
    -webkit-appearance none
    margin 0
    width 50%

    &:focus
      outline none

      &::-webkit-slider-runnable-track
      &::-ms-fill-lower
      &::-ms-fill-upper
        background: #2991e4

    &::-webkit-slider-runnable-track
      background  #2991e3
      width 100%
      height 4px
      cursor pointer
      animate 0.2s
      box-shadow 0 0 0 #000000
      border-radius 1px
      border 0 solid #000000

    &::-webkit-slider-thumb
      background #2991e4
      box-shadow 0 0 0 #CCCCCC
      border 2px solid #35495e
      height 1.2em
      width 1.2em
      border-radius 0.6em
      cursor pointer
      -webkit-appearance none
      margin-top -0.45em

    &::-moz-range-track
      background #2991e3
      width 100%
      height 4px
      cursor pointer
      animate 0.2s
      box-shadow 0 0 0 #000000
      border-radius: 1px
      border 0 solid #000000

    &::-moz-range-thumb
      background #2991e3
      box-shadow 0 0 0 #CCCCCC
      border 2px solid #35495e
      height 1em
      width 1em
      border-radius 1em
      cursor pointer

    &::-ms-track
      width 100%
      height 4px
      cursor pointer;
      animate 0.2s
      background transparent
      border-color transparent
      color transparent

    &::-ms-fill-lower
    &::-ms-fill-upper
      background #2991e3
      box-shadow 0 0 0 #000000
      border 0 solid #000000
      border-radius 2px

    &::-ms-thumb
      background #2991e4
      box-shadow 0 0 0 #CCCCCC
      margin-top 1px
      border 2px solid #35495e
      height 1em
      width 1em
      border-radius 1em
      cursor pointer
</style>
