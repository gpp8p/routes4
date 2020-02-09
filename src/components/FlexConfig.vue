<template>
    <span>
            <span>
                {{this.cardConfigurationElements[0].label}}
                <Dummy v-for="(configElement, index) in this.cardConfigurationElements[0].configurationElements" :configElement="configElement" :prompt="configElement.prompt" :idx="index" :key="index" :visible="true"></Dummy>
            </span>
    </span>

</template>

<script>
    import Dummy from "../components/dummyConfig.vue";
  export default {
    name: "FlexConfig",
    components: {Dummy},
    props:{
      cardConfigurationElements:{
        type:Object,
        required: true
      }
    }
  };
</script>

<style scoped>

</style>