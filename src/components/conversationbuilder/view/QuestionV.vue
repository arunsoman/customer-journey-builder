<template lang="html">
<section class="question-v">
    <v-layout row wrap>
        <v-flex xs12 sm6 md3>
            <v-text-field :label="config.help" v-model="config.prompt"></v-text-field>
        </v-flex>
    </v-layout>
    <v-layout row wrap>
        <v-flex xs12 sm6 md3>
            <v-text-field label="re prompt" v-model="config.rePrompt"></v-text-field>
        </v-flex>

        <v-flex xs12 sm6>
            <v-checkbox v-model="multiValued" :label="`Multi valued response: ${multiValued.toString()}`"></v-checkbox>
        </v-flex>

        <v-flex xs12 sm6>
            <v-flex xs12 sm6>
                <v-select v-model="responseType" :items="options" :menu-props="{ maxHeight: '400' }" label="Select"  hint="Whats the type of response expected" persistent-hint></v-select>
            </v-flex>
        </v-flex>
    </v-layout>
</section>
</template>

<script lang="js">
export default {
  name: 'question-v',
  props: ['pData'],
  mounted () {
    this.config = this.pData
  },
  data () {
    return {
      options: ['Location', 'Currency', 'Mobile number', 'email', 'facebookId', 'Gender', 'age' ],
      config: {},
      response: '',
      responseType: '',
      multiValued: ''
    }
  },
  methods: {
    updateData (data) {
      this.config = data
    },
    modifiedData () {
      return {
        responseType: this.responseType,
        multiValued: this.multiValued,
        prompt: this.config.prompt,
        rePrompt: this.config.rePrompt
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.question-v {}
</style>
