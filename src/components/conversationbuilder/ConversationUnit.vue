<template lang="html">
<v-dialog v-model="dialog">
    <section class="conversation-unit">
        <v-container>
            <v-card>
                <v-card-text>
                    <WelcomeUnit ref="welcomeUnitRef" v-show="displayType === 'welcome'"></WelcomeUnit>
                </v-card-text>
                <v-card-actions>
                    <v-btn save @click="save">Update</v-btn>
                    <v-btn cancel @click="dialog = false">cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
    </section>
</v-dialog>
</template>

<script lang="js">
import WelcomeUnit from "./view/WelcomeUnit";
import go from '../../../node_modules/gojs/release/go-debug'
import CanvasDataModel from "./js/CanvasDataModel";

export default {
    name: 'conversation-unit',
    components: {
        WelcomeUnit
    },
    mounted() {
        const h = this;
        this.canvasDataModel = new CanvasDataModel(this)
       
    },
    data() {
        return {
           
            dialog: false,
            selectedComponent: {},
            canvasDataModel: {},
            displayType: '',
        }
    },
    methods: {
        populateData(vueData){
            console.log("implement this")
            this.displayType = vueData.category
            if(this.displayType = 'welcome'){
                this.selectedComponent = this.$refs.welcomeUnitRef
                this.$refs.welcomeUnitRef.update(vueData)
            }
            this.dialog = true
        },
        save(){
            const result = this.selectedComponent.getModifiedData()
            console.log(result)
            this.canvasDataModel.updateModel(result)
            this.dialog = false
        }
    },
    computed: {

    }
}
</script>

<style lang="scss" scoped>
.conversation-unit {}
</style>
