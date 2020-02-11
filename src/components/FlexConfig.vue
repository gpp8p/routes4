<template>
    <span>
            <span>
                {{this.cardConfigurationElements[0].label}}
                <flexConfigComponent v-for="(configElement, index) in this.cardConfigurationElements[0].configurationElements" :configElement="configElement" :prompt="configElement.prompt" :idx="index" :key="index"></flexConfigComponent>
            </span>
    </span>

</template>

<script>
    import flexConfigComponent from "../components/flexConfigComponent.vue";
  export default {
    name: "FlexConfig",
    components: {'flexConfigComponent':flexConfigComponent},
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