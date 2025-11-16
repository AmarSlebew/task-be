/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import AuthController from '../app/Controllers/AuthController.js'

// Route test
router.get('/', async () => {
  return { message: 'Server aktif 🚀' }
})

// Route utama
router.post('/register', [AuthController, 'register'])
router.post('/login', [AuthController, 'login'])
router.get('/profile', [AuthController, 'profile'])
