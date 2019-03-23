'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class WorkoutSchema extends Schema {
  up () {
    this.create('workouts', (table) => {
      table.increments()
      table.integer('client_id').unsigned()//.references('id').inTable('users')
      table.integer('coach_id').unsigned()//.references('id').inTable('users')
      table.date('date')
      table.timestamps()
    })
  }

  down () {
    this.drop('workouts')
  }
}

module.exports = WorkoutSchema
