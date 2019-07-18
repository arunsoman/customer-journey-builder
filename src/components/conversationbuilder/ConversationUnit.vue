<template lang="html">
<v-dialog v-model="dialog" hide-overlay>
    <section class="conversation-unit">
        <v-container>
            <v-card>
                <v-card-text>
                    <WelcomeV ref='Welcome' :pData="node" v-if="displayType === 'Welcome'"></WelcomeV>
                    <DecisionV ref='DecisionIntent' :pData="node" v-if="displayType === 'DecisionIntent'"></DecisionV>
                    <RecommenderV ref='Recommender' :pData="node" v-if="displayType === 'Recommender'"></RecommenderV>
                    <QuestionV ref='Question' :pData="node" v-if="displayType === 'Question'"></QuestionV>
                    <CapabilitiesV ref='Capabilities' :pData="node" v-if="displayType === 'Capabilities'"></CapabilitiesV>
                </v-card-text>
                <v-card-actions>
                    <v-btn save @click="save">Update</v-btn>
                    <v-btn cancel @click="clearAll">cancel</v-btn>
                </v-card-actions>
            </v-card>
        </v-container>
    </section>
</v-dialog>
</template>

<script lang="js">
import WelcomeV from './view/WelcomeV'
import DecisionV from './view/DecisionV'
import RecommenderV from './view/RecommenderV'
import QuestionV from './view/QuestionV'
import CapabilitiesV from './view/CapabilitiesV'

export default {
  name: 'conversation-unit',
  components: {
    WelcomeV,
    DecisionV,
    RecommenderV,
    QuestionV,
    CapabilitiesV
  },
  mounted () {
    this.refs = this.$refs
  },
  data () {
    return {
      node: {},
      displayType: undefined,
      dialog: false,
      refs: {},
      goHandle: {}

    }
  },
  methods: {
    handleDoubleClick (ele) {
      console.log("In vue")
      this.node= ele
      this.displayType = "Welcome"
      debugger
      this.$emit('showDialog',true)
    },
    showDialog(){
      this.dialog = true
    },
    clearAll () {
      this.dialog = false
      this.displayType = undefined
      this.node = undefined
    },
    setData (d, goHandle) {
      this.node = d
      this.goHandle = goHandle
    },
    save () {
      this.goHandle.save(this.node, this.$refs[this.displayType].modifiedData())
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
