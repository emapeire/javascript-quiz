import {
  Card,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography
} from '@mui/material'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import { useQuestionsStore } from '../store/questions'
import { type Question as QuestionType } from '../types'
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import Footer from '../components/Footer'

const getBackgroundColor = (info: QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info
  // if the user has not selected an answer, return transparent
  if (userSelectedAnswer == null) return 'transparent'
  // if the index is not the correct answer and not the user selected answer, return transparent
  if (index !== correctAnswer && index !== userSelectedAnswer)
    return 'transparent'
  // if the index is the correct answer, return green
  if (index === correctAnswer) return 'green'
  // if the index is the user selected answer, return red
  if (index === userSelectedAnswer) return 'red'
  // otherwise, return transparent
  return 'transparent'
}

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer)

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex)
  }

  return (
    <Card
      variant='outlined'
      sx={{
        bgcolor: '#222',
        p: 2,
        textAlign: 'left',
        minWidth: '60vw'
      }}
    >
      <Typography variant='h5'>{info.question}</Typography>

      <SyntaxHighlighter
        language='javascript'
        style={gradientDark}
        customStyle={{ padding: '1rem' }}
      >
        {info.code}
      </SyntaxHighlighter>

      <List sx={{ bgcolor: '#333' }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={info.userSelectedAnswer != null}
              onClick={createHandleClick(index)}
              sx={{
                backgroundColor: getBackgroundColor(info, index)
              }}
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
  const questions = useQuestionsStore((state) => state.questions)
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion)
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion)
  const goPreviousQuestion = useQuestionsStore(
    (state) => state.goPreviousQuestion
  )

  const questionInfo = questions[currentQuestion]

  return (
    <>
      <Stack
        direction='row'
        gap={2}
        alignItems='center'
        justifyContent='center'
        sx={{ margin: '1rem' }}
      >
        <IconButton
          onClick={goPreviousQuestion}
          disabled={currentQuestion === 0}
        >
          <ArrowBackIosNew />
        </IconButton>
        {currentQuestion + 1} / {questions.length}
        <IconButton
          onClick={goNextQuestion}
          disabled={currentQuestion >= questions.length - 1}
        >
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          minHeight: '60vh'
        }}
      >
        <Question info={questionInfo} />
      </div>
      <Footer />
    </>
  )
}
