import go from 'gojs/release/go-debug'
import iconMap from "./iconLoader"
const $ = go.GraphObject.make

export default class Email{
    addTemplate(diagram) {
        var template = $(go.Node, "Auto",
            
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
        diagram.nodeTemplateMap.add("AddAudience", template)
    }
    nodeDoubleClick(a, b) {
        debugger
    }
}