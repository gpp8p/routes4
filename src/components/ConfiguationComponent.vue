<template>
    <span>
        <HeadlineConfig v-if="this.cardType=='headlineCard'" :InstanceNumberBeingConfigured="this.instancePositionBeingConfigured" @configSelected="configurationSelectionEvent" ></HeadlineConfig>
    </span>
    
</template>

<script>
  import HeadlineConfig from '../components/ConfigureHeadline.vue';
  export default {
    name: "ConfiguationComponent",
    components: {HeadlineConfig},
    props:{
      cardType: {
        type: String,
        required: true
      },
      instancePositionBeingConfigured: {
        type: Number,
        required: true
      }
    },
    methods:{
      configurationSelectionEvent(msg){
        this.$emit('configurationSelectionMade',[msg])
      }
    }
  };
</script>

<style scoped>

</style>