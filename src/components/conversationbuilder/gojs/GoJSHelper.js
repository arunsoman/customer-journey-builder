import go from '../../../../node_modules/gojs/release/go-debug'
import iconMap from "./iconLoader"

import Welcome from './Welcome'
import DecisionIntent from './DecisionIntent'
import Question from './Question'
import Recommender from './Recommender'
import Capabilities from './Capabilities'
const $ = go.GraphObject.make

const templates = [
  new Welcome(),
  new DecisionIntent(),
  new Question(),
  new Capabilities(),
  new Recommender(),
]

export default function goJsInit(vueContext) {

  var font = 'bold 12px sans-serif'

  var diagram = $(go.Diagram, "goDiaDiv", {
    'undoManager.isEnabled': true,
    maxSelectionCount: 1,
    layout: $(go.TreeLayout, {
      angle: 90,
      arrangement: go.TreeLayout.ArrangementFixedRoots,
      nodeSpacing: 4
    }),
    initialContentAlignment: go.Spot.Top
  })

  diagram.model = $(go.GraphLinksModel, {
    linkFromPortIdProperty: "fromPort",  // required information:
    linkToPortIdProperty: "toPort",
  })

  // create the Palette
  var myPalette = $(go.Palette, "paletteDiv");

  // the Palette's node template is different from the main Diagram's
  myPalette.nodeTemplate =
    $(go.Node, "Auto",
      $(go.Shape, "Rectangle",
        {
          name: "SHAPE", fill: "white", stroke: "white", minSize: new go.Size(80, 50),
          maxSize: new go.Size(80, 80), toolTip: null,
        }),
      $(go.Panel, "Vertical",
        $(go.Panel, "Spot",
          $(go.Shape,
            { width: 40, height: 40, fill: "white", alignment: new go.Spot(0.0, 0.0) },
            new go.Binding("fill", "color"),
            new go.Binding("figure", "figure")),
          $(go.Picture,
            {
              desiredSize: new go.Size(40, 40),
              alignment: new go.Spot(0., 0.)
            },
            new go.Binding("source", "icon", (k) => {
              var s = iconMap[k]
              if (!s)
                console.log("Error: No icon foud for " + k)
              return s
            })),
        ),
        $(go.TextBlock,
          new go.Binding("text", "name")),
        {
          toolTip: $('ToolTip', {
            'Border.stroke': 'gray',
            'Border.strokeWidth': 2
          },
            $(go.TextBlock, {
              margin: 8,
              stroke: "gray",
              font: font,

            }, new go.Binding("text", "tooltip"))
          )
        }
      )

    )

  diagram.nodeTemplate = myPalette.nodeTemplate
  
  templates.forEach(e => {
    e.addTemplate(diagram.nodeTemplateMap)
    e.vueContext =vueContext
  })
  myPalette.model.nodeDataArray = templates.map(e => e.model)


  return {
    diagram: diagram
  }
}