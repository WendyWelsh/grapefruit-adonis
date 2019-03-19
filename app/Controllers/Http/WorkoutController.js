'use strict'

class WorkoutController {

    async createWorkout({ request, auth, response }) {
        const {  } = request.post();
        const user = await User.create({
          username,
          email,
          password,
          role_id: parseInt(role)
        });
        const token = await auth.generate(user);
        console.log(user);
        response.json({
          message: "${user.username} added to the database",
          data: token,
          role: user.role_id
        });
    }

}

module.exports = WorkoutController
