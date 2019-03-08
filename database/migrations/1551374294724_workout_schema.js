'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WorkoutSchema extends Schema {
  up () {
    this.create('workouts', (table) => {
      table.increments()
      table.integer('coach_id').unsigned()
      table.foreign('coach_id').references('users.id')
      table.integer('client_id').unsigned()
      table.foreign('client_id').references('users.id')
      table.date('date')
      table.timestamps()
    })
  }

  down () {
    this.drop('workouts')
  }
}

module.exports = WorkoutSchema
