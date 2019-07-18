import AbsractTemplate from './AbstracrtTemplate'
import go from 'gojs/release/go-debug'
import m from '../model/QuestionModel'
const $ = go.GraphObject.make
class Question extends AbsractTemplate {
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
      $(go.Node, 'Vertical', { background: this.bg },
        this.createPort("", this.top),
        $(go.Panel, 'Horizontal',
          this.base(),
          this.overflowLabel('prompt', 'gray', 3, 180), { toolTip: toolTip }
        ),
        $(go.TextBlock, {  margin: 1, alignment: go.Spot.Left }, new go.Binding("text", "prompt").makeTwoWay()),
        $(go.Panel, go.Panel.Table,
          $(go.Panel, "Spot", { row: 2, column: 0, margin: 2, alignment: go.Spot.Left },
            this.createButtonPort("accept")
          ),
          $(go.Panel, "Spot", { row: 2, column: 1, margin: 2, alignment: go.Spot.Right },
            this.createButtonPort("reject")
          )
        )
      )
    map.add(this.model.category, template)
  }
}

export default Question
