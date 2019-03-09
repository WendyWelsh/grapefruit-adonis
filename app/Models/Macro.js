'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Macro extends Model {

    user () {
        return this.belongsToMany('App/Models/User')
      }

}

module.exports = Macro
