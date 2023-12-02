import { Card, IconButton, Stack, Typography } from '@mui/material'
import { useQuestionStore } from '../store/question'
import { type Question } from '../types'

const Question = ({ info }: { info: Question }) => {
  return (
    <Card variant='outlined'>
      <Typography variant='h5' component='h2'>
        {info.question}
      </Typography>
    </Card>
  )
}

export default function Game() {
  const questions = useQuestionStore((state) => state.questions)
  const currentQuestion = useQuestionStore((state) => state.currentQuestion)

  const questionInfo = questions[currentQuestion]

  return <Question info={questionInfo} />
}
