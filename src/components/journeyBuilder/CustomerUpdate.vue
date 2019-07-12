<template lang="html">
<section class="customer-update">
    <span>Customer update</span>
    <div id="CustomerId" draggable="true" style="height:calc(80%);width:calc(100%);"></div>
</section>
</template>

<script lang="js">
export default {
  name: 'customer-update',
  props: [],
  mounted () {

  },
  data () {
    return {
      elements: [{
        name: 'Customer',
        iconUri: '../../assets/AddContact.svg',
        toolTip: 'Some tool tip text',
        category: 'customerPalette'
      }

      ]
    }
  },
  methods: {
    addTemplates (diagram) {
      this.paletteTemplate(diagram)
    },

    nodeStyle () {
      return [
        new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
        {
          locationSpot: go.Spot.Center
        }
      ]
    },
    paletteTemplate (diagram) {
      var makePort = this.$parent.makePort
      var go = this.go
      var colors = this.colors
      var $ = go.GraphObject.make
      var template =
                $(go.Node, 'Table', this.nodeStyle(),
                  $(go.Panel, go.Panel.Spot, // or "Spot"
                    $(go.Shape, 'Circle', {
                      minSize: new go.Size(40, 40),
                      maxSize: new go.Size(40, 40),
                      fill: 'green',
                      alignment: new go.Spot(0.5, 0.5)
                    }),
                    $(go.Picture, {
                      alignment: new go.Spot(0.5, 0.5),
                      desiredSize: new go.Size(60, 60)
                    }, new go.Binding('source', 'iconUri')),
                    $(go.TextBlock, {
                      alignment: new go.Spot(0.5, 1, 0, 10),
                      margin: 8,
                      stroke: 'gray',
                      font: 'bold 12px sans-serif'
                    },
                    new go.Binding('text', 'name')),
                    makePort('L', go.Spot.Left, go.Spot.Left, true, false),
                    makePort('R', go.Spot.Right, go.Spot.Right, true, false), {
                      toolTip: $('ToolTip', {
                        'Border.stroke': 'gray',
                        'Border.strokeWidth': 2
                      },
                      $(go.TextBlock, {
                        margin: 8,
                        stroke: 'gray',
                        font: 'bold 16px sans-serif'
                      },
                      new go.Binding('text', 'toolTip')))
                    }
                  )
                )
      diagram.nodeTemplateMap.add('customerPalette', template)
      var p = $(go.Palette, 'CustomerId')
      p.model.nodeDataArray = this.elements
      p.nodeTemplate = template
    }
  },
  computed: {

  }
}
</script>

<style lang="scss" scoped>
.customer-update {}
</style>
