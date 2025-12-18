import { Question } from '@/store/slices/surveySlice'
import { useAppDispatch } from '@/hooks/redux'
import { addQuestion } from '@/store/slices/surveySlice'

interface QuestionListProps {
  questions: Question[]
  selectedId: string | null
  onSelectQuestion: (id: string) => void
}

const questionTypeLabels: Record<string, string> = {
  SA: 'SA',
  MA: 'MA',
  DL: 'DL',
  CF: 'CF',
  OE: 'OE',
}

export default function QuestionList({ questions, selectedId, onSelectQuestion }: QuestionListProps) {
  const dispatch = useAppDispatch()

  const handleAddQuestion = () => {
    dispatch(addQuestion())
  }

  return (
    <div className="question-list">
      <div className="question-list-header">
        <h5 className="question-list-title">Questions List</h5>
        <div className="question-list-actions">
          <button className="btn-icon" title="Action 1">
            <i className="bi bi-file-earmark"></i>
          </button>
          <button className="btn-icon" title="Action 2">
            <i className="bi bi-arrow-repeat"></i>
          </button>
          <button className="btn-icon" title="Action 3">
            <i className="bi bi-eye"></i>
          </button>
          <button className="btn-icon btn-primary" onClick={handleAddQuestion} title="Add Question">
            <i className="bi bi-plus-lg"></i>
          </button>
        </div>
      </div>

      <div className="question-list-items">
        {questions.map((question, index) => (
          <div
            key={question.id}
            className={`question-item ${selectedId === question.id ? 'active' : ''}`}
            onClick={() => onSelectQuestion(question.id)}
          >
            <div className="question-item-header">
              <div className="question-item-menu">
                <button className="btn-menu">
                  <i className="bi bi-three-dots"></i>
                </button>
              </div>
            </div>

            <div className="question-item-content">
              <div className="question-item-meta">
                <span className="question-number">Q{index + 1}</span>
                <span className={`question-type-badge badge-${question.type.toLowerCase()}`}>
                  {questionTypeLabels[question.type]}
                </span>
                {question.type === 'DL' && (
                  <span className="question-type-badge badge-cf">CF</span>
                )}
              </div>

              <div className="question-item-text">
                {question.text || 'Empty question'}
              </div>

              <div className="question-item-points">
                <span className="points-badge">{question.points} points</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
