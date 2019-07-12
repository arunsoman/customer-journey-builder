import go from '../../../../node_modules/gojs/release/go-debug'

import wt from './Welcome'
import dI from './DecisionIntent'
import qI from './Question'
import rec from './Recommender'
import cap from './Capabilities'
const $ = go.GraphObject.make
export default function goJsInit (canvasId, paletteId, selectedEleCallback) {
  const modelViewMap = {}
  const intents = [
    // add all intents, as and when created
    new wt(),
    new dI(),
    new rec(),
    new qI(),
    new cap()
  ]
  var diagram = $(go.Diagram, canvasId, // create a Diagram for the DIV HTML element
    { // enable undo & redo
      'undoManager.isEnabled': true,
      maxSelectionCount: 1,
      layout: $(go.TreeLayout, {
        angle: 90,
        arrangement: go.TreeLayout.ArrangementFixedRoots,
        nodeSpacing: 4
      }),
      initialContentAlignment: go.Spot.Top
    })
  diagram.addDiagramListener('Modified', function (e) {
    console.log('activate save')
  })

  diagram.addDiagramListener('ObjectSingleClicked',
    (e) => {
      var node = e.subject.part
      if (!(node instanceof go.Node)) return
      debugger
      selectedEleCallback(node.data.intentName, node)
    })

  diagram.addDiagramListener('ExternalObjectsDropped',
    function (e) {
      var node = e.subject.part
      if (!(node instanceof go.Node)) return
    })

  const myPalette = $(go.Palette, paletteId)
  myPalette.model = new go.GraphLinksModel()
  const tt = myPalette.nodeTemplateMap
  intents.forEach(e => {
    const x = e.paletteTemplate()
    tt.add(x[0], x[1])
    const y = e.canvasTemplate()
    diagram.nodeTemplateMap.add(y[0], y[1])
  })
  myPalette.model.nodeDataArray = intents.map(e => {
    return e.dataModel
  })
  diagram.linkTemplate =
        $(go.Link, // the whole link panel
          {
            routing: go.Link.AvoidsNodes,
            curve: go.Link.JumpOver,
            corner: 5,
            toShortLength: 4,
            relinkableFrom: true,
            relinkableTo: true,
            reshapable: true,
            resegmentable: true,
            // mouse-overs subtly highlight links:
            mouseEnter: function (e, link) { link.findObject('HIGHLIGHT').stroke = 'rgba(30,144,255,0.2)' },
            mouseLeave: function (e, link) { link.findObject('HIGHLIGHT').stroke = 'transparent' },
            selectionAdorned: false
          },
          new go.Binding('points').makeTwoWay(),
          $(go.Shape, // the highlight shape, normally transparent
            { isPanelMain: true, strokeWidth: 12, stroke: 'transparent', name: 'HIGHLIGHT' }),
          $(go.Shape, // the link path shape
            { isPanelMain: true, stroke: 'gray', strokeWidth: 2 },
            new go.Binding('stroke', 'isSelected', function (sel) { return sel ? 'dodgerblue' : 'gray' }).ofObject()),
          $(go.Shape, // the arrowhead
            { toArrow: 'standard', strokeWidth: 0, fill: 'gray' })

        )

  const d = {
    diagram: diagram,
    eMap: (name, element) => {
      modelViewMap.put(name, element)
    },
    save: (node, modifiedData) => {
      debugger
      var model = diagram.model
      model.startTransaction('Update props')
      for (var x in modifiedData) { model.set(node.data, x, modifiedData[x]) }
      model.commitTransaction('Update props')
      console.log(' saved property')
    }
  }

  return d
}
