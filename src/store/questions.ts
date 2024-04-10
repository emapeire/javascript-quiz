import { create } from 'zustand'
import { type Question } from '../types'
import confetti from 'canvas-confetti'
import { persist, devtools } from 'zustand/middleware'
import { API_URL } from '../constants'

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  goNextQuestion: () => void
  goPreviousQuestion: () => void
  reset: () => void
  allQuestionsAnswered: () => boolean
}

export const useQuestionsStore = create<State>()(
  devtools(
    persist(
      (set, get) => {
        return {
          loading: false,
          questions: [],
          currentQuestion: 0,

          fetchQuestions: async (limit: number) => {
            const res = await fetch(`${API_URL}/data.json`)
            const json = await res.json()

            const questions = json
              .sort(() => Math.random() - 0.5)
              .slice(0, limit)
            set({ questions }, false, 'FETCH_QUESTIONS')
          },

          selectAnswer: (questionId: number, answerIndex: number) => {
            // 1. get the current state
            const { questions } = get()
            // 2. clone the questions array
            const newQuestions = structuredClone(questions)
            const questionIndex = newQuestions.findIndex(
              (q: any) => q.id === questionId
            )
            // 3. update the question with the new answer
            const questionInfo = newQuestions[questionIndex]
            // 4. check if the answer is correct
            const isCorrectUserAnswer =
              questionInfo.correctAnswer === answerIndex
            // 5. if the answer is correct, show confetti
            if (isCorrectUserAnswer) confetti()
            // 6. update the question with the new answer
            newQuestions[questionIndex] = {
              ...questionInfo,
              isCorrectUserAnswer,
              userSelectedAnswer: answerIndex,
              isAnswered: true
            }
            // 7. update the state
            set({ questions: newQuestions }, false, 'SELECT_ANSWER')
          },

          goNextQuestion: () => {
            const { currentQuestion, questions } = get()
            const nextQuestion = currentQuestion + 1

            if (nextQuestion < questions.length) {
              set({ currentQuestion: nextQuestion }, false, 'GO_NEXT_QUESTION')
            }
          },

          goPreviousQuestion: () => {
            const { currentQuestion } = get()
            const previousQuestion = currentQuestion - 1

            if (previousQuestion >= 0) {
              set(
                { currentQuestion: previousQuestion },
                false,
                'GO_PREVIOUS_QUESTION'
              )
            }
          },

          reset: () => {
            set({ currentQuestion: 0, questions: [] }, false, 'RESET')
          },

          allQuestionsAnswered: () => {
            const { questions } = get()
            return questions.every((q) => q.isAnswered)
          }
        }
      },
      {
        name: 'questions'
      }
    )
  )
)
