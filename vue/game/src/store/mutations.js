import { MSEC_IN_DAY } from '@/constants';

const incQuestionsCount = state => {
  state.questionsCount++;
  state.lastQuestionsCount++;
};


const incCorrectAnswersCount = state => {
  state.correctAnswersCount++;
  state.lastCorrectAnswersCount++;
};


export default {
  setTime(state, payload) {
    state.time = payload.amount;
  },

  setLevel(state, payload) {
    state.level = payload.amount;
  },

  setOperations(state, payload) {
    state.operations = payload.amount;
  },

  correctAnswer(state) {
    incQuestionsCount(state);
    incCorrectAnswersCount(state);
  },

  incorrectAnswer(state) {
    incQuestionsCount(state);
  },

  resetGameCounters(state) {
    state.lastQuestionsCount = 0;
    state.lastCorrectAnswersCount = 0;
  },

  updateLastGameDate(state) {
    const now = new Date();
    const last = new Date(state.lastGameDate);
    last.setHours(0,0,0,0);

    const diff = Math.floor(Math.abs(now.getTime() - last.getTime()) / MSEC_IN_DAY);
    if (diff > 0) {
      state.day++;
    }
    state.lastGameDate = now.getTime();
  }
}
