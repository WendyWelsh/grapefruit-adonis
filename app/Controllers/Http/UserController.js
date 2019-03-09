'use strict'
const User = use('App/Models/User')

class UserController {

    async getUser({ request, response }) {
        let users = await User.all()
        response.send({
            users: users
        })
    }
    
    async createUser({request, auth, response}) {
        const {username, email, password} = request.post()
        const user = await User.create({username, email, password})
        const token = await auth.generate(user)
        console.log(user)
        response.json({
            message: '${user.username} added to the database', 
            data:token
        })
    }

    async deleteUser({ request, response, params: { id } }) {
        var deleteUserById = await User.find(id)
        await deleteUserById.delete()
        let users = await User.all()
        response.json({
            Message: "Time for Mickey D's!",
            users: users
        })
    }

}

module.exports = UserController
