<template>
    <span>
       <testRecursionComponent v-for="(configElement, index) in this.cardConfiguration[0].configurationElements"  :configElement="configElement" :key="index"  @configSelected="configSelectedEvent"  ></testRecursionComponent>
    </span>

</template>

<script>
  /* eslint-disable no-debugger,no-console */

  import testRecursionComponent from "../components/testRecursionComponent.vue"
  export default {
    name: "Component1",
    components: {testRecursionComponent},
    data() {
      return {
        expandedElementNow: 'null',
        cardConfigurationA: [{"label":"Card Characteristics","configurationElements":[{"type":"color", "element":"backgroundColor","prompt":"Background Color"},
            {"type":"checkbox", "element":"border","prompt":"Include Border?", "onClick":[{"type":"select","selectOptions":['thin','medium','thick'],"element":"borderSize","prompt":"Border Size?"},{"type":"color", "element":"borderColor","prompt":"Border Color"}]},
          ]
        }],
        closeExpanderFunction: null,

        cardConfiguration:
          [{"label":"Card Characteristics",
            "configurationElements":[{"type":"color", "element":"backgroundColor","prompt":"Background Color"},
              {"type":"fontSelect", "element":"fontFamily","prompt":"Select Font ?"},
              {"type":"input", "element":"textInput", "fieldSize":"80", "prompt":"Enter Text:"},
              {"type":"checkbox", "element":"border","prompt":"Include Border?",
                "onClick":[{"type":"select","selectOptions":['thin','medium','thick'],"element":"borderSize","prompt":"Border Size?"},
                  {"type":"color", "element":"borderColor","prompt":"Border Color"}]},
              { "type":"radio", "element":"backgroundColor","fieldName":"backgroundType", "prompt":"Background Type ?", "radioOptions":[ 'Color' ],
                    "onClick":[{"type":"color", "element":"shadowColor","prompt":"Shadow Color"}],
              },
              { "type":"radio", "element":"backgroundImage","fieldName":"backgroundType", "prompt":"Background Type ?", "radioOptions":[ 'Image' ]},
              {"type":"checkbox", "element":"shadow","prompt":"Shadow ?",
                "onClick":[{"type":"select","selectOptions":['5px','10px','20px'],"element":"shadowSize","prompt":"Shadow Size?"},
                  {"type":"color", "element":"shadowColor","prompt":"Shadow Color"}]},

            ]
          }]
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
        console.log(msg);
      }
    }

  };
</script>

<style scoped>

</style>