<template>
    <span>
       <testRecursionComponent v-for="(configElement, index) in this.configurationElements[configurationLine].configurationElements"
                               :currentValues="configurationCurrentValues"
                               :configElement="configurationElements"
                               :key="index"
                               @configSelected="configSelectedEvent"  ></testRecursionComponent>
       <nextCancelButtons :currentStatus="this.configurationLine" @buttonClick="bumpLine" ></nextCancelButtons>
    </span>

</template>

<script>
  /* eslint-disable no-console */

  import testRecursionComponent from "../components/testRecursionComponent.vue";
  import nextCancelButtons from "../components/nextCancelButtons.vue";
  export default {
    name: "FlexConfig2",
    components: {testRecursionComponent, nextCancelButtons},
    props: {
      configElement: {
        type: Object,
        required: true
      },
      currentValues:{
        type: Object,
        required: false
      },
      cardType:{
        type: String,
        required: true
      },
      instanceNumberBeingConfigured:{
        type: Number,
        required: true
      }
    },
    data() {
      return {
        expandedElementNow: 'null',
        closeExpanderFunction: null,
        configurationLine: 0,
        configurationElements:this.configElement,
        configurationCurrentValues: this.currentValues
      }
    },
    methods:{
      configSelectedEvent(msg){
        if(msg[3]=='activated'){
          if(this.closeExpanderFunction !=null){
            this.closeExpanderFunction();
          }
          this.closeExpanderFunction = msg[2];
          msg[1](msg[0]);

        }else{
          msg[2](msg[0]);
        }
//        console.log(msg);
      },
      bumpLine(msg){
        if(this.configurationLine<this.cardConfiguration.length){
          switch(msg[0]){
            case 'next':
              this.configurationLine++;
              break;
            case 'previous':
              this.configurationLine--;
              break;
          }
        }
      }
    }

  };
</script>

<style scoped>

</style>