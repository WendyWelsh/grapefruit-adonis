'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ExercisesSchema extends Schema {
  up () {
    this.table('exercises', (table) => {
      table.string("name")
      // alter table
    })
  }

  down () {
    this.table('exercises', (table) => {
      table.drop("name")
      // reverse alternations
    })
  }
}

module.exports = ExercisesSchema
