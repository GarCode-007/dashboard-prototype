import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type QuestionType = 'SA' | 'MA' | 'DL' | 'CF' | 'OE'

export interface QuestionOption {
  id: string
  text: string
  imageUrl?: string
}

export interface Question {
  id: string
  type: QuestionType
  text: string
  points: number
  options: QuestionOption[]
  displayRandomOrder: boolean
  addSkipLogic: boolean
}

interface SurveyState {
  surveyTitle: string
  questions: Question[]
  selectedQuestionId: string | null
}

const initialState: SurveyState = {
  surveyTitle: 'Iron Blue',
  selectedQuestionId: 'q1',
  questions: [
    {
      id: 'q1',
      type: 'SA',
      text: 'Di e-commerce manakah Anda PALING SERING membayar tagihan Internet & TV Kabel dalam 3 Bulan terakhir?',
      points: 10.15,
      options: [
        { id: 'opt1', text: 'Shopee' },
        { id: 'opt2', text: 'Shopee' },
        { id: 'opt3', text: 'Shopee' },
        { id: 'opt4', text: 'Tokopedia' },
      ],
      displayRandomOrder: false,
      addSkipLogic: false,
    },
    {
      id: 'q2',
      type: 'SA',
      text: 'Anda menyatakan bahwa platform yang PALING SERING digunakan untuk melakukan pembayaran Internet & TV Kabel adalah S. Kabel',
      points: 10.15,
      options: [
        { id: 'opt5', text: 'Option 1' },
        { id: 'opt6', text: 'Option 2' },
      ],
      displayRandomOrder: false,
      addSkipLogic: false,
    },
    {
      id: 'q3',
      type: 'DL',
      text: 'Anda menyatakan bahwa platform yang PALING SERING digunakan untuk melakukan pembayaran Internet & TV Kabel',
      points: 10.15,
      options: [
        { id: 'opt7', text: 'Option 1' },
        { id: 'opt8', text: 'Option 2' },
      ],
      displayRandomOrder: false,
      addSkipLogic: false,
    },
  ],
}

const surveySlice = createSlice({
  name: 'survey',
  initialState,
  reducers: {
    setSelectedQuestion: (state, action: PayloadAction<string>) => {
      state.selectedQuestionId = action.payload
    },
    updateQuestionText: (state, action: PayloadAction<{ id: string; text: string }>) => {
      const question = state.questions.find((q) => q.id === action.payload.id)
      if (question) {
        question.text = action.payload.text
      }
    },
    updateQuestionType: (state, action: PayloadAction<{ id: string; type: QuestionType }>) => {
      const question = state.questions.find((q) => q.id === action.payload.id)
      if (question) {
        question.type = action.payload.type
      }
    },
    updateOption: (state, action: PayloadAction<{ questionId: string; optionId: string; text: string }>) => {
      const question = state.questions.find((q) => q.id === action.payload.questionId)
      if (question) {
        const option = question.options.find((o) => o.id === action.payload.optionId)
        if (option) {
          option.text = action.payload.text
        }
      }
    },
    addOption: (state, action: PayloadAction<string>) => {
      const question = state.questions.find((q) => q.id === action.payload)
      if (question) {
        const newId = `opt${Date.now()}`
        question.options.push({ id: newId, text: '' })
      }
    },
    deleteOption: (state, action: PayloadAction<{ questionId: string; optionId: string }>) => {
      const question = state.questions.find((q) => q.id === action.payload.questionId)
      if (question) {
        question.options = question.options.filter((o) => o.id !== action.payload.optionId)
      }
    },
    toggleRandomOrder: (state, action: PayloadAction<string>) => {
      const question = state.questions.find((q) => q.id === action.payload)
      if (question) {
        question.displayRandomOrder = !question.displayRandomOrder
      }
    },
    toggleSkipLogic: (state, action: PayloadAction<string>) => {
      const question = state.questions.find((q) => q.id === action.payload)
      if (question) {
        question.addSkipLogic = !question.addSkipLogic
      }
    },
    addQuestion: (state) => {
      const newId = `q${state.questions.length + 1}`
      state.questions.push({
        id: newId,
        type: 'SA',
        text: '',
        points: 10,
        options: [{ id: 'opt1', text: '' }],
        displayRandomOrder: false,
        addSkipLogic: false,
      })
      state.selectedQuestionId = newId
    },
    setSurveyTitle: (state, action: PayloadAction<string>) => {
      state.surveyTitle = action.payload
    },
  },
})

export const {
  setSelectedQuestion,
  updateQuestionText,
  updateQuestionType,
  updateOption,
  addOption,
  deleteOption,
  toggleRandomOrder,
  toggleSkipLogic,
  addQuestion,
  setSurveyTitle,
} = surveySlice.actions

export default surveySlice.reducer
