import { Button } from '@mui/material'
import { useQuestionStore } from '../store/question'
import { LIMIT_QUESTION } from '../constants'

export default function Start() {
  const fetchQuestions = useQuestionStore((state) => state.fetchQuestions)

  const handleClick = () => {
    fetchQuestions(LIMIT_QUESTION)
  }

  return (
    <Button onClick={handleClick} variant='contained'>
      Start!
    </Button>
  )
}
