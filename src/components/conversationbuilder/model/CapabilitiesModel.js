import BaseModel from './BaseModel'
const uuidv4 = require('uuid/v4')

class CapabilitiesModel extends BaseModel {
  constructor () {
    super('Capabilities')
    this.displayType = 'chip'
    this.prompt = "I can help you with the following, describe capabilites as comma seperated text"
    this.capabiltiesArray= [ 
      { 'portColor': '#7d4bd6', 'portId': 'Change plan' }, 
      { 'portColor': '#cc585c', 'portId': 'Change travel date' }, 
      { 'portColor': '#b1273a', 'portId': 'setup a callback' } ]
        
  }

  get category () {
    return this.intentName
  }
  get name () {
    return this.intentName
  }

  get help () {
    return 'Describes system capabilities'
  }
}

export default CapabilitiesModel
