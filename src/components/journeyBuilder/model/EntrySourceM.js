import BaseModel from "./BaseModel"
import iconMap from "../gojs/iconLoader"

export  class Audience extends BaseModel {
  constructor(){
      super("Audience", BaseModel.categories.entry, 'Some tool tip', iconMap.Audience, "Diamond", "lightgreen")
    
  }
  get dataNode() {
    return this
  }
}

export  class Events extends BaseModel{
  constructor(){
      super("Events", BaseModel.categories.entry, 'Some tool tip', iconMap.Audience, "Diamond", "lightgreen")
  }
  get dataNode() {
    return this
  }
}


