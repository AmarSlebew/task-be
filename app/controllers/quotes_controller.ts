import QuoteService from '#services/quotes_service'
import type { HttpContext } from '@adonisjs/core/http'

export default class QuotesController {
  public async random({ response }: HttpContext) {
    try {
      const quoteService = new QuoteService()
      const data = await quoteService.getRandomQuote()

      return response.ok({
        success: true,
        ...data, //
      })
    } catch (error) {
      return response.status(500).send({
        success: false,
        message: 'Gagal mengambil quote',
      })
    }
  }
}
