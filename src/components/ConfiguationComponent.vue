<template>
    <span>
        <HeadlineConfig v-if="this.cardType=='headlineCard'|| this.cardType=='greenComponent' " :InstanceNumberBeingConfigured="this.instanceNumberBeingConfigured" @configSelected="configurationSelectionEvent" ></HeadlineConfig>
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
      instanceNumberBeingConfigured: {
        type: Number,
        required: true
      }
    },
    methods:{
      configurationSelectionEvent(msg){
        this.$emit('configSelected',[msg]);
      }
    }
  };
</script>

<style scoped>

</style>