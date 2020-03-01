<template>
        <span style="margin-top:  3px;">
        {{configElement.prompt}}<input  type="color" @change="newColor" :value="val"/>
        </span>

</template>

<script>
  /* eslint-disable no-console,no-debugger */

  export default {
    name: "flexColor2",
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
        val:this.getCurrentValue()
      }
    },
    watch:{
      currentValues: function(){
          debugger;
        this.val = this.getCurrentValue();
      }
    },

    methods:{
      newColor(evt){
        console.log(evt.target.value);
        this.$emit('configSelected', [this.configElement.element,evt.target.value]);

      },
      getCurrentValue(){
        debugger;
        if(typeof(this.currentValues[this.configElement.element])=='undefined'){
          return '#FFFFFF';
        }else{
          var currentValuesEntriesParts = this.currentValues[this.configElement.element].split(":");
          return currentValuesEntriesParts[1].replace(';','');
        }
      }

    }
  };
</script>

<style scoped>

</style>