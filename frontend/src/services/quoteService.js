import api from './api'

const fallback = {
  quote: 'Mulailah dari yang kecil, konsisten, dan biarkan progres berbicara.',
  author: 'SmarTask',
}

export async function fetchRandomQuote() {
  try {
    const { data } = await api.get('/quotes/random')
    return data.quote ? data : { quote: data.content || data.quote, author: data.author }
  } catch (error) {
    return fallback
  }
}
