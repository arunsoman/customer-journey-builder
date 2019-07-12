import BaseModel from './BaseModel'
const uuidv4 = require('uuid/v4')

class DecisionIntentModel extends BaseModel {
  constructor () {
    super('DecisionIntent')
    this.displayType = 'chip'
    this.prompt = "Ask yes no type question"
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

export default DecisionIntentModel
