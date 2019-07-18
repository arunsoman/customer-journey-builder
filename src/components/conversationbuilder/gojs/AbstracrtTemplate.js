import go from '../../../../node_modules/gojs/release/go-debug'
import iconMap from "./iconLoader"
const $ = go.GraphObject.make

class AbsractTemplate {
  vueContext

  bg = "lightgray"
  portPops = {
    fill: "transparent",
    strokeWidth: 0, // no stroke
    height: 4,
    cursor: 'pointer',
    stretch: go.GraphObject.Horizontal
  }
  bottom = {
    alignment: go.Spot.Bottom,
    fromLinkable: true, //Gets or sets whether the user may draw Links from this port
    toLinkable: false, //Gets or sets whether the user may draw Links to this port.
    fromSpot: go.Spot.Bottom,
  }
  top = {
    alignment: go.Spot.Top,
    fromLinkable: false, //Gets or sets whether the user may draw Links from this port
    toLinkable: true, //Gets or sets whether the user may draw Links to this port.
    toSpot: go.Spot.Top,
  }

  static font = 'bold 12px sans-serif';

  set vueContext(v){
    this.vueContext = v
  }

  icon() {
    return $(go.Picture, {
      alignment: new go.Spot(0.5, 0.5),
      desiredSize: new go.Size(30, 30),
    }, new go.Binding("source", "icon", (k) => {
      var s = iconMap[k]
      if (!s)
        console.log("Error: No icon foud for " + k)
      return s
    }))
  }

  createPort(portId, loc) {
    const props = { ...this.portPops, ...loc }
    props.mouseEnter = (e, port) => { // the PORT argument will be this Shape
      if (!e.diagram.isReadOnly) port.fill = 'rgba(255,0,255,0.5)'
    },
      props.mouseLeave = (e, port) => {
        port.fill = "transparent"
      }
    props.portId = portId
    return $(go.Shape, props)
  }

  createButtonPort(name) {
    return $(go.Panel, 'Spot',
      $(go.Shape,
        {
          margin: 1,
          fill: 'gray',
          strokeWidth: 0,
          height: 16,
          stretch: go.GraphObject.Vertical,
          portId: name,
          fromSpot: go.Spot.Bottom, fromLinkable: true, fromMaxLinks: 1,
          cursor: 'pointer',
          mouseEnter: function (e, port) { 
            if (!e.diagram.isReadOnly) port.fill = 'rgba(255,0,255,0.5)'
          },
          mouseLeave: function (e, port) {
            port.fill = 'gray'
          }
        }),
      $(go.TextBlock, name)
    )
  }

  label(name, strokeV) {
    return $(go.TextBlock, {
      alignment: new go.Spot(0.5, 1, 0, 10),
      margin: 8,
      stroke: strokeV,
      font: AbsractTemplate.font,
      text: name
    })
  }
  static props = {
    minSize: new go.Size(40, 40),
    maxSize: new go.Size(40, 40),
    alignment: new go.Spot(0.5, 0.5),
    stroke: null,
  }


  base() {
    var bObj = AbsractTemplate.props

    return $(go.Panel, "Spot",
      $(go.Shape, bObj,
        new go.Binding("figure", "figure"),
        new go.Binding("fill", "color"),
      ),
      $(go.Picture,
        {
          name: "Picture",
          successFunction: ()=>{console.log("sucess function")},
          errorFunction: ()=>{console.log("Error failed")},
          desiredSize: new go.Size(40, 40),
          alignment: new go.Spot(0.5, 0.5),
        },
        new go.Binding("source", "icon", (k) => {
          var s = iconMap[k]
          if (!s)
            console.log("Error: in conversationBuilder No icon found for " + k)
          return s
        })
      )
    )
  }
  overflowLabel(prop, strokeV, maxlines, width, tooltipProp) {
    return $(go.TextBlock, {
      cursor: 'pointer',
      textAlign: 'left',
      verticalAlignment: go.Spot.Top,
      font: AbsractTemplate.font,
      overflow: go.TextBlock.OverflowEllipsis,
      maxLines: maxlines,
      margin: 2,
      width: width,
      stroke: strokeV,
      cursor: 'pointer',
    }, new go.Binding("text", prop, function (p) { return (p.length == 0) ? "prompt value not set in model" : p }))
  }

  baseProp(fillc) {
    return {
      fill: fillc,
      minSize: new go.Size(40, 40),
      maxSize: new go.Size(40, 40),
      alignment: new go.Spot(0.5, 0.5)
    }
  }
  makePort(name, align, spot, output, input, label) {
    var horizontal = align.equals(go.Spot.Top) || align.equals(go.Spot.Bottom)
    // the port is basically just a transparent rectangle that stretches along the side of the node,
    // and becomes colored when the mouse passes over it
    return $(go.Shape,
      {
        fill: 'transparent', // changed to a color in the mouseEnter event handler
        strokeWidth: 0, // no stroke
        width: horizontal ? NaN : 10, // if not stretching horizontally, just 8 wide
        height: !horizontal ? NaN : 10, // if not stretching vertically, just 8 tall
        alignment: align, // align the port on the main Shape
        stretch: (horizontal ? go.GraphObject.Horizontal : go.GraphObject.Vertical),
        portId: name, // declare this object to be a "port"
        fromSpot: spot, // declare where links may connect at this port
        fromLinkable: output, // declare whether the user may draw links from here
        toSpot: spot, // declare where links may connect at this port
        toLinkable: input, // declare whether the user may draw links to here
        cursor: 'pointer', // show a different cursor to indicate potential link point
        mouseEnter: function (e, port) { // the PORT argument will be this Shape
          if (!e.diagram.isReadOnly) port.fill = 'rgba(255,0,255,0.5)'
        },
        mouseLeave: function (e, port) {
          port.fill = 'transparent'
        }
      })
  }
  toolTip(tText, stroke) {
    const s = (!stroke) ? 'gray' : stroke
    return $('ToolTip', {
      'Border.stroke': 'gray',
      'Border.strokeWidth': 2
    },
      $(go.TextBlock, {
        margin: 8,
        stroke: s,
        font: AbsractTemplate.font,
        text: tText
      }, new go.Binding("text", tText, (g) => (!g) ? tText : g))
    )
  }

  createTemplate(nodeType, core) {
    const nt = AbsractTemplate.nodeType
    switch (nodeType) {
      case "start":
        return $(go.Node, 'Vertical', nt.start,
          $(go.Panel, 'Horizontal',
            this.base(),
            this.overflowLabel('prompt', 'gray', 3, 180, "prompt"),
          ),
          this.createPort(""),
          { toolTip: toolTip }
        )
      case "end":
        return $(go.Node, 'Vertical', nt.stop,
          $(go.Panel, 'Horizontal',
            this.base(),
            this.overflowLabel('prompt', 'gray', 3, 180, "prompt"),
          ),
          this.createPort(""),
          { toolTip: toolTip }
        )
    }
  }
}

export default AbsractTemplate
