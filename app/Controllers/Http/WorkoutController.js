'use strict'
const User = use("App/Models/User")
const Workout = use("App/Models/Workout")

class WorkoutController {

    async storeWorkout({ request, auth, response }) {
        let user = await auth.getUser()
        const { clientId, date, exercises } = request.post();
        const workout = await Workout.create({
          client_id: clientId,
          coach_id: user.id,
          date
        });
       
       
        const mappedExercises = exercises.map(exercise=>{
          return{
            repetitions: exercise.reps,
            rpe: exercise.rpe,
            sets: exercise.sets,
            muscle_group: exercise.muscleGroup,
            name: exercise.exerciseName,

          }
        })
        workout
        .exercises()
        .createMany(mappedExercises)
        response.json({
          message: "${user.username} is going to get ripped!"
        });
        return request.all()
    }

  //   .posts()
  // .createMany([
  //   { title: 'Adonis 101' },
  //   { title: 'Lucid 101' }
  // ])
  

     async fetchWorkout({auth}) {
      let user = await auth.getUser()
      const workouts = await Workout.query().where('client_id', user.id).with('exercises').fetch()
      return workouts
    }

}

module.exports = WorkoutController
