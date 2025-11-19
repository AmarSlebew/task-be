import type { HttpContext } from '@adonisjs/core/http'
import WeatherService from '../../Services/WeatherService.js'

export default class WeatherController {
  async getWeather({ params, response }: HttpContext) {
    try {
      const city = params.city
      const data = await new WeatherService().getWeather(city)

      return response.ok({
        city,
        temperature: data.main.temp,
        weather: data.weather[0].description,
        icon: data.weather[0].icon
      })
    } catch (error) {
      console.error("WEATHER ERROR:", error.response?.data || error)
      return response.badRequest({
        message: "Gagal mengambil data cuaca!",
        error: error.message
      })
    }
  }
}
