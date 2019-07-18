import AbsractTemplate from './AbstracrtTemplate'
import go from 'gojs/release/go-debug'
import m from '../model/CapabilitiesModel'
const $ = go.GraphObject.make
class Capabilities extends AbsractTemplate {
    model

    constructor() {
        super()
        this.model = new m()
    }
    set model(v) {
        this.model = v
    }
    get dataModel() {
        return this.model
    }

    paletteTemplate() {
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

    addTemplate(map) {
        const toolTip = this.toolTip(this.model.help, 'Gray')
        const template =
            $(go.Node, 'Vertical', { background: this.bg },
                this.createPort("", this.top),
                $(go.Panel, 'Horizontal',
                    this.base(),
                    this.overflowLabel('prompt', 'gray', 3, 180), { toolTip: toolTip }
                ),
                $(go.Panel, 'Horizontal',
                    new go.Binding('itemArray', 'capabiltiesArray'),
                    {
                        row: 1,
                        column: 0,
                        itemTemplate:
                            $(go.Panel,
                                {
                                    _side: 'bottom',
                                    toSpot: go.Spot.Bottom,
                                    fromLinkable: true,
                                    toLinkable: false,
                                    cursor: 'pointer',
                                    toolTip: $('ToolTip', {
                                        'Border.stroke': 'gray',
                                        'Border.strokeWidth': 2
                                    },
                                        $(go.TextBlock, {
                                            margin: 8,
                                            stroke: "gray",
                                            font: AbsractTemplate.font,
                                        }, new go.Binding("text", "portId"))
                                    )
                                },
                                new go.Binding('portId', 'portId'),
                                $(go.Shape, 'Rectangle',
                                    {
                                        stroke: null,
                                        strokeWidth: 0,
                                        desiredSize: new go.Size(15, 8),
                                        margin: new go.Margin(0, 2)
                                    },
                                    new go.Binding('fill', 'portColor'))
                            )
                    }
                )
            )

        map.add(this.model.category, template)
    }
}
export default Capabilities
