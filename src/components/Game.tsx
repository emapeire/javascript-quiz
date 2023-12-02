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
import { useQuestionStore } from '../store/question'
import { type Question } from '../types'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'

const Question = ({ info }: { info: Question }) => {
  return (
    <Card variant='outlined' sx={{ textAlign: 'left', bgcolor: '#222', p: 2 }}>
      <Typography variant='h5' component='h2'>
        {info.question}
      </Typography>
      <SyntaxHighlighter
        language='javascript'
        style={gradientDark}
        customStyle={{
          borderRadius: '8px',
          paddingInline: '1rem',
          paddingBlock: '2rem'
        }}
      >
        {info.code}
      </SyntaxHighlighter>
      <List sx={{ bgcolor: '#333', borderRadius: '8px' }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton sx={{ borderRadius: '8px' }}>
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
