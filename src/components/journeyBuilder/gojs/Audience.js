import go from '../../../../node_modules/gojs/release/go-debug'
import iconMap from "./iconLoader"
const $ = go.GraphObject.make

export default class AudienceTemplate {


    addTemplate(diagram) {
        var template = $(go.Node, "Auto",
            $(go.Shape, "Rectangle",
                {
                    name: "SHAPE", fill: "white", stroke: "green", minSize: new go.Size(100, 410),
                    maxSize: new go.Size(80, 80),
                    portId: "",
                    toLinkable: false,  // declare whether the user may draw links to here
                    fromSpot: go.Spot.Right,
                    fromLinkable: true,  // declare whether the user may draw links from here
                    cursor: "pointer",
                    mouseEnter: function (e, port) {  // the PORT argument will be this Shape
                        if (!e.diagram.isReadOnly) port.fill = "rgba(255,0,255,0.5)";
                    },
                    mouseLeave: function (e, port) {
                        port.fill = "lightgray";
                    }
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
                        $(go.TextBlock, {alignment: new go.Spot(1.0, 0.50, 30, -0)},
                            new go.Binding("text", "label"))
                ),
                
            )
        )
        //diagram.nodeTemplateMap.add("AddAudience", template)
    }
    nodeDoubleClick(a, b) {
        debugger
    }
}