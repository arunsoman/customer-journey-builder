<template lang="html">

  <section class="decision-v">
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
  </section>

</template>

<script lang="js">
export default {
  name: 'decision-v',
  props: ['pData'],
  mounted () {
    this.config = this.pData
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
        rePrompt: this.config.rePrompt
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .decision-v {

  }
</style>
