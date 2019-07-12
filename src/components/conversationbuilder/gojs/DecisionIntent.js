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

    paletteTemplate () {
      const name = this.model.name
      const toolTip = this.toolTip(this.model.help, 'Gray')
      return [
        name,
        $(go.Node, go.Panel.Spot,
          $(go.Shape, 'Diamond', this.baseProp('lightgreen')),
          this.icon(''),
          this.label(this.model.name, 'gray'), { toolTip: toolTip }
        )
      ]
    }

    canvasTemplate () {
      const toolTip = this.toolTip(this.model.help, 'Gray')
      var horizontal = true
      const name = this.model.name
      return [
        name,

        $(go.Node, 'Vertical',
          { background: '#44CCFF' },
          $(go.Panel, 'Horizontal',
            $(go.Shape, 'Diamond', this.baseProp('lightgreen'),{
                minSize: new go.Size(40, 40),
                maxSize: new go.Size(40, 40),
                alignment: new go.Spot(0.5, 0.5),
                fill: "lightgreen", stroke: null,
                // set the port properties:
                portId: "decisionIntentInPort", fromLinkable: false, toLinkable: true, 
            }),
            this.overflowLabel( 'prompt', 'gray', 3, 180)
          ),
          $(go.Panel, 'Horizontal',
            $(go.Panel, 'Spot',
              { fromLinkable: true, fromSpot: go.Spot.Bottom},
              $(go.Shape,
                {
                  margin: 5,
                  fill: 'gray', // changed to a color in the mouseEnter event handler
                  strokeWidth: 0, // no stroke
                  width: horizontal ? NaN : 10, // if not stretching horizontally, just 8 wide
                  height: !horizontal ? NaN : 16, // if not stretching vertically, just 8 tall
                  alignment: go.Spot.Top, // align the port on the main Shape
                  stretch: (horizontal ? go.GraphObject.Horizontal : go.GraphObject.Vertical),
                  portId: 'No', // declare this object to be a "port"
                  fromSpot: go.Spot.Bottom, // declare where links may connect at this port
                  fromLinkable: true, // declare whether the user may draw links from here
                  toSpot: go.Spot.Top, // declare where links may connect at this port
                  toLinkable: false, // declare whether the user may draw links to here
                  cursor: 'pointer', // show a different cursor to indicate potential link point
                  mouseEnter: function (e, port) { // the PORT argument will be this Shape
                    if (!e.diagram.isReadOnly) port.fill = 'rgba(255,0,255,0.5)'
                  },
                  mouseLeave: function (e, port) {
                    port.fill = 'gray'
                  }
                }),
              $(go.TextBlock, 'No')
            ),
            $(go.Panel, 'Spot',
              $(go.Shape,
                { margin: 5,
                  fill: 'gray', // changed to a color in the mouseEnter event handler
                  strokeWidth: 0, // no stroke
                  width: horizontal ? NaN : 10, // if not stretching horizontally, just 8 wide
                  height: !horizontal ? NaN : 16, // if not stretching vertically, just 8 tall
                  alignment: go.Spot.Top, // align the port on the main Shape
                  stretch: (horizontal ? go.GraphObject.Horizontal : go.GraphObject.Vertical),
                  portId: 'Yes', // declare this object to be a "port"
                  fromSpot: go.Spot.Bottom, // declare where links may connect at this port
                  fromLinkable: true, // declare whether the user may draw links from here
                  toSpot: go.Spot.Top, // declare where links may connect at this port
                  toLinkable: false, // declare whether the user may draw links to here
                  cursor: 'pointer', // show a different cursor to indicate potential link point
                  fromLinkable: true, 
                  mouseEnter: function (e, port) { // the PORT argument will be this Shape
                    if (!e.diagram.isReadOnly) port.fill = 'rgba(255,0,255,0.5)'
                  },
                  mouseLeave: function (e, port) {
                    port.fill = 'gray'
                  }
                }),
              $(go.TextBlock, 'Yes')

            )
          )
        )

      ]
    }
}

export default DecisionIntent
