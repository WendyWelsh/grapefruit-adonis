'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddRoleIdToUsersSchema extends Schema {
  up () {
    this.table('users', (table) => {
      table.integer("role_id").unsigned().after('password')
      table.foreign("role_id")//.references('id').inTable("roles")
    })
  }

  down () {
    this.table('users', (table) => {
      table.dropForeign('role_id')
      table.dropColumn('role_id')
    })
  }
}

module.exports = AddRoleIdToUsersSchema
