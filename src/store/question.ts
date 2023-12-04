import { create } from 'zustand'
import { Question } from '../types'

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectedAnswer: (questionId: number, answerIndex: number) => void
}

export const useQuestionStore = create<State>((set, get) => ({
  questions: [],
  currentQuestion: 0,
  fetchQuestions: async (limit) => {
    const res = await fetch('http://localhost:5173/data.json')
    const json = await res.json()

    const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
    set({ questions })
  },

  selectedAnswer: (questionId, answerIndex) => {
    // get is a function that returns the current state
    const { questions } = get()
    // structuredClone is a function that returns a deep copy of an object
    const newQuestions = structuredClone(questions)
    // findIndex is a function that returns the index of an element in an array
    const questionIndex = newQuestions.findIndex((q) => q.id === questionId)
    // it gets the question object from the array
    const questionInfo = newQuestions[questionIndex]
    // it checks if the answer is correct
    const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex
    // it updates the question object with the new values
    newQuestions[questionIndex] = {
      ...questionInfo,
      isCorrectUserAnswer,
      userSelectedAnswer: answerIndex
    }
    // it updates the state
    set({ questions: newQuestions })
  }
}))
