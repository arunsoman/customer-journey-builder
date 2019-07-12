import BaseModel from './BaseModel'
const uuidv4 = require('uuid/v4')

class RecomenderModel extends BaseModel {
  constructor () {
    super('Recommeder')
    this.displayType = 'chip'
  }

  get category () {
    return this.intentName
  }
  get name () {
    return this.intentName
  }

  get help () {
    return 'Allows user to make a decision'
  }
}

export default RecomenderModel
