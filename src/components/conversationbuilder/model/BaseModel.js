const uuidv4 = require('uuid/v4')

class BaseModel {
    key = uuidv4()
    intentName
    prompt
    rePrompt
    validation
    onSuccess
    onFailure

    constructor (name) {
      this.intentName = name
    }
}

export default BaseModel
