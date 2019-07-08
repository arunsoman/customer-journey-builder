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

    <ConversationUnit v-if="diagram" />

</div>
</template>

<script>
import TemplateModel from './js/TemplateModel';
import GoJSHelper from './js/GoJSHelper';
import ConversationUnit from './ConversationUnit';
import {
    debuglog
} from 'util';

export default {
    name: 'conversation-builder',
    props: ['config'],
    components: {
        ConversationUnit
    },
    mounted() {
        this.diagram = new GoJSHelper("goDiaDiv")
        var tm = new TemplateModel(this.diagram, "paletteDiv")
    },
    data() {
        return {
            diagram: undefined,
            name: "",
        }
    },
    methods: {

        reload() {
            this.diagram.model = go.Model.fromJson(document.getElementById("mySavedModel").value);
        },
        save() {
            var jStr = this.diagram.model.toJson()
            debugger
        },
        discard() {
            debugger
            console.log("go back to list, needs to be implemented")
        },

    },
    watch: {
        config: (v) => {
            this.name = v.name
            this.diagram.model.fromJson(v.json)
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
