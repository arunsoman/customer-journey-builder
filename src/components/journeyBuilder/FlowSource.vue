<template lang="html">
<section class="flow-source">
    <span>Flow</span>
    <div id="FlowSourceID" draggable="true" style="height:calc(80%) ;width:calc(100%);"></div>
</section>
</template>

<script lang="js">
export default {
    name: 'flow-source',
    props: [],
    mounted() {

    },
    data() {
        return {
            elements: [
              {
                    name: "Random\nSplit",
                    iconUri: '../../assets/RandomSplit.svg',
                    toolTip: "Decision\nSplit Some tool tip text",
                    category: "Flow",
                },{
                    name: "Decision\nSplit",
                    iconUri: '../../assets/SecisionSplit.svg',
                    toolTip: "Decision\nSplit Some tool tip text",
                    category: "Flow",
                },
                {
                    name: "EngagementSplit",
                    iconUri: '../../assets/EngagementSplit.svg',
                    toolTip: "EngagementSplit Some tool tip text2",
                    category: "Flow"
                },
                {
                    name: "Join",
                    iconUri: '../../assets/Join.svg',
                    toolTip: "Join Some tool tip text2",
                    category: "Flow"
                },
                {
                    name: "Wait",
                    iconUri: '../../assets/Wait.svg',
                    toolTip: "Wait Some tool tip text2",
                    category: "Flow"
                },
                {
                    name: "Wait Until",
                    iconUri: '../../assets/WaitUntil.svg',
                    toolTip: "Wait Until Some tool tip text2",
                    category: "Flow"
                },
            ]
        }
    },
    methods: {
        addTemplates(diagram) {
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
                    )
                )
            diagram.nodeTemplateMap.add("Flow", template)
            var p = $(go.Palette, "FlowSourceID")
            p.model.nodeDataArray = this.elements
            p.nodeTemplate = template
        }
    },
    computed: {

    }
}
</script>

<style lang="scss" scoped>
.flow-source {}
</style>
