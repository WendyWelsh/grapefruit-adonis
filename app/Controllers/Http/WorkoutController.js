'use strict'
const User = use("App/Models/User")
const Workout = use("App/Models/Workout")

class WorkoutController {

    async storeWorkout({ request, auth, response }) {
        let user = await auth.getUser()
        const { clientId, date } = request.post();
        const workout = await Workout.create({
          client_id: clientId,
          coach_id: user.id,
          date
        });
        response.json({
          message: "${user.username} is going to get ripped!"
        });
        return request.all()
    }

     fetchWorkouts() {

    }

}

module.exports = WorkoutController
