'use strict'
const User = use('App/Models/User')

class UserController {
    
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

    async deleteUser({ request, response, auth }) {
        try {
            let deleteUserById = await auth.getUser()
           
            await deleteUserById.delete()
            response.json({
                Message: "Time for Mickey D's"
            })
        } catch (e) {
            response.send('Invalid token' + e)
        }
    }

}

module.exports = UserController
