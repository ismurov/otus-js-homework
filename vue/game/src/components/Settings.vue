<template lang="pug">
form(@submit.prevent="$emit('submit', $event.target)")
  h2 Настройки
  ul
    li
      Range(
        :label-text="`Длительность ${time} минут${getTimeLabelTextEnding}`"
        id="time"
        :max="maxTime"
        v-model="time"
      )
    li
      Range(
        :label-text="`Сложность ${level}`"
        id="level"
        :max="maxLevel"
        v-model="level"
      )
  ul
    li(v-for="task of tasks" :key="task.id")
      Checkbox(
        :id="task.id"
        :label-text="task.title"
        :is-checked="checkedOperations.indexOf(task.id) > -1"
      )
  button(type="submit") Играть!
</template>

<script>
  import Range from '@/components/Range';
  import Checkbox from '@/components/Checkbox';
  import { OPERATIONS, MAX_TIME, MAX_LEVEL } from '@/constants';

  export default {
    id: 'Settings',

    components: {
      Range,
      Checkbox
    },

    data() {
      return {
        time: this.$store.state.time,
        level: this.$store.state.level,
        maxTime: MAX_TIME,
        maxLevel: MAX_LEVEL,
        tasks: OPERATIONS,
      }
    },

    computed: {
      checkedOperations() {
        return this.$store.state.operations;
      },
      getTimeLabelTextEnding() {
        switch (this.time) {
          case 1:
            return 'а';
          case 2:
          case 3:
          case 4:
            return 'ы';
          default:
            return '';
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  h2
    margin-bottom 0.7em

  button
    position absolute
    bottom 1.5em
    right 2em
</style>
