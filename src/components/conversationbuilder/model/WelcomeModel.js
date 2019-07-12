import BaseModel from './BaseModel'
const uuidv4 = require('uuid/v4')

class WelcomeModel extends BaseModel {
  constructor () {
    super('Welcome')
    this.displayType = 'chip'
    this.prompt = "Hi I am your digital assistant"
  }

  get category () {
    return this.intentName
  }
  get name () {
    return this.intentName
  }

  get help () {
    return 'Check me out here.... todo point to a wiki'
  }
        
}

export default WelcomeModel
