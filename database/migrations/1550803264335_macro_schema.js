'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MacroSchema extends Schema {
  up () {
    this.create('macros', (table) => {
      table.increments()
      table.integer('coach_id').unsigned()
      table.foreign('coach_id')//.references('users.id')
      table.integer('client_id').unsigned()
      table.foreign('client_id')//.references('users.id')
      table.integer('protein')
      table.integer('carbohydrates')
      table.integer('fats')
      table.date('date')
      table.timestamps()
    })
  }

  down () {
    this.drop('macros')
  }
}

module.exports = MacroSchema
