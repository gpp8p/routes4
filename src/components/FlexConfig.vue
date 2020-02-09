<template>
    <span>
            <span>
                {{this.cardConfigurationElements[0].label}}
                <dummyConfig v-for="(configElement, index) in this.cardConfigurationElements[0].configurationElements" :configElement="configElement" :prompt="configElement.prompt" :idx="index" :key="index" :visible="true"></dummyConfig>
            </span>
    </span>

</template>

<script>
    import dummyConfig from "../components/dummyConfig.vue";
  export default {
    name: "FlexConfig",
    components: {'dummyConfig':dummyConfig},
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