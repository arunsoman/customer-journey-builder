<template lang="html">
<section class="messaging-source">
    <span>Message Source</span>
    <div id="MessagingSourceId" draggable="true" style="height:calc(80%);width:calc(100%);"></div>
</section>
</template>

<script lang="js">
export default {
    name: 'messaging-source',
    props: [],
    mounted() {

    },
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
                    name: "Email",
                    iconUri: '../../assets/SendEmail.svg',
                    toolTip: "Some tool tip text",
                    category: "MessagingPalette",
                },
                {
                    name: "Sms",
                    iconUri: '../../assets/SendSMS.svg',
                    toolTip: "Some tool tip text2",
                    category: "MessagingPalette"
                },
                {
                    name: "WhatsApp",
                    iconUri: '../../assets/SendSMS.svg',
                    toolTip: "Some tool tip text2",
                    category: "MessagingPalette"
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
                        $(go.Shape, "Square", {
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
                                alignment: new go.Spot(0.5, 1),
                                margin: 8,
                                stroke: "gray",
                                font: "bold 12px sans-serif"
                            },
                            new go.Binding("text", "name")),
                        makePort("L", go.Spot.Left, go.Spot.Left, false, true),
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
            diagram.nodeTemplateMap.add("MessagingPalette", template)
            var p = $(go.Palette, "MessagingSourceId")
            p.model.nodeDataArray = this.elements
            p.nodeTemplate = template
        }
    },
    computed: {

    }
}
</script>

<style lang="scss" scoped>
.messaging-source {}
</style>
