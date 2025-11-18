/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AuthController from '../app/Controllers/Http/AuthController.js'
import TaskController from '../app/Controllers/Http/TaskController.js'

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
