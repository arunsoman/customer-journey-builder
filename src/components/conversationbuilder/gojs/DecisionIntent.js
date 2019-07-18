import AbsractTemplate from './AbstracrtTemplate'
import go from 'gojs/release/go-debug'
import m from '../model/DecisionIntentModel'
const $ = go.GraphObject.make
class DecisionIntent extends AbsractTemplate {
    model

    constructor () {
      super()
      this.model = new m()
    }
    set model (v) {
      this.model = v
    }
    get dataModel () {
      return this.model
    }



    addTemplate (map) {
      const toolTip = this.toolTip(this.model.help, 'Gray')
      var horizontal = true
      const template = 
        $(go.Node, 'Vertical',
          { background: this.bg },
          this.createPort("", this.top),
          $(go.Panel, 'Horizontal',
          this.base(),
            this.overflowLabel( 'prompt', 'gray', 3, 180)
          ),
          $(go.Panel, 'Horizontal',
            this.createButtonPort("No"),
            this.createButtonPort("Yes")
          ),
          
        )

        map.add(this.model.category, template)
    }
}

export default DecisionIntent
