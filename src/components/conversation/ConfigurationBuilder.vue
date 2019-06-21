<template lang="html">

  <section class="configuration-builder">
    <h1>configuration-builder Component</h1>
  </section>

</template>

<script lang="js">
  export default  {
    name: 'configuration-builder',
    props: [],
    mounted() {

    },
    data() {
      return {
        intents:[{
          name:"Intent Name",
          prompt: "",
          reprompt:"",
          validation: {},
          options:{ 
            representation : "", // true,false date number
          },
          respones:{}
        }]
      }
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style scoped lang="scss">
  .configuration-builder {

  }
</style>
