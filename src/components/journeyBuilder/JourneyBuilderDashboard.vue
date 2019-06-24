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
                 "class": "GraphLinksModel",
  "nodeDataArray": [ 
{"name":"Events", "iconUri":"../../assets/AddContact.svg", "toolTip":"Some tool tip text2", "category":"sourcePalette", "key":-2, "loc":"30.00000000000003 101.49619140625003"},
{"name":"Decision\nSplit", "iconUri":"../../assets/SecisionSplit.svg", "toolTip":"Decision\nSplit Some tool tip text", "category":"Flow", "key":-3, "loc":"143.00781250000006 101.49619140625012"},
{"name":"WhatsApp", "iconUri":"../../assets/SendSMS.svg", "toolTip":"Some tool tip text2", "category":"MessagingPalette", "key":-4, "loc":"263.67871093750006 66.99746093750002"},
{"name":"Sms", "iconUri":"../../assets/SendSMS.svg", "toolTip":"Some tool tip text2", "category":"MessagingPalette", "key":-5, "loc":"256.0156250000001 135.994921875"},
{"name":"EngagementSplit", "iconUri":"../../assets/EngagementSplit.svg", "toolTip":"EngagementSplit Some tool tip text2", "category":"Flow", "key":-6, "loc":"408.34667968749994 66.99746093750002"},
{"name":"Email", "iconUri":"../../assets/SendEmail.svg", "toolTip":"Some tool tip text", "category":"MessagingPalette", "key":-1, "loc":"545.3515625 32.49873046875"},
{"name":"WhatsApp", "iconUri":"../../assets/SendSMS.svg", "toolTip":"Some tool tip text2", "category":"MessagingPalette", "key":-7, "loc":"553.0146484375 101.49619140624986"}
 ],
  "linkDataArray": [ 
{"from":-2, "to":-3, "points":[60,101.49619140625,70,101.49619140625,85,101.49619140625,85,101.49619140625,100,101.49619140625,110,101.49619140625]},
{"from":-3, "to":-4, "points":[176.015625,101.49619140625,186.015625,101.49619140625,201.015625,101.49619140625,201.015625,66.99746093750001,216.015625,66.99746093750001,226.015625,66.99746093750001]},
{"from":-3, "to":-5, "points":[176.015625,101.49619140625,186.015625,101.49619140625,201.015625,101.49619140625,201.015625,135.994921875,216.015625,135.994921875,226.015625,135.994921875]},
{"from":-4, "to":-6, "points":[301.341796875,66.99746093750001,311.341796875,66.99746093750001,326.341796875,66.99746093750001,326.341796875,66.99746093750001,341.341796875,66.99746093750001,351.341796875,66.99746093750001]},
{"from":-6, "to":-1, "points":[465.3515625,66.99746093750001,475.3515625,66.99746093750001,490.3515625,66.99746093750001,490.3515625,32.49873046875,505.3515625,32.49873046875,515.3515625,32.49873046875]},
{"from":-6, "to":-7, "points":[465.3515625,66.99746093750001,475.3515625,66.99746093750001,490.3515625,66.99746093750001,490.3515625,101.49619140624999,505.3515625,101.49619140624999,515.3515625,101.49619140624999]}
 ]
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
