import AbsractTemplate from './AbstracrtTemplate'
import go from 'gojs/release/go-debug'
import m from '../model/QuestionModel'
const $ = go.GraphObject.make
class Question extends AbsractTemplate {
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

    paletteTemplate () {
      const name = this.model.name
      const toolTip = this.toolTip(this.model.help, 'Gray')
      return [
        name,
        $(go.Node, go.Panel.Spot,
          $(go.Shape, 'Circle', this.baseProp('lightgreen')),
          this.icon(''),
          this.label(this.model.name, 'gray'), { toolTip: toolTip }
        )
      ]
    }

    canvasTemplate () {
      const name = this.model.name
      const toolTip = this.toolTip(this.model.help, 'Gray')
      return [
        name,
        $(go.Node, go.Panel.Spot,
          $(go.Shape, 'Circle', this.baseProp('lightgreen')),
          this.makePort('T', go.Spot.Top, go.Spot.TopSide, false, true),
          this.makePort('R', go.Spot.Right, go.Spot.RightSide, true, false),
          this.makePort('L', go.Spot.Left, go.Spot.LeftSide, true, false),

          $(go.Panel, 'Horizontal',
            { alignment: new go.Spot(1, 0.5, 10, 0) },
            $(go.Shape, // the "A" port
              { width: 6, height: 6, portId: 'Accept', toSpot: go.Spot.Left }),
            $(go.TextBlock, 'Accept')
          ),
          $(go.Panel, 'Horizontal',
            { alignment: new go.Spot(0.0, 0.5, -10, 0) },
            $(go.TextBlock, 'Reject'),
            $(go.Shape, // the "A" port
              { width: 6, height: 6, portId: 'Reject', toSpot: go.Spot.Left })

          ),
          this.icon(''),
          this.label(this.model.name, 'gray'), { toolTip: toolTip }
        )
      ]
    }
}

export default Question
