<template lang="html">
<section class="entry-source">
    <span>Entry Source</span>
    <div id="EntrySourceID" draggable="true" style="height:calc(80%);width:calc(100%);"></div>
</section>
</template>

<script src="../../../node_modules/gojs/extensions/figures.js"></script><script lang="js">
export default {
    name: 'entry-source',
    props: ['diagram'],

    data() {
        return {
            colors: {
                blue: "#00B5CB",
                orange: "#F47321",
                green: "#C8DA2B",
                gray: "#888",
                white: "#F5F5F5"
            },
            elements: [{
                    name: "Contacts",
                    iconUri: '../../assets/AddContact.svg',
                    toolTip: "Some tool tip text",
                    category: "sourcePalette",
                    toggleCategory: 'ContactsExpanded'
                },
                {
                    name: "Events",
                    iconUri: '../../assets/AddContact.svg',
                    toolTip: "Some tool tip text2",
                    category: "sourcePalette",
                    toggleCategory: 'ContactsExpanded'
                },
            ]
        }
    },
    methods: {

        addTemplates(diagram) {
        this.expandedTemplate(diagram)
            this.paletteTemplate(diagram)
        },

        nodeStyle() {
            return [
                new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
                {
                    locationSpot: go.Spot.Center
                }
            ];
        },
        paletteTemplate(diagram) {
          var contextMenu = this.$parent.addContextMenu()
            var makePort = this.$parent.makePort
            var go = this.go
            var colors = this.colors
            var $ = go.GraphObject.make;
            var template =
                $(go.Node, "Table", this.nodeStyle(),
                    $(go.Panel, go.Panel.Spot, // or "Spot"
                        $(go.Shape, "Circle", {
                            minSize: new go.Size(40, 40),
                            maxSize: new go.Size(40, 40),
                            fill: "green",
                            alignment: new go.Spot(0.5, 0.5)
                        }),
                        $(go.Picture, {
                            alignment: new go.Spot(0.5, 0.5),
                            desiredSize: new go.Size(60, 60),
                        }, new go.Binding("source", "iconUri")),
                        $(go.TextBlock, {
                                alignment: new go.Spot(0.5, 1, 0, 10),
                                margin: 8,
                                stroke: "gray",
                                font: "bold 12px sans-serif"
                            },
                            new go.Binding("text", "name")),
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
                    ),contextMenu
                )
            diagram.nodeTemplateMap.add("sourcePalette", template)
            var p = $(go.Palette, "EntrySourceID")
            p.model.nodeDataArray = this.elements
            p.nodeTemplate = template
        },
        expandedTemplate(diagram) {
          var contextMenu = this.$parent.addContextMenu()
            var makePort = this.$parent.makePort
            var go = this.go
            var colors = this.colors
            var $ = go.GraphObject.make;
            var template =
                $(go.Node, "Table", this.nodeStyle(),
                    $(go.Panel, go.Panel.Spot, // or "Spot"
                        $(go.Shape, "Rectangle", {
                            minSize: new go.Size(80, 80),
                            maxSize: new go.Size(20, 20),
                            fill: "green",
                            alignment: new go.Spot(0.5, 0.5)
                        }),
                        $(go.Shape, "Circle", {
                            minSize: new go.Size(10, 10),
                            maxSize: new go.Size(20, 20),
                            fill: "green",
                            alignment: new go.Spot(0.5, 0.5)
                        }),
                        $(go.Picture, {
                            alignment: new go.Spot(0.5, 0.5),
                            desiredSize: new go.Size(60, 60),
                        }, new go.Binding("source", "iconUri")),
                        $(go.TextBlock, {
                                alignment: new go.Spot(0.5, 1),
                                margin: 8,
                                stroke: "gray",
                                font: "bold 12px sans-serif"
                            },
                            new go.Binding("text", "name")),
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
                    ),contextMenu
                )
            diagram.nodeTemplateMap.add("ContactsExpanded", template)
        }
    },
    computed: {

    }
}
</script>

<style lang="scss" scoped>
.entry-source {}
</style>
