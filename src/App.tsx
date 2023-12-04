import { Container, Stack, Typography } from '@mui/material'
import './App.css'
import { JavaScriptLogo } from './image/javascript-logo'
import Start from './components/Start'
import { useQuestionsStore } from './store/questions'
import Game from './components/Game'
import Results from './components/Results'

export default function App() {
  const questions = useQuestionsStore((state) => state.questions)
  const allAnswered = useQuestionsStore((state) => state.allQuestionsAnswered)

  return (
    <main>
      <Container maxWidth='sm'>
        <Stack
          direction='row'
          gap={2}
          alignItems='center'
          justifyContent='center'
        >
          <JavaScriptLogo />
          <Typography variant='h2' component='h1'>
            JavaScript Quiz
          </Typography>
        </Stack>
        {questions.length === 0 && <Start />}
        {questions.length > 0 && !allAnswered() && <Game />}
        {allAnswered() && <Results />}
      </Container>
    </main>
  )
}
