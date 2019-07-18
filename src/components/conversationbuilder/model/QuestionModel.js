import BaseModel from './BaseModel'

class QuestionModel extends BaseModel {
  constructor () {
    super('Question')
    this.prompt = "Ask the question"
    this.reprompt = "Please provide a valid phone number"
    this.tooltip="Question"
    this.category="Question"
    this.name="Question"
    this.icon="RandomSplit"
    this.figure="diamond"
    this.color="aquamarine"
    this.choices=""
  }

}

export default QuestionModel
