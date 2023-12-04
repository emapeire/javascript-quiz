import { Button } from '@mui/material'
import { useQuestionsData } from '../hooks/useQuestionsData'
import { useQuestionsStore } from '../store/questions'

export default function Results() {
  const { correct, incorrect } = useQuestionsData()
  const reset = useQuestionsStore((state) => state.reset)

  return (
    <div style={{ marginTop: '16px' }}>
      <h1>Your score: </h1>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 32 }}>
        <p>
          ✅ Corrects:{' '}
          <strong
            style={{
              border: '1px solid gray',
              paddingInline: 6,
              paddingBlock: 2,
              borderRadius: 4
            }}
          >{`${correct}`}</strong>
        </p>
        <p>
          ❌ Incorrects:{' '}
          <strong
            style={{
              border: '1px solid gray',
              paddingInline: 6,
              paddingBlock: 2,
              borderRadius: 4
            }}
          >{`${incorrect}`}</strong>
        </p>
      </div>
      <div style={{ marginTop: '16px' }}>
        <Button onClick={() => reset()}>Try again!</Button>
      </div>
    </div>
  )
}
