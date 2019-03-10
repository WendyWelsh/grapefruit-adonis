'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AssigmentsSchema extends Schema {
  up () {
    this.create('assigments', (table) => {
      table.increments()
      table.integer('client_id').unsigned().references('id').inTable('users')
      table.integer('coach_id').unsigned().references('id').inTable('users')
      table.timestamps()
    })
  }

  down () {
    this.drop('assigments')
  }
}

module.exports = AssigmentsSchema
