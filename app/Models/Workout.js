'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Workout extends Model {

    user () {
        return this.belongsToMany('App/Models/User')
      }

    exercise () {
        return this.hasMany('App/Models/exercise')
    }

}

module.exports = Workout
