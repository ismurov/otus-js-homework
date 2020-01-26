<template lang="pug">
.game
  button(@click="stop") &#215; Отмена
  Timer(:round-time="roundTime"
        :current-time="currentTime")
  GameDisplay(:operation="currentOperation"
              :user-input-color="userInputColor"
              :user-answer="userAnswer"
              :first-number="firstNumber"
              :result-number="resultNumber")
  Keyboard(:handle-key-click="handleKeyClick"
           :keys="keys"
           :pause="pause")
</template>

<script>
  import {mapMutations} from 'vuex';
  import { ADD, SUB, MUL, DIV, EXP, PAUSE } from "@/constants";
  import Timer from '@/components/Timer';
  import GameDisplay from '@/components/GameDisplay';
  import Keyboard from '@/components/Keyboard';

  export default {
    name: 'GameView',

    components: {
      Timer,
      GameDisplay,
      Keyboard
    },

    data() {
      return {
        roundTime: this.$store.getters.roundTime,
        level: this.$store.state.level,
        operations: this.$store.state.operations,
        currentOperation: this.$store.state.operations.length ? this.$store.state.operations[0] : ADD,

        timer: null,
        currentTime: 0,
        pause: false,

        userInput: [],
        firstNumber: 0,
        secondNumber: 0,
        resultNumber: 0,

        userInputColor: 'lightgray',
        keys: [
          '1', '2', '3', '<',
          '4', '5', '6', '?',
          '7', '8', '9', '=',
           '', '0',  '',  ''
        ]
      };
    },

    computed: {
      userAnswer() {
        const underscoreCount = this.level - this.userInput.length;

        return ('_'.repeat(underscoreCount) + this.userInput.join(''))
          .substring(0, this.level);
      }
    },

    mounted() {
      this.resetGameCounters();
      this.updateLastGameDate();
      this.currentTime = this.roundTime;
      this.generateTask();
      this.start();
    },

    methods: {
      ...mapMutations([
        'correctAnswer',
        'incorrectAnswer',
        'resetGameCounters',
        'updateLastGameDate'
      ]),

      start() {
        if (!this.timer) {
          this.timer = setInterval(() => {
            if (this.currentTime > 0) {
              if (!this.pause) {
                this.currentTime--;
              }
            } else {
              this.pause = true;
              setTimeout(this.stop(), PAUSE);
            }
          }, 1000);
        }
      },

      stop() {
        if (this.timer) {
          clearInterval(this.timer);
          this.timer = null;
          this.$router.push({name:'home'});
        }
      },

      checkAnswer() {
        const isCorrect = parseInt(this.userInput.join('')) === this.secondNumber;
        isCorrect ? this.correctAnswer() : this.incorrectAnswer();
        return isCorrect;
      },

      handleKeyClick(value) {
        let next = false;
        switch(value){
          case '?':
            this.userInput = String(this.secondNumber).split('');
            next = true;
            break;
          case '=':
            this.userInputColor = this.checkAnswer() ? '#41b883' : 'red';
            next = true;
            break;
          case '<':
            if (this.userInput.length) {
              this.userInput.pop();
            }
            break;
          default:
            if (this.userInput.length < this.level && /^\d/.test(value)) {
              this.userInput.push(value);
            }
        }
        if (next) {
          this.pause = true;
          setTimeout(this.nextTask, PAUSE);
        }
      },

      nextTask() {
        this.pause = false;

        this.userInput = [];
        this.userInputColor = 'lightgray';

        const opIndex = Math.floor(Math.random() * this.operations.length);
        this.currentOperation = this.operations[opIndex];

        this.generateTask();
      },

      generateTask() {
        const range = Math.pow(10, this.level) - 2;
        const num1 = Math.floor(Math.random() * range) + 1;
        const num2 = Math.floor(Math.random() * range) + 1;

        switch (this.currentOperation) {
          case ADD:
            this.firstNumber = num1;
            this.secondNumber = num2;
            this.resultNumber = num1 + num2;
            return;

          case SUB:
            this.firstNumber = num1 + num2;
            this.secondNumber = num1;
            this.resultNumber = num2;
            return;

          case MUL:
            this.firstNumber = num1;
            this.secondNumber = num2;
            this.resultNumber = num1 * num2;
            return;

          case DIV:
            this.firstNumber = num1 * num2;
            this.secondNumber = num1;
            this.resultNumber = num2;
            return;

          case EXP:
            this.firstNumber = Math.max(num1, num2);
            this.secondNumber = Math.min(num1, num2);
            this.resultNumber = Math.pow(Math.max(num1, num2), Math.min(num1, num2));
            return;

          default:
            console.error('In game used unexpected mathematical operation: ', this.currentOperation);
        }
      }
    }
  }
</script>
