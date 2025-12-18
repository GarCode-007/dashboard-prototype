import { useState } from 'react'
import { useAppSelector, useAppDispatch } from '@/hooks/redux'
import { setSurveyTitle } from '@/store/slices/surveySlice'

export default function SurveyHeader() {
  const dispatch = useAppDispatch()
  const surveyTitle = useAppSelector((state) => state.survey.surveyTitle)
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(surveyTitle)

  const handleSave = () => {
    dispatch(setSurveyTitle(editValue))
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditValue(surveyTitle)
    setIsEditing(false)
  }

  return (
    <div className="survey-header">
      <div className="survey-header-content">
        <div className="survey-title-section">
          {isEditing ? (
            <div className="survey-title-edit">
              <input
                type="text"
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                onBlur={handleSave}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSave()
                  if (e.key === 'Escape') handleCancel()
                }}
                autoFocus
                className="survey-title-input"
              />
            </div>
          ) : (
            <div className="survey-title-display">
              <span className="survey-title-label">Survey Title:</span>
              <span className="survey-title-text">{surveyTitle}</span>
              <button
                className="survey-title-edit-btn"
                onClick={() => setIsEditing(true)}
              >
                <i className="bi bi-pencil"></i>
              </button>
            </div>
          )}
        </div>

        <div className="survey-breadcrumb">
          <span className="breadcrumb-item">Home</span>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-item">1. Pick Target Respondent</span>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-item active">2. Input Question</span>
          <span className="breadcrumb-separator">›</span>
          <span className="breadcrumb-item">3. Billing</span>
        </div>

        <div className="survey-actions">
          <button className="btn btn-primary btn-next">
            Next: Billing
            <i className="bi bi-chevron-right ms-2"></i>
          </button>
        </div>
      </div>
    </div>
  )
}
