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

  paletteTemplate() {
    const toolTip = this.toolTip(this.model.help, 'Gray')
    return [
      this.model.name,
      $(go.Node, go.Panel.Spot,
        $(go.Shape, 'RoundedRectangle', this.baseProp('lightgreen')),
        this.icon(''),
        this.label(this.model.name, 'gray'), { toolTip: toolTip }
      )
    ]
  }

  canvasTemplate() {
    const toolTip = this.toolTip(this.model.help, 'Gray')
    return [
      this.model.name,
      $(go.Node, 'Vertical',
        { background: '#44CCFF' },
        $(go.Panel, 'Horizontal',
          $(go.Shape, 'Diamond', this.baseProp('lightgreen'), {
            minSize: new go.Size(40, 40),
            maxSize: new go.Size(40, 40),
            alignment: new go.Spot(0.5, 0.5),
            fill: "lightgreen", stroke: null,
            // set the port properties:
            portId: "welcomeInPort", fromLinkable: true, toLinkable: false,
          }),
          this.overflowLabel('prompt', 'gray', 3, 180)
        )
      )
      ]
  }
}

export default Welcome
