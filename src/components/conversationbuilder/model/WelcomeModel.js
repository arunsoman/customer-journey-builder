import BaseModel from './BaseModel'
  
class WelcomeModel extends BaseModel {
  constructor () {
    super('Welcome')
    this.displayType = 'chip'
    this.prompt = "Hi I am your digital assistant"
    this.tooltip="Welcome"
    this.category="Welcome"
    this.name="Welcome"
    this.icon="AddAudience"
    this.figure="circle"
    this.color="deepskyblue" 
  }


}

export default WelcomeModel
