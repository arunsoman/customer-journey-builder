<template lang="html">

  <section class="capabilities-v">
    <v-layout row wrap>
        <v-flex xs12 sm6 md3>
            <v-text-field :label="config.help" v-model="config.prompt"></v-text-field>
        </v-flex>
    </v-layout>
     <v-layout row wrap>
        <v-flex xs12 sm6 md3>
            <v-text-field label="re prompt" v-model="config.rePrompt"></v-text-field>
        </v-flex>
    </v-layout>
    <v-layout row wrap>
        <v-flex xs12 sm6 md3>
            <v-text-field label="Enter comma seperated text" v-model="config.capabilities"></v-text-field>
        </v-flex>
    </v-layout>
  </section>

</template>

<script lang="js">
export default {
  name: 'capabilities-v',
  props: ['pData'],
  mounted () {
    this.config = this.pData
    this.config.capabilities = this.getList()//to be implemented
  },
  data () {
    return {
      config: {}
    }
  },
  methods: {
    updateData (data) {
      this.config = data
    },
    modifiedData () {
      return {
        prompt: this.config.prompt,
        rePrompt: this.config.rePrompt,
        capabiltiesArray: [ { 'portColor': '#7d4bd6', 'portId': 'left0' }, { 'portColor': '#cc585c', 'portId': 'left1' }, { 'portColor': '#b1273a', 'portId': 'left2' } ],
        'topArray': [ { 'portColor': '#14abef', 'portId': 'top0' } ]
      }
    },
    getList(){
      return "Change plan, Change travel date, setup a callback "
    }
  }
}
</script>

<style scoped lang="scss">
  .capabilities-v {

  }
</style>
