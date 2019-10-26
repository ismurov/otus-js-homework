import { ADD, SUB } from "@/constants";

export default {
  lastGameDate: new Date().getTime(),
  day: 1,
  time: 3,
  level: 2,
  operations: [ ADD, SUB ],
  questionsCount: 0,
  correctAnswersCount: 0,
  lastQuestionsCount: 0,
  lastCorrectAnswersCount: 0
}
