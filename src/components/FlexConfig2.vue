<template>
    <span>
       <testRecursionComponent v-for="(configElement, index) in this.configurationElements[configurationLine].configurationElements"
                               :currentValues="configurationCurrentValues"
                               :configElement="configElement"
                               :key="index"
                               @configSelected="configSelectedEvent"  ></testRecursionComponent>
       <nextCancelButtons :currentStatus="this.configurationLine" @buttonClick="bumpLine" ></nextCancelButtons>
    </span>

</template>

<script>
  /* eslint-disable no-console,no-debugger */

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
      configSelectedEvent(msg) {
//        debugger;
        if (msg[3] == 'activated') {
/*
          if (this.closeExpanderFunction != null) {
            if (msg[3] == 'deactivated') {
              this.closeExpanderFunction();
            }
//            this.closeExpanderFunction();
          }
*/
          this.closeExpanderFunction = msg[2];
//        invoke the open expander fnction
          msg[1](msg[0]);
          this.$emit('configSelected', [msg[0], msg[1], this.closeExpander, msg[1], msg[3]]);

        }else if(msg[3]== 'deactivated'){
          this.closeExpanderFunction();
          this.$emit('configSelected', [msg[0], msg[1], this.closeExpander, msg[1], msg[3]]);
        }else{
//          msg[2](msg[0]);
          this.$emit('configSelected', [msg[0], msg[1], this.closeExpander, msg[1], msg[4]]);
        }
//        console.log(msg);
      },
      bumpLine(msg){
//        debugger;
        if(this.configurationLine<this.configurationElements.length){
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