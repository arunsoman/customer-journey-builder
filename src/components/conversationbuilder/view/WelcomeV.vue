<template lang="html">
<section class="welcome-v">
    <v-layout row wrap>
        <v-flex xs12 sm6 md3>
            <v-text-field :label="config.help" v-model="config.prompt"></v-text-field>
        </v-flex>
    </v-layout>
</section>
</template>

<script lang="js">
export default {
  name: 'welcome-v',
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
        prompt: this.config.prompt
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.welcome-v {}
</style>
