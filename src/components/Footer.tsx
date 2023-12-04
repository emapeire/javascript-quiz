import { Button } from '@mui/material'
import { useQuestionsData } from '../hooks/useQuestionsData'
import { useQuestionsStore } from '../store/questions'

export default function Footer() {
  const { correct, incorrect, unanswered } = useQuestionsData()
  const reset = useQuestionsStore((state) => state.reset)

  return (
    <footer style={{ marginTop: '2rem' }}>
      <strong>{`✅ ${correct} corrects - ❌ ${incorrect} incorrects - ❓ ${unanswered} unanswered`}</strong>
      <div style={{ marginTop: '2rem' }}>
        <Button onClick={() => reset()}>Reset the game</Button>
      </div>
    </footer>
  )
}
