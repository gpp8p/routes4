<template>
    <span>
        {{configElement.prompt}}<input type="text" :size=configElement.fieldSize ref="titleText"  @keyup.enter="titleEntered" v-model="value"/>
    </span>
</template>

<script>
  /* eslint-disable no-debugger,no-console */

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
        value: this.getCurrentValue()
      }
    },
    methods:{
      titleEntered(){
        this.currentValues[this.configElement.element]=this.value;
        this.$emit('configSelected', [this.configElement.element, this.value, null, null]);
      },
      getCurrentValue(){
        debugger;
        if(typeof(this.currentValues[this.configElement.element])=='undefined'&& this.value=='') {
          return '';
        }else{
          return this.currentValues[this.configElement.element]
        }
      }
// eslint-disable-next-line no-debugger
    },
  };
</script>

<style scoped>

</style>