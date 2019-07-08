<template lang="html">
<section class="welcome-unit">
    <v-flex xs12 sm6>
        <v-text-field label="Type in your welcome prompt" v-model="mData.category" hint="Welcome to some service"></v-text-field>
    </v-flex>
    <v-flex xs12 sm6>
        <v-text-field label="Type in your welcome prompt" v-model="mData.welcomeText" hint="Welcome to some service"></v-text-field>
    </v-flex>
</section>
</template>

<script lang="js">
export default {
    name: 'welcome-unit',
    mounted() {

    },
    data() {
        return {
            mData: {}
        }
    },
    methods: {
        update(val) {
            debugger
            this.mData.category = val.category
            this.mData.welcomeText = val.welcomeText
        },

        getModifiedData() {
            return this.mData
        }
    },

}
</script>

<style lang="scss" scoped>
.welcome-unit {}
</style>
