<template lang="html">
<section class="conversation-unit">
    <v-container>
       <v-card>
        <v-layout row wrap>
         
            <v-flex xs12>
                <v-text-field v-model="prompt" label="Prompt"></v-text-field>
            </v-flex>
            <v-flex xs12>
                <v-text-field v-model="reprompt" label="Reprompt"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
                <v-text-field v-model="options" label="Options , seperated"></v-text-field>
            </v-flex>
            <v-flex xs12 sm6>
                <v-text-field v-model="validation" label="validation regex"></v-text-field>
            </v-flex>
            <v-flex xs12 sm4>
                <p>Expected return type</p>
                <v-overflow-btn :items="dataType" label="Overflow Btn" v-model='selectedDataType'></v-overflow-btn>
            </v-flex>
        </v-layout>
        <v-btn save @click="$emit('saved')">save</v-btn>
        </v-card>
    </v-container>
</section>
</template>

<script lang="js">
export default {
    name: 'conversation-unit',
    props: ['config'],
    mounted() {
        if (this.config) {
            this.prompt = this.config.prompt
            this.reprompt = this.config.reprompt
            this.options = this.config.options
            this.validation = this.config.validation
        }

    },
    data() {
        return {
            prompt: '',
            reprompt: '',
            options: '',
            validation: '',
            selectedDataType: '',
            dataType: ["location", "state", "city", "country", "age", "gender", "Add more"]
        }
    },
    methods: {
      getDataObj(){
        debugger
        return {
          prompt: this.prompt,
            reprompt: this.reprompt,
            options: this.options,
            validation: this.validation,
            selectedDataType: this.selectedDataType
        }
      }
    },
    computed: {

    }
}
</script>

<style lang="scss" scoped>
.conversation-unit {}
</style>
