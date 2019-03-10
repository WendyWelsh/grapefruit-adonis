'use strict'

class AssignmentController {

    async getClients({ auth, response }) {
        try {
            const user = await auth.getUser()
            try {
                const clients = await user.coachAssignment().fetch()
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
