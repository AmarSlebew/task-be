import axios from 'axios'

export default class QuoteService {
  public async getRandomQuote() {
    const { data } = await axios.get('https://quotes.liupurnomo.com/api/quotes/random')

    return {
      quote: data.data.text,
      author: data.data.author,
    }
  }
}
