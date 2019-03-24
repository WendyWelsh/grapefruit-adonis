'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExerciseSchema extends Schema {
  up () {
    this.create('exercises', (table) => {
      table.increments()
      table.integer('workout_id').unsigned()
      table.foreign('workout_id')//.references('workouts.id')
      table.integer('sets')
      table.integer('repetitions')
      table.integer('rpe')
      table.string('muscle_group')
      table.timestamps()
    })
  }

  down () {
    this.drop('exercises')
  }
}

module.exports = ExerciseSchema
