<template lang="html">
<div style="height:calc(100%);width:calc(100%);">
    <v-layout align-center justify-start row fill-height>
        <v-flex sm2>
            <v-layout align-center justify-start column fill-height>
                <div id="paletteDiv" style="height:800px; width:calc(100%); border: 1px solid gray;" />

            </v-layout>
        </v-flex>

        <v-flex sm8 ml-3 mt-2>
            <v-layout align-center justify-start row fill-height>
                <v-flex sm8>
                    <v-text-field label="Name your workflow" v-model='name'></v-text-field>
                </v-flex>
                <v-flex sm4>
                    <v-btn flat color="teal" @click="save">save</v-btn>
                    <v-btn flat color="teal" @click="discard">discard</v-btn>
                </v-flex>
            </v-layout>
            <div id="goDiaDiv" style="height:800px; width:calc(100%); border: 1px solid gray;" />
        </v-flex>

    </v-layout>

    <ConversationUnit ref='conversationUnitRef' />

</div>
</template>

<script>

import GoJSHelper from './gojs/GoJSHelper'
import ConversationUnit from './ConversationUnit'

export default {
  name: 'conversation-builder',
  props: ['config'],
  components: {
    ConversationUnit
  },
  mounted () {
    const cuRef = this.$refs.conversationUnitRef
    this.meta = new GoJSHelper('goDiaDiv', 'paletteDiv', (a, b) => {
      cuRef.dialog = true
      cuRef.displayType = a
      cuRef.setData(b, this.meta)
    })
  },
  data () {
    return {
      meta: undefined,
      name: ''
    }
  },
  methods: {
    elementClicked (ele) {},
    reload () {
      this.meta.diagram.model = go.Model.fromJson(document.getElementById('mySavedModel').value)
    },
    save () {
      var jStr = this.meta.diagram.model.toJson()
      debugger
    },
    discard () {
      debugger
      console.log('go back to list, needs to be implemented')
    }

  }

}
</script>

<style lang="scss" scoped>
.draggable {
    display: inline-block;
    vertical-align: top;
    border: 4px solid #BBB;
    border-radius: 4px;
    background-color: #F5F5F5;
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 500;

}

.handle {
    background-color: lightblue;
    cursor: move;
    text-align: center;
    font: bold 12px sans-serif;
}

#infoDraggable {
    font: 12px helvetica, sans-serif;
    min-width: 213px;
}

#myInfo {
    width: 100%;
    overflow: hidden;
}

#myPaletteDiv {
    background-color: #F5F5F5;
    width: 100%;
    height: 100%;
}

#paletteContainer {
    position: absolute;
    bottom: 14px;
    left: 0px;
    right: 0px;
    top: 14px;
}
</style>
