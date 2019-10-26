<template lang="pug">
button(
  :class="['key', getColorClass]"
  :disabled="checkDisabled"
  @click="$emit('handleKeyClick', title)"
) {{title}}
</template>

<script>
  export default {
    name: "KeyboardKey",
    props: {
      title: String,
      disabled: Boolean
    },
    computed: {
      checkDisabled() {
        return !this.title || this.disabled;
      },

      getColorClass() {
        const title = this.title;
        if (title === '') {
          return 'empty';
        } else if (parseInt(title)) {
          return 'number';
        }
        return 'char'
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .key
    margin 0 auto
    padding 0
    width 2.2em
    height 2.2em
    border 1px solid
    border-radius 1.1em
    text-align center
    line-height 2.2em
    font-size 1.5em
    font-weight bold
    cursor pointer
    box-shadow 0 3px 5px 1px gray
    outline: none;

    &:active
      box-shadow none

  .number
    border-color #2991e4
    background-color #2991e4

  .char
    color: #25394e
    border-color #777
    background-color #777

  .empty
    box-shadow none
    border-color transparent
    background none
    cursor auto
</style>
