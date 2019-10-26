<template lang="pug">
div
  input(:id="id" type="checkbox" :name="id" :checked="isChecked")
  label(:for="id")
    | {{ labelText }}
</template>

<script>
  export default {
    name: 'Checkbox',
    props: {
      id: String,
      labelText: String,
      isChecked: Boolean
    }
  }
</script>

<style lang="stylus" scoped>
  label
    display inline-block
    cursor pointer
    position relative
    padding-left 2.5em
    margin 0.2em 0
    font-size 1em

    &:before
      content ""
      display inline-block
      width 1em
      height 1em
      position absolute
      left 0
      bottom 1px
      border 2px solid #35495e
      border-radius 3px

  input[type=checkbox]
    display none

    &:checked + label:before
      content "\2714"
      font-size 1em
      font-weight bolder
      background-color #2991e4
      color #35495e
      text-align center
      line-height 1em
</style>

