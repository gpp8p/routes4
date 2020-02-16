<template>
    <span>
        {{configElement.prompt}}<input type="text" :size=configElement.fieldSize  v-model="this.value"/>
    </span>
</template>

<script>
  export default {
    name: "flexInputField",
    props: {
      configElement: {
        type: Object,
        required: true
      },
      currentValues:{
        type: Object,
        required: false
      }

    },
    data(){
      return{
        value:''
      }
    },
  };
</script>

<style scoped>

</style>