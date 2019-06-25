<template lang="html">
<section class="control-source">
    <span>Flow</span>
    <div id="FlowSourceID" draggable="true" style="height:calc(80%) ;width:calc(100%);"></div>
    <v-dialog v-model="configDialog" style="width:400px height: 100">
        <ConversationUnit ref="cu" @saved="pushDataArray" :config="conData"></ConversationUnit>
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
        return {
            diagram: {},
            configDialog: false,
            conData: {},
            elements: [{
                    name: "Conversation",
                    toolTip: "Join Some tool tip text2",
                    category: "conversation"

                },
                {
                    name: "Start",
                    iconUri: '@/assets/WaitUntil.svg',
                    toolTip: "Wait Until Some tool tip text2",
                    category: "start"
                },
                {
                    name: "Decision",
                    toolTip: "Wait Some tool tip text2",
                    category: "decision",
                    value: {
                        duration: 2,
                        unit: "weeks"
                    }
                },
                {
                    name: "End",
                    toolTip: "Wait Until Some tool tip text2",
                    category: "end"
                },
            ],
            contextMenu: this.addContextMenu()
        }
    },
    methods: {
        pushDataArray() {
            this.configDialog = false
            var dd = this.$refs['cu'].getDataObj();
            const dia = this.diagram
            dia.selection.each(e => {

                var node = e.diagram.findNodeForKey(e.key)
                dia.model.commit(m => {
                    debugger
                    m.set(node.data, 'prompt', dd.prompt)
                    m.set(node.data, 'reprompt', dd.reprompt)
                    m.set(node.data, 'options', dd.options)
                    m.set(node.data, 'validation', dd.validation)
                }, "updated props")
            })

            dia.selection.each(e => {
                var node = dia.findNodeForKey(e.key)
                dia.startTransaction("changeCategory");
                dia.model.setCategoryForNodeData(node.data, "conversationExpanded");
                dia.commitTransaction("changeCategory");
            })
        },
        addTemplates(diagram) {
            this.diagram = diagram
            const t1 = this.decisionTemplate(diagram)
            const t2 = this.conversationTemplate(diagram)
            const t3 = this.termimalStartTemplate(diagram)
            const t4 = this.termimalEndTemplate(diagram)
            diagram.nodeTemplateMap.add("decision", t1)
            diagram.nodeTemplateMap.add("conversation", t2)
            diagram.nodeTemplateMap.add("conversationExpanded", this.conversationExpandTemplate(diagram))
            diagram.nodeTemplateMap.add("start", t3)
            diagram.nodeTemplateMap.add("end", t4)
            const p = go.GraphObject.make(go.Palette, "FlowSourceID")
            p.nodeTemplateMap.add("decision", t1)
            p.nodeTemplateMap.add("conversation", t2)
            p.nodeTemplateMap.add("start", t3)
            p.nodeTemplateMap.add("end", t4)
            p.model.nodeDataArray = this.elements
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

                contextMenu: // define a context menu for each node
                    $("ContextMenu", // that has one button
                        $("ContextMenuButton",
                            $(go.TextBlock, "Configure"), {
                                click: showDialog
                            })
                        // more ContextMenuButtons would go here
                    )
            }
            return contextObj
        },
        conversationTemplate(diagram) {
            var makePort = this.$parent.makePort
            var go = this.go

            var $ = go.GraphObject.make;
            var template =
                $(go.Node, "Table", this.nodeStyle(),
                    $(go.Panel, go.Panel.Spot, // or "Spot"
                        $(go.Shape, "RoundedRectangle", {
                            minSize: new go.Size(40, 40),
                            maxSize: new go.Size(40, 40),
                            fill: "blue",
                            alignment: new go.Spot(0.5, 0.5)
                        }),
                        $(go.TextBlock, {
                                alignment: new go.Spot(0.5, 1, 0, 10),
                                margin: 8,
                                stroke: "gray",
                                font: "bold 12px sans-serif"
                            },
                            new go.Binding("text", "name")),
                        makePort("T", go.Spot.Top, go.Spot.Top, false, true),
                        makePort("L", go.Spot.Left, go.Spot.Left, false, true),
                        makePort("R", go.Spot.Right, go.Spot.Left, false, true),
                        makePort("B", go.Spot.Bottom, go.Spot.Bottom, true, false), {
                            toolTip: $("ToolTip", {
                                    "Border.stroke": "gray",
                                    "Border.strokeWidth": 2
                                },
                                $(go.TextBlock, {
                                        margin: 8,
                                        stroke: "gray",
                                        font: "bold 16px sans-serif"
                                    },
                                    new go.Binding("text", "toolTip")))
                        }
                    ),
                    this.contextMenu
                )
            return template
        },
        conversationExpandTemplate(diagram) {
            var makePort = this.$parent.makePort
            var go = this.go

            function tBHeader(bKey) {
                return $(go.TextBlock, {
                    margin: 8,
                    stroke: "gray",
                    text: bKey,
                    font: "bold 12px sans-serif"
                })
            }
            const tBvalue = (bKey) => {
                return $(go.TextBlock, {
                        margin: 8,
                        stroke: "gray",
                        font: "bold 12px sans-serif"
                    },
                    new go.Binding("text", bKey))
            }
            var $ = go.GraphObject.make;
            var template =
                $(go.Node, "Table", this.nodeStyle(),
                    $(go.Panel, "Vertical", {
                            background: "lightblue",
                            width: 9 0,
                            toolTip: $("ToolTip", {
                                    "Border.stroke": "gray",
                                    "Border.strokeWidth": 2
                                },
                                $(go.TextBlock, {
                                        margin: 8,
                                        stroke: "gray",
                                        text: "Conversation unit",
                                        font: "bold 16px sans-serif"
                                    }))
                        },
                        $(go.Panel, "Horizontal",
                            tBHeader("prompt :"), tBvalue("prompt")
                        ),
                        $(go.Panel, "Horizontal",
                            tBHeader("Reprompt :"), tBvalue("reprompt")
                        ),
                        $(go.Panel, "Horizontal",
                            tBHeader("Options :"), tBvalue("options"), {
                                toolTip: $("ToolTip", {
                                        "Border.stroke": "gray",
                                        "Border.strokeWidth": 2
                                    },
                                    $(go.TextBlock, {
                                            margin: 8,
                                            stroke: "gray",
                                            font: "bold 16px sans-serif"
                                        },
                                        new go.Binding("text", "options")))
                            },
                        ),
                        $(go.Panel, "Horizontal",
                            tBHeader("Options :"), tBvalue("validation")
                        ),
                        makePort("T", go.Spot.Top, go.Spot.Top, false, true),
                        makePort("L", go.Spot.Left, go.Spot.Left, false, true),
                        makePort("R", go.Spot.Right, go.Spot.Left, false, true),
                        makePort("B", go.Spot.Bottom, go.Spot.Bottom, true, false)
                    ),
                    this.contextMenu
                )
            return template
        },
        termimalStartTemplate(diagram) {
            var makePort = this.$parent.makePort
            var go = this.go

            var $ = go.GraphObject.make;
            var template =
                $(go.Node, "Table", this.nodeStyle(),
                    $(go.Panel, go.Panel.Spot, // or "Spot"
                        $(go.Shape, "Ellipse", {
                            minSize: new go.Size(40, 40),
                            maxSize: new go.Size(40, 40),
                            fill: "white",
                            alignment: new go.Spot(0.5, 0.5)
                        }),
                        $(go.TextBlock, {
                                alignment: new go.Spot(0.5, 1, 0, 10),
                                margin: 8,
                                stroke: "gray",
                                font: "bold 12px sans-serif"
                            },
                            new go.Binding("text", "name")),
                        makePort("B", go.Spot.Bottom, go.Spot.Bottom, true, false), {
                            toolTip: $("ToolTip", {
                                    "Border.stroke": "gray",
                                    "Border.strokeWidth": 2
                                },
                                $(go.TextBlock, {
                                        margin: 8,
                                        stroke: "gray",
                                        font: "bold 16px sans-serif"
                                    },
                                    new go.Binding("text", "toolTip")))
                        }
                    ),
                )
            return template
        },
        termimalEndTemplate(diagram) {
            var makePort = this.$parent.makePort
            var go = this.go

            var $ = go.GraphObject.make;
            var template =
                $(go.Node, "Table", this.nodeStyle(),
                    $(go.Panel, go.Panel.Spot, // or "Spot"
                        $(go.Shape, "Ellipse", {
                            minSize: new go.Size(40, 40),
                            maxSize: new go.Size(40, 40),
                            fill: "gray",
                            alignment: new go.Spot(0.5, 0.5)
                        }),
                        $(go.TextBlock, {
                                alignment: new go.Spot(0.5, 1, 0, 10),
                                margin: 8,
                                stroke: "gray",
                                font: "bold 12px sans-serif"
                            },
                            new go.Binding("text", "name")),
                        makePort("T", go.Spot.Top, go.Spot.Top, false, true), {
                            toolTip: $("ToolTip", {
                                    "Border.stroke": "gray",
                                    "Border.strokeWidth": 2
                                },
                                $(go.TextBlock, {
                                        margin: 8,
                                        stroke: "gray",
                                        font: "bold 16px sans-serif"
                                    },
                                    new go.Binding("text", "toolTip")))
                        }
                    ),
                )
            return template
        },

        decisionTemplate(diagram) {
            var makePort = this.$parent.makePort
            var go = this.go
            var colors = this.colors
            var $ = go.GraphObject.make;
            var template =
                $(go.Node, "Table", this.nodeStyle(),
                    $(go.Panel, go.Panel.Spot, // or "Spot"
                        $(go.Shape, "Diamond", {
                            minSize: new go.Size(40, 40),
                            maxSize: new go.Size(40, 40),
                            fill: "#ed9206",
                            alignment: new go.Spot(0.5, 0.5)
                        }),
                        $(go.TextBlock, {
                                alignment: new go.Spot(0.5, 1, 0, 10),
                                margin: 8,
                                stroke: "gray",
                                font: "bold 12px sans-serif"
                            },
                            new go.Binding("text", "name")),
                        makePort("T", go.Spot.Top, go.Spot.Top, false, true),
                        makePort("L", go.Spot.Left, go.Spot.Left, true, false),
                        makePort("R", go.Spot.Right, go.Spot.Right, true, false), {
                            toolTip: $("ToolTip", {
                                    "Border.stroke": "gray",
                                    "Border.strokeWidth": 2
                                },
                                $(go.TextBlock, {
                                        margin: 8,
                                        stroke: "gray",
                                        font: "bold 16px sans-serif"
                                    },
                                    new go.Binding("text", "toolTip")))
                        }
                    )
                )
            return template
        }
    },
    computed: {

    }
}
</script>

<style lang="scss" scoped>
.control-source {}
</style>
