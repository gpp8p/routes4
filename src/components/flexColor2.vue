<template>
        <span style="margin-top:  3px;">
        {{configElement.prompt}}<input  type="color" @change="newColor" :value="this.val"/>
        </span>

</template>

<script>
  /* eslint-disable no-console */

  export default {
    name: "flexColor2",
    props: {
      configElement: {
        type: Object,
        required: true
      }
    },
    data(){
      return{
        val:"#e66465"
      }
    },
    methods:{
      newColor(evt){
        console.log(evt.target.value);
        this.$emit('configSelected', [this.configElement.element,evt.target.value]);

      }
    }
  };
</script>

<style scoped>

</style>