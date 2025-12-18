import { useState } from 'react'
import { Question } from '@/store/slices/surveySlice'
import { useAppDispatch } from '@/hooks/redux'
import {
  updateQuestionText,
  updateQuestionType,
  updateOption,
  addOption,
  deleteOption,
  toggleRandomOrder,
  toggleSkipLogic,
} from '@/store/slices/surveySlice'

interface QuestionEditorProps {
  question: Question
}

const questionTypes = [
  { value: 'SA', label: 'Single Answer' },
  { value: 'MA', label: 'Multiple Answer' },
  { value: 'DL', label: 'Dropdown List' },
  { value: 'CF', label: 'Checkbox' },
  { value: 'OE', label: 'Open Ended' },
]

export default function QuestionEditor({ question }: QuestionEditorProps) {
  const dispatch = useAppDispatch()

  const handleQuestionTextChange = (text: string) => {
    dispatch(updateQuestionText({ id: question.id, text }))
  }

  const handleTypeChange = (type: string) => {
    dispatch(updateQuestionType({ id: question.id, type: type as any }))
  }

  const handleOptionChange = (optionId: string, text: string) => {
    dispatch(updateOption({ questionId: question.id, optionId, text }))
  }

  const handleAddOption = () => {
    dispatch(addOption(question.id))
  }

  const handleDeleteOption = (optionId: string) => {
    if (question.options.length > 1) {
      dispatch(deleteOption({ questionId: question.id, optionId }))
    }
  }

  const handleToggleRandomOrder = () => {
    dispatch(toggleRandomOrder(question.id))
  }

  const handleToggleSkipLogic = () => {
    dispatch(toggleSkipLogic(question.id))
  }

  return (
    <div className="question-editor">
      <div className="question-editor-header">
        <div className="question-type-selector">
          <select
            className="form-select question-type-select"
            value={question.type}
            onChange={(e) => handleTypeChange(e.target.value)}
          >
            {questionTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </select>
          <span className="question-points">{question.points} points</span>
        </div>
      </div>

      <div className="question-editor-body">
        <div className="form-group">
          <label className="form-label">Question</label>
          <div className="question-text-editor">
            <div className="editor-toolbar">
              <button className="btn-toolbar" title="Bold">
                <strong>B</strong>
              </button>
              <button className="btn-toolbar" title="Italic">
                <em>I</em>
              </button>
              <button className="btn-toolbar" title="Underline">
                <u>U</u>
              </button>
              <button className="btn-toolbar" title="Link">
                <i className="bi bi-link-45deg"></i>
              </button>
              <button className="btn-toolbar" title="Strikethrough">
                <s>S</s>
              </button>
              <button className="btn-toolbar" title="Superscript">
                x<sup>2</sup>
              </button>
              <button className="btn-toolbar" title="Bullet List">
                <i className="bi bi-list-ul"></i>
              </button>
              <button className="btn-toolbar" title="Numbered List">
                <i className="bi bi-list-ol"></i>
              </button>
              <button className="btn-toolbar ms-auto" title="Add Image">
                <i className="bi bi-image"></i> Add Image
              </button>
            </div>
            <textarea
              className="form-control question-textarea"
              value={question.text}
              onChange={(e) => handleQuestionTextChange(e.target.value)}
              rows={3}
              placeholder="Enter your question here..."
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Options</label>

          <div className="question-options-settings">
            <div className="form-check form-check-inline">
              <input
                type="checkbox"
                className="form-check-input"
                id="randomOrder"
                checked={question.displayRandomOrder}
                onChange={handleToggleRandomOrder}
              />
              <label className="form-check-label" htmlFor="randomOrder">
                Display Options in Random Order
              </label>
            </div>
            <div className="form-check form-check-inline">
              <input
                type="checkbox"
                className="form-check-input"
                id="skipLogic"
                checked={question.addSkipLogic}
                onChange={handleToggleSkipLogic}
              />
              <label className="form-check-label" htmlFor="skipLogic">
                Add Skip Logic
              </label>
            </div>
          </div>

          <div className="question-options-list">
            {question.options.map((option, index) => (
              <div key={option.id} className="option-item">
                <span className="option-number">{index + 1}</span>
                <input
                  type="text"
                  className="form-control option-input"
                  value={option.text}
                  onChange={(e) => handleOptionChange(option.id, e.target.value)}
                  placeholder={`Option ${index + 1}`}
                />
                <button className="btn-option-action" title="Add Image">
                  <i className="bi bi-image"></i> Add Image
                </button>
                <button
                  className="btn-option-delete"
                  onClick={() => handleDeleteOption(option.id)}
                  disabled={question.options.length === 1}
                  title="Delete option"
                >
                  <i className="bi bi-trash"></i>
                </button>
              </div>
            ))}
          </div>

          <div className="question-options-actions">
            <button className="btn btn-outline-primary btn-sm" onClick={handleAddOption}>
              <i className="bi bi-plus-circle me-1"></i> Add Option
            </button>
            <button className="btn btn-outline-secondary btn-sm ms-2">
              <i className="bi bi-plus-circle me-1"></i> Add "Other"
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
