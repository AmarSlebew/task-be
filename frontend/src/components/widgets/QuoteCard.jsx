import { useEffect, useState } from 'react'
import Card from '../common/Card'
import Button from '../common/Button'
import { fetchRandomQuote } from '../../services/quoteService'

const fallbackQuote = {
  quote: 'Mulailah dari yang kecil, konsisten, dan biarkan progres berbicara.',
  author: 'SmarTask',
}

export default function QuoteCard() {
  const [quote, setQuote] = useState(fallbackQuote)
  const [status, setStatus] = useState('')

  const loadQuote = async () => {
    try {
      const data = await fetchRandomQuote()
      setQuote(data)
      setStatus('')
    } catch (error) {
      setQuote(fallbackQuote)
      setStatus(error.message)
    }
  }

  useEffect(() => {
    loadQuote()
  }, [])

  return (
    <Card className="p-5 space-y-3">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-mist/60">Motivation Quote</p>
          <h3 className="text-lg font-semibold text-white">Inspirasi Hari Ini</h3>
        </div>
        <Button onClick={loadQuote} className="px-3 py-2">
          Refresh
        </Button>
      </div>
      <div className="rounded-2xl border border-white/10 bg-white/5 p-4 shadow-inner">
        <p className="text-lg leading-relaxed text-white">“{quote.quote}”</p>
        <p className="text-sm text-mist/70">— {quote.author || 'Anonim'}</p>
      </div>
      {status && <p className="text-xs text-amber/80">{status}</p>}
    </Card>
  )
}
