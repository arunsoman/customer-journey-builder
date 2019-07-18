const uuidv4 = require('uuid/v4')

class BaseModel {
    key = uuidv4()
    prompt
    rePrompt
    validation
    onSuccess
    onFailure
    
}

export default BaseModel
