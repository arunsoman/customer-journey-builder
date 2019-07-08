import go from '../../../../node_modules/gojs/release/go-debug'
const $ = go.GraphObject.make;

export default function goJsInit(divId){
    var diagram = $(go.Diagram, divId, // create a Diagram for the DIV HTML element
            { // enable undo & redo
                "undoManager.isEnabled": true,
                maxSelectionCount: 1,
                layout: $(go.TreeLayout, {
                    angle: (true ? 0 : 90),
                    nodeSpacing: 4
                }),
                initialContentAlignment: go.Spot.Top
            });
            diagram.addDiagramListener("Modified", function (e) {
                console.log("activate save")
            });
            
            diagram.addDiagramListener("ExternalObjectsDropped",
                function (e) {
                    var part = e.subject.part;
                    console.log("ExternalObjectsDropped")
                })
    return diagram
}