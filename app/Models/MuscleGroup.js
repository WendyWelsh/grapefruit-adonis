'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class MuscleGroup extends Model {

    workout () {
        return this.belongsToMany('App/Models/Workout')
      }

}

module.exports = MuscleGroup
