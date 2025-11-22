import AuthController from '#controllers/auth_controller'
import QuotesController from '#controllers/quotes_controller'
import TaskController from '#controllers/tasks_controller'
import WeathersController from '#controllers/weathers_controller'
import router from '@adonisjs/core/services/router'

// Test route
router.get('/', () => {
  return { message: 'Server aktif 🚀' }
})

// Auth
router.post('/register', (ctx) => new AuthController().register(ctx))
router.post('/login', (ctx) => new AuthController().login(ctx))
router.get('/profile', (ctx) => new AuthController().profile(ctx))

// Tasks
router.post('/tasks', (ctx) => new TaskController().store(ctx))
router.get('/tasks', (ctx) => new TaskController().index(ctx))
router.put('/tasks/:id', (ctx) => new TaskController().update(ctx))
router.delete('/tasks/:id', (ctx) => new TaskController().destroy(ctx))

// Weather
router.get('/weather/:city', (ctx) => new WeathersController().getWeather(ctx))

// Quotes
router.get('/quotes/random', (ctx) => new QuotesController().random(ctx))

export default router
