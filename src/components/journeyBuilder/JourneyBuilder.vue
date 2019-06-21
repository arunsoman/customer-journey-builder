<template lang="html">
<div>
    <v-layout align-center justify-start row fill-height>
        <v-flex sm2>
            <v-layout align-center justify-start column fill-height>
                <EntrySource ref="entrySource" :diagram="diagram" style="height:200px;width:calc(100%); border: 1px solid gray;" />
                <span>Messages</span>
                <div id="ActivityID"></div>
                <span>flow Control</span>
                <div id="flowControlID" style="height:200px; width:calc(100%); border: 1px solid gray;"> </div>
                <span>Customer updates</span>
                <div id="CustomerID" style="height:200px; width:calc(100%); border: 1px solid gray;"></div>
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
            <div id="canvasID" style="height:800px; width:calc(100%); border: 1px solid gray;" />
        </v-flex>

    </v-layout>
    <v-dialog v-if='configDialog' v-model="configDialog" style="width:calc(100%)">
        <creative-picker @newConfig='manageConfigChanges' @cancelConfigChanges="configDialog=false" :config='creativeConfig'></creative-picker>
    </v-dialog>

</div>
</template>

<script src=".../../../node_modules/gojs/extensions/figures.js"></script>
<script src="./Messaging.js"></script>
<script lang="js">
import go from '../../../node_modules/gojs/release/go.js'
import EntrySource from './EntrySource'
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
    },
    mounted() {

        const diagram = this.createDiagram('canvasID')
        this.styleLinkTemplate(diagram)
        this.$refs['entrySource'].attachTemplate(diagram)
        // entrySource.createPalette('EntrySourceID')
        // this.drawWorkflow(diagram)

        diagram.nodeTemplate =
            $(go.Node, go.Panel.Horizontal, {
                    locationObjectName: "SHAPE",
                    locationSpot: go.Spot.MiddleLeft,
                    portSpreading: go.Node.SpreadingPacked // rather than the default go.Node.SpreadingEvenly
                },
                $(go.TextBlock,{
        margin: 2,
        font: '9pt helvetica, arial, sans-serif',
        maxSize: new go.Size(80, 80),
        wrap: _TBlock.WrapFit,
        editable: true,
        stroke: "black"
    }, {
                        name: "LTEXT"
                    },
                    new go.Binding("text", "ltext")),
                $(go.Shape, {
                        name: "SHAPE",
                        figure: "Rectangle",
                        fill: "#2E8DEF", // default fill color
                        stroke: null,
                        strokeWidth: 0,
                        portId: "",
                        fromSpot: go.Spot.RightSide,
                        toSpot: go.Spot.LeftSide,
                        height: 50,
                        width: 20
                    },
                    new go.Binding("fill", "color")),
                $(go.TextBlock, {
        margin: 2,
        font: '9pt helvetica, arial, sans-serif',
        maxSize: new go.Size(80, 80),
        wrap: _TBlock.WrapFit,
        editable: true,
        stroke: "black"
    }, {
                        name: "TEXT"
                    },
                    new go.Binding("text"))
            );
        var linkSelectionAdornmentTemplate =
            $(go.Adornment, "Link",
                $(go.Shape, {
                    isPanelMain: true,
                    fill: null,
                    stroke: "rgba(0, 0, 255, 0.3)",
                    strokeWidth: 0
                }) // use selection object's strokeWidth
            );
        diagram.linkTemplate =
            $(go.Link, go.Link.Bezier, {
                    selectionAdornmentTemplate: linkSelectionAdornmentTemplate,
                    layerName: "Background",
                    fromEndSegmentLength: 150,
                    toEndSegmentLength: 150,
                    adjusting: go.Link.End
                },
                $(go.Shape, {
                        strokeWidth: 4,
                        stroke: "rgba(173, 173, 173, 0.25)"
                    },
                    new go.Binding("stroke", "pink"),
                    new go.Binding("strokeWidth", "width"))
            );

        this.diagram = diagram

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
        styleLinkTemplate: (diagram) => {
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
                        mouseEnter: function (e, link) {
                            link.findObject("HIGHLIGHT").stroke = "rgba(30,144,255,0.2)";
                        },
                        mouseLeave: function (e, link) {
                            link.findObject("HIGHLIGHT").stroke = "transparent";
                        },
                        selectionAdorned: false
                    },
                    new go.Binding("points").makeTwoWay(),
                    $(go.Shape, // the highlight shape, normally transparent
                        {
                            isPanelMain: true,
                            strokeWidth: 8,
                            stroke: "transparent",
                            name: "HIGHLIGHT"
                        }),
                    $(go.Shape, // the link path shape
                        {
                            isPanelMain: true,
                            stroke: "gray",
                            strokeWidth: 2
                        },
                        new go.Binding("stroke", "isSelected", function (sel) {
                            return sel ? "dodgerblue" : "gray";
                        }).ofObject()),
                    $(go.Shape, // the arrowhead
                        {
                            toArrow: "standard",
                            strokeWidth: 0,
                            fill: "gray"
                        }),
                    $(go.Panel, "Auto", // the link label, normally not visible
                        {
                            visible: false,
                            name: "LABEL",
                            segmentIndex: 2,
                            segmentFraction: 0.5
                        },
                        new go.Binding("visible", "visible").makeTwoWay(),
                        $(go.Shape, "RoundedRectangle", // the label shape
                            {
                                fill: "#F8F8F8",
                                strokeWidth: 0
                            }),
                        $(_TBlock, "Yes", // the label
                            {
                                textAlign: "center",
                                font: "9pt helvetica, arial, sans-serif",
                                stroke: "#333333",
                                editable: true
                            },
                            new go.Binding("text").makeTwoWay())
                    )
                );

            // temporary links used by LinkingTool and RelinkingTool are also orthogonal:
            diagram.toolManager.linkingTool.temporaryLink.routing = go.Link.Orthogonal;
            diagram.toolManager.relinkingTool.temporaryLink.routing = go.Link.Orthogonal;
        },
        geoFunc: function (geoname) {
            var geo = icons[geoname];
            if (geo === undefined) geo = icons["heart"]; // use this for an unknown icon name
            if (typeof geo === "string") {
                geo = icons[geoname] = go.Geometry.parse(geo, true); // fill each geometry
            }
            return geo;
        },
        changeCategory: function (obj) {
            var node = obj.part;
            if (node) {
                var diagram = node.diagram;
                diagram.startTransaction("changeCategory");
                var cat = diagram.model.getCategoryForNodeData(node.data);
                cat = cat + "-dropped"
                diagram.model.setCategoryForNodeData(node.data, cat);
                diagram.commitTransaction("changeCategory");
            }
        },
        uuidGen: function () {
            var dt = new Date().getTime();
            var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
                var r = (dt + Math.random() * 16) % 16 | 0;
                dt = Math.floor(dt / 16);
                return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
            });
            return uuid
        },
        makePort: (name, align, spot, output, input) => {
            var horizontal = align.equals(_SpotTop) || align.equals(_SpotBottom);
            return $(go.Shape, {
                fill: "transparent",
                strokeWidth: 0,
                width: horizontal ? NaN : 8,
                height: !horizontal ? NaN : 8,
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
        createDiagram: function (div) {
            var t = this;
            var diagram = $(go.Diagram,
                div, {
                    "LinkDrawn": t.showLinkLabel, // this DiagramEvent listener is defined below
                    "LinkRelinked": t.showLinkLabel,
                    "undoManager.isEnabled": true, // enable undo & redo
                    layout: $(go.TreeLayout, {
                        angle: (true ? 0 : 90),
                        nodeSpacing: 4
                    }),
                    initialContentAlignment: go.Spot.Left
                });
            diagram.addDiagramListener('ObjectSingleClicked', (obj) => {
                debugger
                obj.diagram.selection.each(tt => {
                    obj.diagram.startTransaction("changeCategory");
                    var cat = obj.diagram.model.getCategoryForNodeData(tt.data);
                    console.log(cat)
                    cat = cat.split('-')[0] + "-selected"
                    obj.diagram.model.setCategoryForNodeData(tt.data, cat);
                    if (obj.diagram.previousSelectionData) {
                        cat = obj.diagram.model.getCategoryForNodeData(obj.diagram.previousSelectionData)
                        cat = cat.split("-")[0] - "dropped"
                        obj.diagram.model.setCategoryForNodeData(obj.diagram.previousSelectionData, cat);
                    }
                    obj.diagram.previousSelectionData = tt.data
                    obj.diagram.commitTransaction("changeCategory");
                })
            })

            diagram.addDiagramListener('ExternalObjectsDropped', (dropedEvent) => {
                // debugger
                this.changeCategory(dropedEvent)
                const groupBy = key => array =>
                    array.reduce((objectsByKeyValue, obj) => {
                        const value = obj[key];
                        objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
                        return objectsByKeyValue;
                    }, {});

                const groupByCategory = groupBy('category');

                const findBestFoster = () => {
                    //TODO add sofistication later, now return the nearest one
                    const minDist = Math.min(...temp.map(e => e.distance))
                    return temp.find(e => e.distance == minDist)
                }

                dropedEvent.subject.each((node) => {
                    if (node.data) {
                        debugger
                        var fosters = diagram.model.nodeDataArray.filter(e => {
                                return e.key != node.data.key && node.data.loc
                            })
                            .map(aNode => aNode.loc.split(' ').map(e => parseFloat(e))
                                .map((element, i) => {
                                    return {
                                        category: aNode.category,
                                        blockId: aNode.blockId,
                                        key: aNode.key,
                                        delta: child.newP[i] - element,
                                        deltaSq: (child.newP[i] - element) * (child.newP[i] - element)
                                    }
                                })
                            )
                            .map(ex => {
                                return {
                                    category: ex[0].category,
                                    blockId: ex[0].blockId,
                                    key: ex[0].key,
                                    distance: Math.sqrt(ex[0].deltaSq + ex[1].deltaSq),
                                    gradient: ex[1].delta / ex[0].delta
                                }
                            });
                        debugger
                    }
                })
            })

            return diagram
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

        addDecisionSplit(e, obj) {
            var uuid = this.create_UUID()
            this.diaCopy.model.addNodeData({
                parent: obj.part.data.key,
                key: uuid,
                category: 'flow',
                text: "Decision split"
            })
        },

        addStyleForCustomer(diagram) {
            diagram.nodeTemplateMap.add("Customer",
                $(_Node, "Table", nStyle(),
                    $(go.Panel, "Vertical",
                        $(go.Shape, "RoundedRectangle", sStyle('#64cf84')),
                        $(_TBlock, tStyle(), new go.Binding("text").makeTwoWay())
                    ),
                    this.makePort("L", _SpotLeft, _SpotLeft, true, true),
                    // this.addContextMenu()
                ));
        },

    },
    computed: {

    }
}
</script>

<style lang="scss" scoped>
.journey-builder {}
</style>
