import BaseModel from './BaseModel'

class RecomenderModel extends BaseModel {
  constructor () {
    super('Recommeder')
    this.displayType = 'chip'
    this.tooltip= "Recommend"
    this.category= "Recommend"
    this.name= "Recommend"
    this.icon= "SendEmail"
    this.figure= "RoundedRectangle"
    this.color= "lightskyblue"
    this.prompt = "These are my recommendations"
  }

}

export default RecomenderModel
