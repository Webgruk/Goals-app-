import { useDispatch } from 'react-redux'
import { FaPen } from 'react-icons/fa'
import { deleteGoal, updateGoal } from '../features/goals/goalsSlice'
import { useEffect, useState } from 'react'

function GoalItem({ goal }) {
  const dispatch = useDispatch()
  const mainGoal = goal._id

  const str = mainGoal.toString()
  var input
  var texts

  useEffect(() => {
    input = document.querySelector(`.input${str}`)
    texts = document.querySelector(`.texts${str}`)
  })

  const [newText, setNewText] = useState('')

  const showText = () => {
    texts.classList.remove('hide')
    input.classList.add('hide')
  }

  const focusInput = (e) => {
    input.style.outlineColor = 'grey'
    input.classList.remove('hide')
    texts.classList.add('hide')

    input.focus()
  }
  const onSubmit = (e) => {
    e.preventDefault()
    dispatch(updateGoal({ text: newText, id: goal._id }))
    setNewText('')
  }
  return (
    <div className={`goal main${str}`} onMouseLeave={showText}>
      <h2>{new Date(goal.createdAt).toLocaleString('en-US')}</h2>
      <h4 className={`texts${str}`}>{goal.text}</h4>

      <div className="btn-group">
        <form className="" onSubmit={onSubmit}>
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className={`input${str} goalInput hide`}
          />
        </form>
        <button className="pen">
          <FaPen onClick={focusInput} />
        </button>
        <button
          className="close"
          onClick={() => dispatch(deleteGoal(goal._id))}
        >
          X
        </button>
      </div>
    </div>
  )
}

export default GoalItem
