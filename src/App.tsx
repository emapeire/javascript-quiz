import { Container, Stack, Typography } from '@mui/material'
import './App.css'
import { JavaScriptLogo } from './image/javascript-logo'
import Start from './components/Start'
import { useQuestionStore } from './store/question'
import Game from './components/Game'

export default function App() {
  const questions = useQuestionStore((state) => state.questions)

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
        {questions.length > 0 && <Game />}
      </Container>
    </main>
  )
}
