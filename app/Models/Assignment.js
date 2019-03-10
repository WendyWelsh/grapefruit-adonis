'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Assignment extends Model {
    client() {
        return this.belongsTo('App/Models/User', 'client_id', 'id')

    }
    coach() {
        return this.belongsToMany('App/Models/User')

    }
}


module.exports = Assignment
