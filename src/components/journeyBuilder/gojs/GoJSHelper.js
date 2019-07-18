import go from '../../../../node_modules/gojs/release/go-debug'
import Audience from "./Audience"
import Email from "./Email"
import iconMap from "./iconLoader"

const $ = go.GraphObject.make

export default function goJsInit(canvasId, paletteIds, selectedEleCallback) {

  var font = 'bold 12px sans-serif'

  var diagram = $(go.Diagram, canvasId, // create a Diagram for the DIV HTML element
    { // enable undo & redo
      'undoManager.isEnabled': true,
      maxSelectionCount: 1,
      layout: $(go.TreeLayout, {
        angle: 0,
        arrangement: go.TreeLayout.ArrangementFixedRoots,
        nodeSpacing: 4
      }),
      initialContentAlignment: go.Spot.Top
    })


  // create the Palette
  var myPalette = $(go.Palette, "entryID");

  // the Palette's node template is different from the main Diagram's
  myPalette.nodeTemplate =
    $(go.Node, "Auto",
      $(go.Shape, "Rectangle",
        {
          name: "SHAPE", fill: "white", stroke: "white", minSize: new go.Size(80, 50),
          maxSize: new go.Size(80, 80)
        }),
      $(go.Panel, "Vertical",
        $(go.Panel, "Spot",
          $(go.Shape,
            { width: 40, height: 40, fill: "white", alignment: new go.Spot(0.0, 0.0) },
            new go.Binding("fill", "color"),
            new go.Binding("figure", "figure")),
          $(go.Picture,
            {
              name: "Picture",
              desiredSize: new go.Size(40, 40),
              alignment: new go.Spot(0.5, 0.5)
            },
            new go.Binding("source", "icon", (k) => {
              var s = iconMap[k]
              if (!s)
                console.log("Error: No icon foud for " + k)
              return s
            })),
        ),
        $(go.TextBlock,
          new go.Binding("text", "label"))
      )
    )

  var split = $(go.Palette, "splitID");
  var message = $(go.Palette, "messagingID");
  var join = $(go.Palette, "joinID");
  var customer = $(go.Palette, "customerID");

  diagram.nodeTemplate= myPalette.nodeTemplate
  split.nodeTemplate = myPalette.nodeTemplate
  message.nodeTemplate = myPalette.nodeTemplate
  join.nodeTemplate = myPalette.nodeTemplate
  customer.nodeTemplate = myPalette.nodeTemplate

  // the list of data to show in the Palette
  myPalette.model.nodeDataArray = [
    { category: "AddAudience", name: "AddAudience", icon: "AddAudience", figure: "circle", label: "Audience", color: "deepskyblue" },
    { category: "Event", name: "Event", icon: "Event", figure: "circle", label: "Event", color: "deepskyblue" },
  ]
  split.model.nodeDataArray = [
    { category: "Split", name: "EngagementSplit", icon: "EngagementSplit", figure: "diamond", label: "Engagement", color: "aquamarine" },
    { category: "Split", name: "RandomSplit", icon: "RandomSplit", figure: "diamond", label: "Random", color: "aquamarine" },
    { category: "Split", name: "DecisionSplit", icon: "DecisionSplit", figure: "diamond", label: "Decision", color: "aquamarine" },
  ]
  message.model.nodeDataArray = [
    { category: "Message", name: "SendEmail", icon: "SendEmail", figure: "RoundedRectangle", label: "Email", color: "lightskyblue" },
    { category: "Message", name: "SendSMS", icon: "SendSMS", figure: "RoundedRectangle", label: "Sms", color: "lightskyblue" },
    { category: "Message", name: "SendEmail", icon: "SendEmail", figure: "RoundedRectangle", label: "WhatsApp", color: "lightskyblue" },
  ]
  join.model.nodeDataArray = [
    { category: "JW", name: "Join", icon: "Join", figure: "Ellipse", label: "Join", color: "lightsalmon" },
    { category: "JW", name: "Wait", icon: "Wait", figure: "Ellipse", label: "Wait", color: "lightsalmon" },
    { category: "JW", name: "WaitUntil", icon: "WaitUntil", figure: "Ellipse", label: "Wait until", color: "lightsalmon" },
  ]
  customer.model.nodeDataArray = [
    { category: "Customer", name: "AddAudience", icon: "AddAudience", figure: "Rectangle", label: "Customer", color: "lightsalmon" }
  ];

  // new Audience().addTemplate(diagram)
  // new Email().addTemplate(diagram)

}
