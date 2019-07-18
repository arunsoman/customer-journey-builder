import AbsractTemplate from './AbstracrtTemplate'
import go from '../../../../node_modules/gojs/release/go-debug'
import m from '../model/WelcomeModel'
 const $ = go.GraphObject.make
class Welcome extends AbsractTemplate {
  model

  constructor() {
    super()
    this.model = new m()
  }
  set model(v) {
    this.model = v
  }
  get dataModel() {
    return this.model
  }



  addTemplate( map) {
    const toolTip = this.toolTip(this.model.help, 'Gray')
    const template =
      $(go.Node, 'Vertical',{background : this.bg},
      
        $(go.Panel, 'Horizontal',
          this.base(),
          this.overflowLabel('prompt', 'gray', 3, 180, "prompt"), 
          { toolTip: toolTip }
        ),
        this.createPort("", this.bottom),
      )
    map.add(this.model.category, template)
  }
}

export default Welcome
