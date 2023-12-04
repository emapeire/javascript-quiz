import { Button } from '@mui/material'
// import { useQuestionsData } from './hooks/useQuestionsData'
import { useQuestionsStore } from '../store/questions'

export const Results = () => {
  // const { correct, incorrect } = useQuestionsData()
  const reset = useQuestionsStore((state) => state.reset)

  return (
    <div style={{ marginTop: '16px' }}>
      <h1>Your score: </h1>

      {/* <strong>
        <p>✅ {correct} corrects</p>
        <p>❌ {incorrect} incorrects</p>
      </strong> */}

      <div style={{ marginTop: '16px' }}>
        <Button onClick={() => reset()}>Try again!</Button>
      </div>
    </div>
  )
}
