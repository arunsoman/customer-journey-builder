<template lang="html">
<section class="entry-source">
    <span>Entry Source</span>
    <div id="EntrySourceID" draggable="true" style="height:calc(100%);width:calc(100%);"></div>
</section>
</template>

<script src="../../../node_modules/gojs/extensions/figures.js"></script>
<script lang="js">
var $ = go.GraphObject.make;
var _TBlock = go.TextBlock;
var _SpotLeft = go.Spot.Left;
var _SpotTop = go.Spot.Top;
var _SpotRight = go.Spot.Right;
var _SpotBottom = go.Spot.Bottom;
var _Node = go.Node;
var myIcons = [{
    name: "add"
}];
const nStyle = () => {
    return [
        new go.Binding("location", "loc", go.Point.parse).makeTwoWay(go.Point.stringify),
        {
            locationSpot: go.Spot.Center
        }
    ];
}
const sStyle = (color) => {
    var stroke = () => {
        var c = color.split('#');
        return c[0] + (c[1] - 50)
    }

    return {
        fill: color,
        strokeWidth: 0,
        stroke: stroke(),
        maxSize: new go.Size(80, 80),

        mouseDragEnter: function (event, oldObj, newObj) {
            console.log("mouse drag enter")
        }
    }
}
const tStyle = () => {
    return {
        margin: 2,
        font: '9pt helvetica, arial, sans-serif',
        maxSize: new go.Size(80, 80),
        wrap: _TBlock.WrapFit,
        editable: true,
        stroke: "black"
    }
}

export default {
    name: 'entry-source',
        props: ['diagram'],
    created() {
        var toolTip =
            $("ToolTip",
                $(go.TextBlock, {
                        margin: 4
                    },
                    new go.Binding("text", "toolTip"))
            )
        var textBlock = () => $(go.TextBlock, new go.Binding("text").makeTwoWay(), {
            stroke: "gray"
        })

        var simpleMap = $(go.Part, "Spot",
            $(go.Shape, "Circle", {
                alignment: go.Spot.Center,
                fill: 'green',
                strokeWidth: 0,
                maxSize: new go.Size(80, 80)
            }),

            $(go.Shape, {
                alignment: go.Spot.Center,
                maxSize: new go.Size(70, 70),
                geometryString: "M33.4,11.3H16.6c-3.1,0-5.6,2.5-5.6,5.6v16.7c0,3.1,2.5,5.6,5.6,5.6h16.7c3.1,0,5.6-2.5,5.6-5.6V16.8 C39,13.8,36.5,11.3,33.4,11.3z M36.2,32.2c0,2.3-1.9,4.2-4.2,4.2h-4.2H32c-5.5,0.1-2.2,0-5.6,0h-2.8c-3.4,0,0.8,0.1-5.6,0 c-2.3,0-4.2-1.9-4.2-4.2v-14c0-2.3,1.9-4.2,4.2-4.2h14c2.3,0,4.2,1.9,4.2,4.2L36.2,32.2L36.2,32.2z M29.2,21.7 c0-2.7-1.9-4.9-4.2-4.9c-2.3,0-4.2,2.2-4.2,4.9c0,2.7,1.9,4.9,4.2,4.9C27.3,26.6,29.2,24.4,29.2,21.7z M25,33.6V28 c0,0,1.6,0,2.7,0c0.1,0,0-1,0.1-1.1c-0.6-0.2-1.3-0.3-2-0.3H25h-0.8c-3.4,0-6.2,2.5-6.2,5.6v4.2h9.8v-2.8L25,33.6L25,33.6z M29.2,27.6L29.2,27.6c0,0.2,0,0.4,0,0.4v1.4h-2.8v2.8h2.8V35H32v-1.4c0,0,0.1-0.6,0-1.4h2.8v-2.8H32v-2.8l-2.8,0V27.6 c-0.2-0.2-0.4-0.3-0.6-0.4C28.8,27.3,29.1,27.5,29.2,27.6C29.2,27.5,29.2,27.6,29.2,27.6L29.2,27.6z M27.8,26.9 C27.8,26.9,27.8,26.9,27.8,26.9c0.2,0.1,0.5,0.2,0.7,0.3C28.4,27.1,28.1,27,27.8,26.9z"
            }),
            $(_TBlock, tStyle(),
                new go.Binding("text").makeTwoWay(),
                new go.Binding("parent").makeTwoWay(),
                new go.Binding("key").makeTwoWay(), {
                    alignment: new go.Spot(.5, 1, 0, 10),
                }
            ), {
                toolTip: toolTip
            }
        );

        //palette.nodeTemplate = $(go.Panel, "Vertical", $(go.Panel, "Auto", circle, icon), textBlock,{ toolTip: toolTip})

        var makePort = this.$parent.makePort
        var EntrySourceDropped = $(go.Part, "Spot",
            new go.Binding("location", "loc", go.Point.parse),
            $(go.Shape, "Circle", {
                alignment: go.Spot.Center,
                fill: 'green',
                strokeWidth: 0,
                maxSize: new go.Size(80, 80)
            }),
            $(go.Shape, "Square", {
                alignment: go.Spot.Top,
                fill: 'red',
                strokeWidth: 0,
                maxSize: new go.Size(10, 10)
            }),
            $(go.Shape, {
                alignment: go.Spot.Center,
                maxSize: new go.Size(70, 70),
                geometryString: "M33.4,11.3H16.6c-3.1,0-5.6,2.5-5.6,5.6v16.7c0,3.1,2.5,5.6,5.6,5.6h16.7c3.1,0,5.6-2.5,5.6-5.6V16.8 C39,13.8,36.5,11.3,33.4,11.3z M36.2,32.2c0,2.3-1.9,4.2-4.2,4.2h-4.2H32c-5.5,0.1-2.2,0-5.6,0h-2.8c-3.4,0,0.8,0.1-5.6,0 c-2.3,0-4.2-1.9-4.2-4.2v-14c0-2.3,1.9-4.2,4.2-4.2h14c2.3,0,4.2,1.9,4.2,4.2L36.2,32.2L36.2,32.2z M29.2,21.7 c0-2.7-1.9-4.9-4.2-4.9c-2.3,0-4.2,2.2-4.2,4.9c0,2.7,1.9,4.9,4.2,4.9C27.3,26.6,29.2,24.4,29.2,21.7z M25,33.6V28 c0,0,1.6,0,2.7,0c0.1,0,0-1,0.1-1.1c-0.6-0.2-1.3-0.3-2-0.3H25h-0.8c-3.4,0-6.2,2.5-6.2,5.6v4.2h9.8v-2.8L25,33.6L25,33.6z M29.2,27.6L29.2,27.6c0,0.2,0,0.4,0,0.4v1.4h-2.8v2.8h2.8V35H32v-1.4c0,0,0.1-0.6,0-1.4h2.8v-2.8H32v-2.8l-2.8,0V27.6 c-0.2-0.2-0.4-0.3-0.6-0.4C28.8,27.3,29.1,27.5,29.2,27.6C29.2,27.5,29.2,27.6,29.2,27.6L29.2,27.6z M27.8,26.9 C27.8,26.9,27.8,26.9,27.8,26.9c0.2,0.1,0.5,0.2,0.7,0.3C28.4,27.1,28.1,27,27.8,26.9z"
            }),
            $(_TBlock, tStyle(),
                new go.Binding("text").makeTwoWay(),
                new go.Binding("parent").makeTwoWay(),
                new go.Binding("key").makeTwoWay(), {
                    alignment: go.Spot.BottomCenter,
                }
            ),

            makePort("T", _SpotTop, _SpotTop, true, true),
            makePort("R", _SpotRight, _SpotRight, true, true),
            makePort("B", _SpotBottom, _SpotBottom, true, true),
            {
                toolTip: toolTip
            }
        );

        var selected = $(go.Part, "Spot",
            new go.Binding("location", "loc", go.Point.parse),
            $(go.Shape, "Circle", {
                alignment: go.Spot.Center,
                fill: 'red',
                strokeWidth: 0,
                maxSize: new go.Size(200, 200)
            }),
            $(go.Shape, "Circle", {
                alignment: go.Spot.Center,
                fill: 'green',
                strokeWidth: 0,
                maxSize: new go.Size(80, 80)
            }),
            $(go.Shape, "Square", {
                alignment: go.Spot.Top,
                fill: 'red',
                strokeWidth: 0,
                maxSize: new go.Size(10, 10)
            }),
            $(go.Shape, {
                alignment: go.Spot.Center,
                maxSize: new go.Size(70, 70),
                geometryString: "M33.4,11.3H16.6c-3.1,0-5.6,2.5-5.6,5.6v16.7c0,3.1,2.5,5.6,5.6,5.6h16.7c3.1,0,5.6-2.5,5.6-5.6V16.8 C39,13.8,36.5,11.3,33.4,11.3z M36.2,32.2c0,2.3-1.9,4.2-4.2,4.2h-4.2H32c-5.5,0.1-2.2,0-5.6,0h-2.8c-3.4,0,0.8,0.1-5.6,0 c-2.3,0-4.2-1.9-4.2-4.2v-14c0-2.3,1.9-4.2,4.2-4.2h14c2.3,0,4.2,1.9,4.2,4.2L36.2,32.2L36.2,32.2z M29.2,21.7 c0-2.7-1.9-4.9-4.2-4.9c-2.3,0-4.2,2.2-4.2,4.9c0,2.7,1.9,4.9,4.2,4.9C27.3,26.6,29.2,24.4,29.2,21.7z M25,33.6V28 c0,0,1.6,0,2.7,0c0.1,0,0-1,0.1-1.1c-0.6-0.2-1.3-0.3-2-0.3H25h-0.8c-3.4,0-6.2,2.5-6.2,5.6v4.2h9.8v-2.8L25,33.6L25,33.6z M29.2,27.6L29.2,27.6c0,0.2,0,0.4,0,0.4v1.4h-2.8v2.8h2.8V35H32v-1.4c0,0,0.1-0.6,0-1.4h2.8v-2.8H32v-2.8l-2.8,0V27.6 c-0.2-0.2-0.4-0.3-0.6-0.4C28.8,27.3,29.1,27.5,29.2,27.6C29.2,27.5,29.2,27.6,29.2,27.6L29.2,27.6z M27.8,26.9 C27.8,26.9,27.8,26.9,27.8,26.9c0.2,0.1,0.5,0.2,0.7,0.3C28.4,27.1,28.1,27,27.8,26.9z"
            }),
            $(_TBlock, tStyle(),
                new go.Binding("text").makeTwoWay(),
                new go.Binding("parent").makeTwoWay(),
                new go.Binding("key").makeTwoWay(), {
                    alignment: go.Spot.BottomCenter,
                }
            ),

            makePort("T", _SpotTop, _SpotTop, true, true),
            makePort("R", _SpotRight, _SpotRight, true, true),
            makePort("B", _SpotBottom, _SpotBottom, true, true),
            {
                toolTip: toolTip
            }
        );
        var templmap = new go.Map();
        templmap.add("EntrySource", simpleMap)
        templmap.add("EntrySource-simple", simpleMap)
        templmap.add("EntrySource-dropped", EntrySourceDropped)
        templmap.add("EntrySource-selected", selected)

        this.templateMap = templmap;
        console.log("templates done")
    },
    mounted() {
        var palette = $(go.Palette, 'EntrySourceID');

        palette.nodeTemplate = this.templateMap.get("EntrySource")
        palette.model.nodeDataArray = this.contents.map(e => {
            return {

                blockId: e.blockId,
                text: e.text,
                toolTip: e.title,
                category: "EntrySource"
            }
        });

    },
    data() {
        return {
            templateMap: {},
            contents: [{
                group: 'entrySource',
                blockId: "Audience",
                text: "Audience",
                colour: "green",
                icon: "home",
                title: "Audience management config"
            }, {
                colour: "green",
                blockId: "Events",
                group: 'entrySource',
                text: "Events",
                icon: "camera",
                title: "Audience management config"
            }, {
                colour: "green",
                blockId: "Exit",
                icon: "pacman",
                group: 'entrySource',
                text: "Exit",
                title: "Exit config",
                parent: ['Sms', 'WhatsApp', 'Email']
            }],
            colors: {
                blue: "#00B5CB",
                orange: "#F47321",
                green: "#C8DA2B",
                gray: "#888",
                white: "#F5F5F5"
            }

        }
    },
    methods: {
        attachTemplate: function (diagram) {
            this.templateMap.each(e => {
                diagram.nodeTemplateMap.add(e.key, e.value)
            })

        }
    },
    computed: {

    }
}
</script>

<style lang="scss" scoped>
.entry-source {}
</style>
