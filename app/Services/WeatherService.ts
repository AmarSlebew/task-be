import axios from 'axios'
import Env from '#start/env'

export default class WeatherService {
  async getWeather(city: string) {
    const apiKey = Env.get('OPENWEATHER_API_KEY')

    console.log("API KEY:", apiKey)

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

    const response = await axios.get(url)
    return response.data
  }
}
