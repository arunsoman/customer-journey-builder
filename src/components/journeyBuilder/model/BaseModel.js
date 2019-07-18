const uuidv4 = require('uuid/v4')

export default class BaseModel {
    key = uuidv4()
    
    constructor (name, category, toolTip,uri,) {
      this.name = name
      this.category = category
      this.describe = ""
      this.toolTip = toolTip
      this.icon = uri
    }
}