import BaseModel from './BaseModel'

class DecisionIntentModel extends BaseModel {
  constructor () {
    super('DecisionIntent')
    this.displayType = 'chip'
    this.prompt = "Ask yes no type question"
    this.tooltip="Decision"
    this.category="Decision"
    this.name="Decision"
    this.icon="EngagementSplit"
    this.figure="diamond"
    this.color="aquamarine"
  }

}

export default DecisionIntentModel
