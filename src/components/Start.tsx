import { Button } from '@mui/material'
import { useQuestionsStore } from '../store/questions'
import { LIMIT_QUESTION } from '../constants'

export default function Start() {
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions)

  const handleClick = () => {
    fetchQuestions(LIMIT_QUESTION)
  }

  return (
    <Button onClick={handleClick} variant='contained' sx={{ marginTop: 4 }}>
      Start!
    </Button>
  )
}
