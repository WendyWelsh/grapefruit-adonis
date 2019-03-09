'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MuscleGroupSchema extends Schema {
  up () {
    this.create('muscle_groups', (table) => {
      table.increments()
      table.integer('workout_id').unsigned()
      table.foreign('workout_id').references('workouts.id')
      table.integer('sets')
      table.integer('repititions')
      table.integer('rpe')
      table.string('muscle_group')
      table.timestamps()
    })
  }

  down () {
    this.drop('muscle_groups')
  }
}

module.exports = MuscleGroupSchema
