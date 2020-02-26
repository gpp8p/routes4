<template>
    <span>
        {{configElement.prompt}}<input type="text" :size=configElement.fieldSize ref="titleText" @keyup.enter="titleEntered" v-model="value"/>
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
    methods:{
      titleEntered(){
        this.$emit('configSelected', [this.configElement.element, null, null, this.value]);
      }
    }
  };
</script>

<style scoped>

</style>