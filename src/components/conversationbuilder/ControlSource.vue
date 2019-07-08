<template lang="html">
<section class="control-source">
    <span>Flow</span>
    <div id="FlowSourceID" draggable="true" style="height:calc(80%) ;width:calc(100%);"></div>
    <v-dialog v-model="configDialog" style="width:400px height: 100">
        <ConversationUnit ref="cu" @saved="" :config="conData"></ConversationUnit>
    </v-dialog>
</section>
</template>

<script lang="js">
import ConversationUnit from './ConversationUnit';

export default {
    name: 'control-source',
    props: [],
    components: {
        ConversationUnit
    },
    mounted() {

    },
    data() {
        var $ = go.GraphObject.make;
        return {
            diagram: {},
            configDialog: false,
            conData: {},
            elements: [{
                    category: "start",
                    paletteTemplate: () => {
                        return $(go.Node, go.Panel.Spot,
                            $(go.Shape, "Circle", {
                                minSize: new go.Size(40, 40),
                                maxSize: new go.Size(40, 40),
                                fill: "White",
                                alignment: new go.Spot(0.5, 0.5)
                            }), this.tBHeader('Welcome'),
                            this.addToolTip("Welcome conversation unit")
                        )
                    },
                    onCanvasTemplate: () => {}
                },
                {
                    category: "Information",
                    paletteTemplate: () => {
                        return $(go.Node, go.Panel.Spot,
                            $(go.Shape, "RoundedRectangle", {
                                minSize: new go.Size(40, 40),
                                maxSize: new go.Size(40, 40),
                                fill: "lightgreen",
                                alignment: new go.Spot(0.5, 0.5)
                            }), this.tBHeader("information"),
                            this.addToolTip("Information conversation unit")
                        )
                    },
                    onCanvasTemplate: () => {}

                },
                {
                    category: "Conversation with options",
                    paletteTemplate: () => {
                        return $(go.Node, go.Panel.Spot,
                            $(go.Shape, "Rectangle", {
                                minSize: new go.Size(40, 40),
                                maxSize: new go.Size(40, 40),
                                fill: "lightblue",
                                alignment: new go.Spot(0.5, 0.5)
                            }), this.tBHeader("Conversation option"),
                            this.addToolTip("Conversation with options")
                        )
                    },
                    onCanvasTemplate: () => {}

                },
                {
                    category: "conversation",
                    paletteTemplate: () => {
                        return $(go.Node, go.Panel.Spot,
                            $(go.Shape, "Rectangle", {
                                minSize: new go.Size(40, 40),
                                maxSize: new go.Size(40, 40),
                                fill: "lightblue",
                                alignment: new go.Spot(0.5, 0.5)
                            }), this.tBHeader('Conversation with suggestion'),
                            this.addToolTip("Conversation with suggestion conversation unit")
                        )
                    },
                    onCanvasTemplate: () => {}

                },
                {
                    category: "end",
                    paletteTemplate: () => {
                        return $(go.Node, go.Panel.Spot,
                            $(go.Shape, "Circle", {
                                minSize: new go.Size(40, 40),
                                maxSize: new go.Size(40, 40),
                                fill: "coral",
                                alignment: new go.Spot(0.5, 0.5)
                            }), this.tBHeader('Thank you'),
                            this.addToolTip("Thank conversation unit")
                        )
                    },
                    onCanvasTemplate: () => {
                        return $(go.Node, "Spot",
                            $(go.Shape, "Circle", {
                                minSize: new go.Size(80, 80),
                                maxSize: new go.Size(80, 80),
                                fill: "coral",
                            }), this.tBHeader('Thank you'),
                            this.tBvalue(),
                            this.addToolTip("Thank conversation unit")
                        )
                    }

                }
            ],
            contextMenu: this.addContextMenu()
        }
    },
    methods: {
      
        addToolTip(tText) {
            var $ = go.GraphObject.make;
            return {
                toolTip: $("ToolTip", {
                        "Border.stroke": "gray",
                        "Border.strokeWidth": 2
                    },
                    $(go.TextBlock, {
                        margin: 8,
                        stroke: "gray",
                        font: "bold 16px sans-serif",
                        text: tText
                    }, )
                )
            }
        },
        tBvalue(bKey, name) {
            return go.GraphObject.make(go.TextBlock, {
                    editable: true,
                    isMultiline: false,
                    margin: 8,
                    stroke: "gray",
                    font: "bold 12px sans-serif",
                    alignment: new go.Spot(0.5, 1, 0, 10),
                },
                new go.Binding("text", bKey, (v) => name + ": " + v))
        },
        tBHeader(bKey) {
            var $ = go.GraphObject.make;
            return $(go.TextBlock, {
                margin: 8,
                stroke: "gray",
                text: bKey,
                font: "bold 12px sans-serif",
                alignment: new go.Spot(0.5, 1, 0, 10),
            })
        },
        
        addTemplates(diagram) {
            this.diagram = diagram

            this.elements.forEach(element => {
                diagram.nodeTemplateMap.add(element.category + "-dropped", element.onCanvasTemplate())
                diagram.nodeTemplateMap.add(element.category, element.paletteTemplate())
            });

            const p = go.GraphObject.make(go.Palette, "FlowSourceID")

            this.elements.forEach(element => {
                p.nodeTemplateMap.add(element.category, element.paletteTemplate())
            });
            debugger
            p.model.nodeDataArray = this.elements.map(e => {return {category : e.category}})
        },

        nodeStyle() {
            return [
                new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                {
                    locationSpot: go.Spot.Center
                }
            ];
        },
        showDialog(e, e1) {
            this.configDialog = true
            debugger
        },
        addContextMenu() {
            var showDialog = this.showDialog
            var $ = go.GraphObject.make;
            var contextObj = {
                contextMenu: 
                    $("ContextMenu", 
                        $("ContextMenuButton",
                            $(go.TextBlock, "Configure"), {
                                click: showDialog
                            })
                    )
            }
            return contextObj
        }
    },
    computed: {

    }
}
</script>

<style lang="scss" scoped>
.control-source {}
</style>
