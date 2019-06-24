<template lang="html">
<div>
    <v-layout align-center justify-start row fill-height>
        <v-flex sm2>
            <v-layout align-center justify-start column fill-height>
                <EntrySource ref="entrySource" :diagram="diagram" style="height:200px;width:calc(100%); border: 1px solid gray;" />
                <FlowSource ref="flowSource" :diagram="diagram" style="height:200px;width:calc(100%); border: 1px solid gray;" />
                <MessagingSource ref="messageSource" :diagram="diagram" style="height:200px;width:calc(100%); border: 1px solid gray;" />
                <CustomerUpdate ref="customerSource" :diagram="diagram" style="height:200px;width:calc(100%); border: 1px solid gray;" />

            </v-layout>
        </v-flex>

        <v-flex sm8 ml-3 mt-2>
            <v-layout align-center justify-start row fill-height>
                <v-flex sm8>
                    <v-text-field label="Name your workflow" v-model='name'></v-text-field>
                </v-flex>
                <v-flex sm4>
                    <v-btn v-if="!active" flat color="teal" @click="onSave">
                        <span v-if="mutated">Edit</span>
                        <span v-else>Save</span>
                    </v-btn>
                    <v-btn v-if="!mutated" flat color="teal" @click="onStatusChange">
                        <span v-if="active">Deactivate</span>
                        <span v-else>Activate</span>
                    </v-btn>
                    <v-btn flat color="teal" @click="$emit('cancel')">Cancel</v-btn>
                </v-flex>
            </v-layout>
            <div id="goDiaDiv" style="height:800px; width:calc(100%); border: 1px solid gray;" />
        </v-flex>

    </v-layout>
    <v-dialog v-if='configDialog' v-model="configDialog" style="width:calc(100%)">
        <creative-picker @newConfig='manageConfigChanges' @cancelConfigChanges="configDialog=false" :config='creativeConfig'></creative-picker>
    </v-dialog>

</div>
</template>

<script src=".../../../node_modules/gojs/extensions/figures.js"></script>
<script src="./Messaging.js"></script><script lang="js">
import go from '../../../node_modules/gojs/release/go.js'
import EntrySource from './EntrySource'
import FlowSource from './FlowSource'
import CustomerUpdate from './CustomerUpdate'
import MessagingSource from './MessagingSource'
import customIcons from "./icon.js"
var $ = go.GraphObject.make;
var _TBlock = go.TextBlock;
var _SpotLeft = go.Spot.Left;
var _SpotTop = go.Spot.Top;
var _SpotRight = go.Spot.Right;
var _SpotBottom = go.Spot.Bottom;
var _Node = go.Node;
var diagram = {};
var lastAdded = undefined
var utils = document.utils

export default {
    name: 'journey-builder',
    props: ['config'],
    components: {
        EntrySource,
        FlowSource,
        MessagingSource,
        CustomerUpdate
    },
    mounted() {
        console.log(this.go)
        console.log(document.source)
        var go = this.go
        var $ = go.GraphObject.make;
        this.diagram = $(go.Diagram, "goDiaDiv", // create a Diagram for the DIV HTML element
            { // enable undo & redo
                "undoManager.isEnabled": true,
                maxSelectionCount: 1,
                "LinkDrawn": this.showLinkLabel, // this DiagramEvent listener is defined below
                "LinkRelinked": this.showLinkLabel,
                layout: $(go.TreeLayout, {
                    angle: (true ? 0 : 90),
                    nodeSpacing: 4
                }),
                initialContentAlignment: go.Spot.Left
            });
        this.$refs['entrySource'].addTemplates(this.diagram)
        this.$refs['flowSource'].addTemplates(this.diagram)
        this.$refs['customerSource'].addTemplates(this.diagram)
        this.$refs['messageSource'].addTemplates(this.diagram)
        this.linkTemplate(this.diagram)
        this.diagram.addDiagramListener("Modified", function (e) {
            console.log("activate save")
        });
        this.diagram.addDiagramListener("ObjectSingleClicked",
            function (e) {
                var part = e.subject.part;
                if (!(part instanceof go.Link)) {
                    //  debugger
                }
            });
        var dia = this.diagram
        dia.addDiagramListener("ExternalObjectsDropped",
            function (e) {
                var part = e.subject.part;
                const groupBy = key => array =>
                    array.reduce((objectsByKeyValue, obj) => {
                        const value = obj[key];
                        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
                        return objectsByKeyValue;
                    }, {});
                const groupByCategory = groupBy('category');
                const findBestFoster = (fosters) => {
                    const group = groupByCategory(fosters)
                    //TODO add sofistication later, now return the nearest one
                    var temp = []
                    for (var property in group) {
                        if (group.hasOwnProperty(property)) {
                            temp.push(group[property].sort((a, b) => a.distance - b.distance)[0])
                        }
                    }
                    const minDist = Math.min(...temp.map(e => e.distance))
                    return temp.find(e => e.distance == minDist)
                }
                var child = dia.findNodeForKey(e.subject.first().key)
                const childLoc = child.location
                e.subject.each((node) => {
                    if (node.data) {
                        const fosters = dia.model.nodeDataArray.filter(e => {
                                return e.key != node.data.key && node.data.loc
                            })
                            .map(aNode => {
                                const nodeLoc = go.Point.parse(aNode.loc)
                                return {
                                    key: aNode.key,
                                    category: aNode.category,
                                    distance: childLoc.distanceSquaredPoint(nodeLoc),
                                    direction: childLoc.directionPoint(nodeLoc)
                                }
                            })
                        if (fosters.length > 0) {
                            const best = findBestFoster(fosters)
                            dia.startTransaction("make new link");
                            dia.model.addLinkData({
                                from: best.key,
                                to: child.data.key
                            });
                            dia.commitTransaction("make new link");
                        }
                    }
                })
            })
            if(this.config){
              this.diagram.model = go.Model.fromJson(this.config)
              debugger
            }
    },
    data() {
        return {
            diagram: {},
            creativeConfig: {},
            mutated: false,
            active: false,
            name: "",
            configDialog: false,
            modelId: 0,
            titleLookup: {},

        }
    },
    watch: {

    },
    created() {

    },
    methods: {
        addContextMenu() {
            var contextObj = {
                contextMenu: // define a context menu for each node
                    $("ContextMenu", // that has one button
                        $("ContextMenuButton",
                            $(go.TextBlock, "Configure"), {
                                click: (context) => {
                                    console.log(context)
                                }
                            })
                        // more ContextMenuButtons would go here
                    )
            }
            return contextObj
        },
        nodeStyle() {
            return [
                // The Node.location comes from the "loc" property of the node data,
                // converted by the Point.parse static method.
                // If the Node.location is changed, it updates the "loc" property of the node data,
                // converting back using the Point.stringify static method.
                new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                {
                    // the Node.location is at the center of each node
                    locationSpot: go.Spot.Center
                }
            ];
        },

        makePort(name, align, spot, output, input) {
            var go = this.go

            var horizontal = align.equals(go.Spot.Top) || align.equals(go.Spot.Bottom);
            // the port is basically just a transparent rectangle that stretches along the side of the node,
            // and becomes colored when the mouse passes over it
            return go.GraphObject.make(go.Shape, {
                fill: "transparent", // changed to a color in the mouseEnter event handler
                strokeWidth: 0, // no stroke
                width: horizontal ? NaN : 8, // if not stretching horizontally, just 8 wide
                height: !horizontal ? NaN : 8, // if not stretching vertically, just 8 tall
                alignment: align, // align the port on the main Shape
                stretch: (horizontal ? go.GraphObject.Horizontal : go.GraphObject.Vertical),
                portId: name, // declare this object to be a "port"
                fromSpot: spot, // declare where links may connect at this port
                fromLinkable: output, // declare whether the user may draw links from here
                toSpot: spot, // declare where links may connect at this port
                toLinkable: input, // declare whether the user may draw links to here
                cursor: "pointer", // show a different cursor to indicate potential link point
                mouseEnter: function (e, port) { // the PORT argument will be this Shape
                    if (!e.diagram.isReadOnly) port.fill = "rgba(255,0,255,0.5)";
                },
                mouseLeave: function (e, port) {
                    port.fill = "transparent";
                }
            });
        },
        linkTemplate(diagram) {
            var go = this.go
            diagram.linkTemplate =
                go.GraphObject.make(go.Link, // the whole link panel
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
                        mouseEnter: function (e, link) {
                            link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.2)";
                        },
                        mouseLeave: function (e, link) {
                            link.findObject("HIGHLIGHT").stroke = "transparent";
                        },
                        selectionAdorned: false
                    },
                    new go.Binding("points").makeTwoWay(),
                    go.GraphObject.make(go.Shape, // the highlight shape, normally transparent
                        {
                            isPanelMain: true,
                            strokeWidth: 8,
                            stroke: "transparent",
                            name: "HIGHLIGHT"
                        }),
                    go.GraphObject.make(go.Shape, // the link path shape
                        {
                            isPanelMain: true,
                            stroke: "gray",
                            strokeWidth: 2
                        },
                        new go.Binding("stroke", "isSelected", function (sel) {
                            return sel ? "dodgerblue" : "gray";
                        }).ofObject()),
                    go.GraphObject.make(go.Shape, // the arrowhead
                        {
                            toArrow: "standard",
                            strokeWidth: 0,
                            fill: "gray"
                        }),
                    go.GraphObject.make(go.Panel, "Auto", // the link label, normally not visible
                        {
                            visible: false,
                            name: "LABEL",
                            segmentIndex: 2,
                            segmentFraction: 0.5
                        },
                        new go.Binding("visible", "visible").makeTwoWay(),
                        go.GraphObject.make(go.Shape, "RoundedRectangle", // the label shape
                            {
                                fill: "#F8F8F8",
                                strokeWidth: 0
                            }),
                        go.GraphObject.make(go.TextBlock, "Yes", // the label
                            {
                                textAlign: "center",
                                font: "10pt helvetica, arial, sans-serif",
                                stroke: "#333333",
                                editable: true
                            },
                            new go.Binding("text").makeTwoWay())
                    )
                );
        },
        // Make link labels visible if coming out of a "conditional" node.
        // This listener is called by the "LinkDrawn" and "LinkRelinked" DiagramEvents.
        showLinkLabel(e) {
            var label = e.subject.findObject("LABEL");
            if (label !== null) label.visible = (e.subject.fromNode.data.category === "Conditional");
        },
        manageConfigChanges(config) {
            debugger
            var node = this.diaCopy.model.findNodeDataForKey(config.nodeKey)
            if (node) {
                this.diaCopy.model.setDataProperty(node, 'text', config.changedText)
            }
        },
        onSave() {
            //TODO make network call and toggle the active field
            //if network activity success
            this.mutated = !(this.mutated)
            var result = this.diagram.model.toJson()
            debugger
        },
        onStatusChange() {
            debugger
            //TODO make network call and toggle the active field
            //if network activity success
            this.active = !(this.active)
        },
        drawWorkflow(diagram) {
            if (this.config) {
                debugger
                this.name = this.config.name
                this.active = this.config.active
                diagram.model = go.Model.fromJson(this.config.data)
            }
        },
    },
    computed: {

    }
}
</script>

<style lang="scss" scoped>
.journey-builder {}
</style>
