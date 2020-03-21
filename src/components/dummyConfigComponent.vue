<template>
    <span>
        Prompt--{{this.prompt}}  configElement-- {{this.configElement}}<br/>
    </span>
    
</template>

<script>
  export default {
    name: "dummyConfigComponent",
    props:{
      prompt:{
        type: String,
        required: true
      },
      configElement: {
        type: Object,
        required: true
      }
    }
  };
</script>

<style scoped>

</style>