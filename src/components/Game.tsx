import {
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography
} from '@mui/material'
import { useQuestionStore } from '../store/question'
import { type Question } from '../types'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const Question = ({ info }: { info: Question }) => {
  const selectAnswer = useQuestionStore((state) => state.selectedAnswer)

  const handleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }

  const getBackgroundColor = (index: number) => {
    const { userSelectedAnswer, correctAnswer } = info

    if (userSelectedAnswer === null) return 'transparent'
    if (index !== correctAnswer && index !== userSelectedAnswer)
      return 'transparent'
    if (index === correctAnswer) return '#4caf50'
    if (index === userSelectedAnswer) return '#f44336'

    return 'transparent'
  }

  return (
    <Card
      variant='outlined'
      sx={{ textAlign: 'left', bgcolor: '#222', p: 2, marginTop: 4 }}
    >
      <Typography variant='h5' component='h2'>
        {info.question}
      </Typography>
      <SyntaxHighlighter
        language='javascript'
        style={gradientDark}
        customStyle={{
          borderRadius: '4px',
          paddingInline: '1rem',
          paddingBlock: '2rem'
        }}
      >
        {info.code}
      </SyntaxHighlighter>
      <List sx={{ bgcolor: '#333' }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer !== null}
              onClick={handleClick(index)}
              sx={{ bgcolor: getBackgroundColor(index) }}
            >
              <ListItemText primary={answer} sx={{ textAlign: 'center' }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}

export default function Game() {
  const questions = useQuestionStore((state) => state.questions)
  const currentQuestion = useQuestionStore((state) => state.currentQuestion)

  const questionInfo = questions[currentQuestion]

  return <Question info={questionInfo} />
}
