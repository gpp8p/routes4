<template>
    <span>
        <HeadlineConfig v-if="this.cardTyle=='headlineCard'|| this.cardType=='greenComponent'" :InstanceNumberBeingConfigured="this.instanceNumberBeingConfigured" @configSelected="configurationSelectionEvent" ></HeadlineConfig>
        <FlexConfig v-if="this.cardTyle!='headlineCard'|| this.cardType!='greenComponent' " :cardConfigurationElements="this.configurationElements"></FlexConfig>
    </span>
    
</template>

<script>
  import HeadlineConfig from '../components/ConfigureHeadline.vue';
  import FlexConfig from '../components/FlexConfig.vue';
  export default {
    name: "ConfiguationComponent",
    components: {HeadlineConfig, FlexConfig},
    props:{
      cardType: {
        type: String,
        required: true
      },
      instanceNumberBeingConfigured: {
        type: Number,
        required: true
      },
      configurationElements:{
        type: Object,
        required: true
      }
    },
    methods:{
      configurationSelectionEvent(msg){
        this.$emit('configSelected',[msg]);
      },
    }
  };
</script>

<style scoped>

</style>