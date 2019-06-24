<template lang="html">
<section class="flow-source">
    <span>Splits</span>
    <div id="SplitSourceId" draggable="true" style="height:calc(80%) ;width:calc(100%);"></div>
</section>
</template>

<script lang="js">
export default {
    name: 'split-source',
    props: [],
    mounted() {

    },
    data() {
        return {
            elements: [
              {
                    name: "Random",
                    iconUri: '../../assets/RandomSplit.svg',
                    toolTip: "Decision Some tool tip text",
                    category: "Split",
                },{
                    name: "Decision",
                    iconUri: '../../assets/SecisionSplit.svg',
                    toolTip: "Decision Some tool tip text",
                    category: "Split",
                },
                {
                    name: "Engagement",
                    iconUri: '../../assets/EngagementSplit.svg',
                    toolTip: "EngagementSplit Some tool tip text2",
                    category: "Split"
                }
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
            diagram.nodeTemplateMap.add("Split", template)
            var p = $(go.Palette, "SplitSourceId")
            p.model.nodeDataArray = this.elements
            p.nodeTemplate = template
        }
    },
    computed: {

    }
}
</script>
