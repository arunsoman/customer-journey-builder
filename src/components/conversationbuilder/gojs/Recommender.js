import AbsractTemplate from './AbstracrtTemplate'
import go from 'gojs/release/go-debug'
import m from '../model/RecomenderModel'
const $ = go.GraphObject.make
class Recommender extends AbsractTemplate {
  model

  constructor() {
    super()
    this.model = new m()
  }


  addTemplate(map) {
    var horizontal = true
    const toolTip = this.toolTip(this.model.help, 'Gray')
    const template =
      $(go.Node, 'Vertical', { background: this.bg , doubleClick:()=>{this.vueContext.handleDoubleClick(this.model)}},
        this.createPort("", this.top),
        $(go.Panel, 'Horizontal',
          this.base(),
          this.overflowLabel('prompt', 'gray', 3, 180), { toolTip: toolTip }
        ),
        $(go.Panel, 'Horizontal',
          this.createButtonPort("Accept"),
          this.createButtonPort("More options"),
          this.createButtonPort("Reject")
        )
      )
    map.add(this.model.category, template)
  }
}

export default Recommender
