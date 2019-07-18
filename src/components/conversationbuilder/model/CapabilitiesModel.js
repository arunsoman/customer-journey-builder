import BaseModel from './BaseModel'

class CapabilitiesModel extends BaseModel {
  constructor () {
    super('Capabilities')
    this.displayType = 'chip'
    this.prompt = "I can help you with the following, describe capabilites as comma seperated text"
    this.capabiltiesArray= [ 
      { 'portColor': '#7d4bd6', 'portId': 'Change plan' }, 
      { 'portColor': '#cc585c', 'portId': 'Change travel date' }, 
      { 'portColor': '#b1273a', 'portId': 'setup a callback' } ]
      this.tooltip="Capabilites"
      this.category="Capabilites"
      this.name="Capabilites"
      this.icon="SendEmail"
      this.figure="RoundedRectangle"
      this.color="lightskyblue"  
  }

}

export default CapabilitiesModel
