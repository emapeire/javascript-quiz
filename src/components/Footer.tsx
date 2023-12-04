import { Button } from '@mui/material'
import { useQuestionsData } from '../hooks/useQuestionsData'
import { useQuestionsStore } from '../store/questions'

export default function Footer() {
  const { correct, incorrect, unanswered } = useQuestionsData()
  const reset = useQuestionsStore((state) => state.reset)

  return (
    <footer style={{ marginTop: '2rem' }}>
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
        <p>
          ❓Unanswered:{' '}
          <strong
            style={{
              border: '1px solid gray',
              paddingInline: 6,
              paddingBlock: 2,
              borderRadius: 4
            }}
          >{`${unanswered}`}</strong>
        </p>
      </div>
      <div style={{ marginTop: '2rem' }}>
        <Button onClick={() => reset()}>Reset the game</Button>
      </div>
    </footer>
  )
}
