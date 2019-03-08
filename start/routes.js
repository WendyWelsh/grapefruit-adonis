'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.0/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.post('/create', "UserController.createUser")

//Chatkit
Route.post('chatCreateUser', 'MessageController.createUser')
Route.get('chatGetUsers', 'MessageController.getUsers')
Route.post('chatGetUser', 'MessageController.getUser')
Route.post('chatDeleteUser', 'MessageController.deleteUser')

Route.post('chatCreateRoom', 'MessageController.createRoom')
Route.post('chatGetRoom', 'MessageController.getRoom')
Route.post('chatSendMessage', 'MessageController.sendMessage')
Route.post('chatgetMessages', 'MessageController.getMessages')