<template lang="html">
<section class="journey-builder-dashboard">
    <v-layout v-if="list" align-center justify-start row wrap fill-height>
        <v-flex sm12>
            <v-flex sm4>
                <v-layout align-center justify-start row fill-height>
                    <v-text-field class="mx-3" flat label="Search" prepend-inner-icon="search" solo-inverted></v-text-field>
                    <v-btn flat color="teal" @click="add">Add new</v-btn>
                </v-layout>
            </v-flex>
        </v-flex>
        <v-flex sm6 v-for="(report ,i) in reports" style=" border: 1px solid gray;">
            <v-layout align-center justify-start row fill-height>
                <span>Name</span>
                <v-btn flat color="teal" @click="edit(report)">Edit</v-btn>
            </v-layout>
            <JourneyBuilderView :config="view"></JourneyBuilderView>

        </v-flex>
    </v-layout>
    <JourneyBuilder :config="props" @cancel="handleCancel" v-if="!list"></JourneyBuilder>
    
</section>
</template>

<script lang="js">

import JourneyBuilderView from './JourneyBuilderView'
import JourneyBuilder from './JourneyBuilder'
export default {
    name: 'journey-builder-dashboard',
    props: [],
    components: {
        JourneyBuilderView,
        JourneyBuilder,
    },
    mounted() {
      if(this.config)
      this.name = this.config.name
    },
    data() {
        return {
            list: true,
            props: {},
            name:"",
            reports: [{
                    name: 'one'
                },
                {
                    name: 'Two'
                },
                {
                    name: 'Three'
                }
            ],
            view:{
                "class": "go.GraphLinksModel",
                "nodeDataArray": [{
                        "key": "Audience",
                        "text": "Audience",
                        "color": "#9d75c2"
                    },
                    {
                        "key": "sms1",
                        "text": "sms\nThank you..",
                        "color": "#9d75c2"
                    },
                    {
                        "key": "sms11",
                        "text": "sms\n5 things",
                        "color": "#9d75c2"
                    },
                    {
                        "key": "sms12",
                        "text": "sms\nthings &\n download",
                        "color": "#a1e194"
                    },
                    {
                        "key": "sms111",
                        "text": "sms\nPack your bags",
                        "color": "#a1e194"
                    },

                    {
                        "key": "email1",
                        "text": "email\nThank you..",
                        "color": "#9d75c2"
                    },
                    {
                        "key": "email21",
                        "text": "email\n5 things",
                        "color": "#9d75c2"
                    },
                    {
                        "key": "email22",
                        "text": "email\nthings &\n download",
                        "color": "#a1e194"
                    },
                    {
                        "key": "email211",
                        "text": "email\nPack your bags",
                        "color": "#a1e194"
                    },

                    {
                        "key": "dropped",
                        "text": "dropped"
                    }
                ],
                "linkDataArray": [{
                        "from": "Audience",
                        "to": "sms1",
                        "width": 31
                    },
                    {
                        "from": "sms1",
                        "to": "sms11",
                        "width": 10
                    },
                    {
                        "from": "sms1",
                        "to": "sms12",
                        "width": 11
                    },
                    {
                        "from": "sms1",
                        "to": "dropped",
                        "width": 10
                    },
                    {
                        "from": "sms11",
                        "to": "sms111",
                        "width": 21
                    },
                    {
                        "from": "sms12",
                        "to": "sms111",
                        "width": 21
                    },
                    {
                        "from": "sms12",
                        "to": "dropped",
                        "width": 1
                    },
                    {
                        "from": "sms11",
                        "to": "dropped",
                        "width": 1
                    },

                    {
                        "from": "Audience",
                        "to": "email1",
                        "width": 86
                    },
                    {
                        "from": "email1",
                        "to": "email21",
                        "width": 30
                    },
                    {
                        "from": "email1",
                        "to": "dropped",
                        "width": 40
                    },
                    {
                        "from": "email1",
                        "to": "email22",
                        "width": 21
                    },
                    {
                        "from": "email21",
                        "to": "email211",
                        "width": 21
                    },
                    {
                        "from": "email22",
                        "to": "email211",
                        "width": 21
                    },

                ]
            },
            sample: {
                "class": "go.TreeModel",
                "linkFromPortIdProperty": "fromPort",
                "linkToPortIdProperty": "toPort",
                "nodeDataArray": [{
                        "category": "EntrySource",
                        'blockId': "Audience",
                        "text": "Audience List",
                        "key": -13,
                    },
                    {
                        "key": -1,
                        'blockId': "Decision split",
                        "parent": -13,
                        "category": "Flow",
                        "text": "Decision split"
                    },
                    {
                        'blockId': "Sms",
                        "category": "Activity",
                        "key": 0,
                        "parent": -1,
                        "text": "Thank you...."
                    },
                    {
                        'blockId': "Email",
                        "category": "Activity",
                        "key": 10,
                        "parent": -1,
                        "text": "Thank you...."
                    },
                    {
                        'blockId': "Wait",
                        "category": "Flow",
                        "key": -19,
                        "parent": 0,
                        "text": "3 Weeks"
                    },

                ],

            }
        }
    },
    methods: {
        handleCancel() {
            this.list = true
        },
        add() {
            this.list = false
            this.props = undefined
        },
        edit(report){
          this.list = false
          //TODO clean this mess
          this.props.name = "Hardcoded name"
          this.props.data = this.sample
          this.props.active = true
        }
    },
    computed: {

    }
}
</script>

<style lang="scss" scoped>
.journey-builder-dashboard {}
</style>
