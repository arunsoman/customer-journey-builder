import go from '../../../../node_modules/gojs/release/go-debug'
const $ = go.GraphObject.make

class AbsractTemplate {
    static font = 'bold 12px sans-serif';
    icon (iconUri) {
      return $(go.Picture, {
        alignment: new go.Spot(0.5, 0.5),
        desiredSize: new go.Size(30, 30),
        source: iconUri
      })
    }

    label (name, strokeV) {
      return $(go.TextBlock, {
        alignment: new go.Spot(0.5, 1, 0, 10),
        margin: 8,
        stroke: strokeV,
        font: AbsractTemplate.font,
        text: name
      })
    }

    overflowLabel ( prop, strokeV, maxlines , width) {
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
        cursor: 'pointer'
      }, new go.Binding("text", prop, function(p){ console.log(p); console.log("Done"); return (p.length == 0)? "prompt value not set in model": p}))
    }

    baseProp (fillc) {
      return {
        fill: fillc,
        minSize: new go.Size(40, 40),
        maxSize: new go.Size(40, 40),
        alignment: new go.Spot(0.5, 0.5)
      }
    }
    makePort (name, align, spot, output, input, label) {
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
    toolTip (tText, stroke) {
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
      })
      )
    }
}

export default AbsractTemplate
