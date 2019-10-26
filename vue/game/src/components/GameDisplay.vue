<template lang="pug">
.game-display
  p
    span {{firstNumber}}
    span &nbsp;{{setSign}}&nbsp;
    span(:style="`color: ${userInputColor}`") {{userAnswer}}
    span &nbsp;=&nbsp;
    span {{resultNumber}}
    span ?
</template>

<script>
import {OPERATIONS} from "@/constants";

  export default {
    name: "GameDisplay",

    props: {
      operation: String,
      userAnswer: String,
      firstNumber: Number,
      resultNumber: Number,
      userInputColor: String
    },

    computed: {
      setSign() {
        return OPERATIONS
          .filter(({id}) => id === this.operation)[0]
          .sign
      },
    }
  }
</script>

<style lang="stylus" scoped>
  .game-display
    display inline-block
    width 100%
    margin 3em 0 0.5em 0
    text-align center
    font-size 2em
    font-weight 500
</style>
