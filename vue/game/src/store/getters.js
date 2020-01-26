import { MSEC_IN_DAY, SEC_IN_MIN } from "@/constants";

export default {
  gameAccuracy(state) {
    if (!state.questionsCount || !state.correctAnswersCount) {
       return 0;
    }
  return Math.min(100, Math.floor(state.correctAnswersCount / state.questionsCount * 100));
  },

  gameDay(state) {
    return Math.floor((Date.now() - state.lastGameDate) / MSEC_IN_DAY) + 1;
  },

  roundTime(state) {
    return state.time * SEC_IN_MIN;
  }
}
