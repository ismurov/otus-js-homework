<template lang="pug">
div
  h1 Привет!
  p Добро пожаловать на {{gameDay}} тренировачный день.
  p Ваш последний результат - решено {{correctAnswersCount}} из {{questionsCount}}
  p Общая точность {{gameAccuracy}}%.
  Settings(
    class="settings"
    @submit="handleSubmit"
  )
  .error(v-if="hasError")
    p {{errorMsg}}
</template>

<script>
  import { mapMutations } from 'vuex';
  import Settings from '@/components/Settings';
  import { OPERATIONS } from "@/constants";

  export default {
    name: 'HomeView',

    components: {
      Settings
    },

    data() {
      return {
        hasError: false,
        errorMsg: ''
      }
    },

    computed: {
      gameDay() {
        return this.$store.state.day;
      },
      questionsCount() {
        return this.$store.state.lastQuestionsCount;
      },
      correctAnswersCount() {
        return this.$store.state.lastCorrectAnswersCount;
      },
      gameAccuracy() {
        return this.$store.getters.gameAccuracy;
      }
    },

    methods: {
      ...mapMutations([
        'setTime',
        'setLevel',
        'setOperations'
      ]),

      handleSubmit(form) {
        const data = new FormData(form);

        const time = +data.get('time');
        const level = +data.get('level');
        const operations = OPERATIONS
          .filter(item => data.get(item.id) !== null)
          .map(item => item.id);

        this.setTime({amount: time});
        this.setLevel({amount: level});
        this.setOperations({amount: operations});

        this.hasError = false;
        this.errorMsg = '';

        if (operations.length) {
          this.$router.push({name: 'game'});
        } else {
          this.hasError = true;
          this.errorMsg = 'Необходимо выбрать хотя бы одну операцию!';
        }
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .settings
    margin-top 2em

  .error
    color: red
</style>
