<template lang="pug">
#app
  router-view
</template>

<script>
  export default {
    name: 'App'
  };
</script>

<style lang="stylus">
  body
    background #e2e1e0

  #app
    position relative
    width 400px
    height 600px
    margin 3rem auto
    padding 2rem 4rem
    color #35495e
    background #fff
    border-radius 5px
    box-shadow 0 3px 6px rgba(0,0,0,0.10), 0 3px 6px rgba(0,0,0,0.15)
    font-family 'Avenir', Helvetica, Arial, sans-serif
    user-select none

  h1, h2, p
      margin 0

  h1
    font-size 1.6em
    font-weight 500
    margin-bottom 1em

  h2
    font-size 1.2em
    font-weight 500
    margin-bottom 0.3em

  p
    margin-bottom 0.1em
    line-height 1.5em

  ul
    list-style none
    margin 0 0 1.5em 0
    padding-left 0

  button
    padding: 0.6em 1em;
    color: #35495e;
    background: none;
    border: 1px solid transparent;
    border-radius: 3px;
    box-shadow: 0 2px 2px 1px #d3d3d3;
    font-size: 1em;
    cursor: pointer;

    $:active
    $:focus
      outline none

    $:active
      box-shadow none
</style>
