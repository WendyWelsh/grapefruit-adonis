'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddDailyTotalCaloriesSchema extends Schema {
  up () {
    this.table('macros', (table) => {
        table.integer("total_daily_calories").unsigned().after('fats')
      // alter table
    })
  }

  down () {
    this.table('macros', (table) => {
      table.dropColumn("total_daily_calories")
      // reverse alternations
    })
  }
}

module.exports = AddDailyTotalCaloriesSchema
