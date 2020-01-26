<template lang="pug">
.keyboard
  .key(v-for="(title, index) of keys" :key="index")
    Key(:title="title" :disabled="pause" @handleKeyClick="handleKeyClick")
</template>

<script>
  import Key from '@/components/KeyboardKey';

  export default {
    name: 'Keyboard',
    components: {
      Key
    },
    props: {
      pause: Boolean,
      keys: Array,
      handleKeyClick: Function
    }
  }
</script>

<style lang="stylus" scoped>
  .keyboard
    margin 2em
    display inline-flex
    flex-wrap wrap
    justify-content space-between

  .key
    flex 0 25%
    margin-bottom 1em
    text-align center
    vertical-align center
</style>
