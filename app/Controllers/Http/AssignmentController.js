'use strict'

class AssignmentController {

    async getClients({ auth, response }) {
        try {
            const user = await auth.getUser()
            const clients = await user.coachAssignment().fetch()
            return response.json({
                status: "success!",
                data: clients        
            });
        } catch (error) {
            response.status(400).json({
                status: "error!",
                data: "you're not logged in."
            })
        }

    }
}
module.exports = AssignmentController
