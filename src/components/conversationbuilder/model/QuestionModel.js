import BaseModel from './BaseModel'
const uuidv4 = require('uuid/v4')

class QuestionModel extends BaseModel {
  constructor () {
    super('Question')

    this.multiValued = false
    this.responseType = false
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

export default QuestionModel
