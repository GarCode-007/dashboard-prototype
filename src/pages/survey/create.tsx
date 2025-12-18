import { useState } from 'react'
import Head from 'next/head'
import SurveyHeader from '@/components/Survey/SurveyHeader'
import QuestionList from '@/components/Survey/QuestionList'
import QuestionEditor from '@/components/Survey/QuestionEditor'
import { useAppSelector, useAppDispatch } from '@/hooks/redux'
import { setSelectedQuestion } from '@/store/slices/surveySlice'

export default function SurveyCreate() {
  const dispatch = useAppDispatch()
  const { questions, selectedQuestionId } = useAppSelector((state) => state.survey)
  const selectedQuestion = questions.find((q) => q.id === selectedQuestionId)

  const handleSelectQuestion = (id: string) => {
    dispatch(setSelectedQuestion(id))
  }

  return (
    <>
      <Head>
        <title>Survey Creation - Iron Blue</title>
      </Head>

      <div className="survey-page">
        <SurveyHeader />

        <div className="survey-content">
          <div className="survey-sidebar">
            <QuestionList
              questions={questions}
              selectedId={selectedQuestionId}
              onSelectQuestion={handleSelectQuestion}
            />
          </div>

          <div className="survey-main">
            {selectedQuestion && (
              <QuestionEditor question={selectedQuestion} />
            )}
          </div>
        </div>
      </div>
    </>
  )
}
