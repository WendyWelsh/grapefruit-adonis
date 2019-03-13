'use strict'

class AssignmentController {

    async getOneClient({ request, response, auth, params }) {
        try {
            const user = await auth.getUser()
            try {
                console.log(params.id)
                const client = await user.coachAssignment().where('client_id', params.id).with('client').fetch()
                return response.json({
                    status: "success!",
                     data: client       
                });
            } catch (error) {
                console.log(error)
                response.status(400).json({
                    status: "error!",
                    data: "cannot get client for coach"
                })
            }

        }catch (error) {
            console.log(error)
            response.status(400).json({
                status: "error!",
                data: "you're not logged in!"
            })
        }
    }

    async getClients({ auth, response }) {
        try {
            const user = await auth.getUser()
            try {
                const clients = await user.coachAssignment().with('client').fetch()
                return response.json({
                    status: "success!",
                     data: clients        
                });
            } catch (error) {
                console.log(error)
                response.status(400).json({
                    status: "error!",
                    data: "cannot get client for coach"
                })
            }
        } catch (error) {
            response.status(400).json({
                status: "error!",
                data: "you're not logged in."
            })
        }

    }
}
module.exports = AssignmentController
