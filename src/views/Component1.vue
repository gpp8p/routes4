<template>
    <span>
       <testRecursionComponent v-for="(configElement, index) in this.cardConfiguration[0].configurationElements"  :configElement="configElement" :key="index"></testRecursionComponent>
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
        cardConfigurationA: [{"label":"Card Characteristics","configurationElements":[{"type":"color", "element":"backgroundColor","prompt":"Background Color"},
            {"type":"checkbox", "element":"border","prompt":"Include Border?", "onClick":[{"type":"select","selectOptions":['thin','medium','thick'],"element":"borderSize","prompt":"Border Size?"},{"type":"color", "element":"borderColor","prompt":"Border Color"}]},
          ]
        }],

        cardConfiguration:
          [{"label":"Card Characteristics",
            "configurationElements":[{"type":"color", "element":"backgroundColor","prompt":"Background Color"},
              {"type":"checkbox", "element":"border","prompt":"Include Border?",
                "onClick":[{"type":"select","selectOptions":['thin','medium','thick'],"element":"borderSize","prompt":"Border Size?"},
                  {"type":"color", "element":"borderColor","prompt":"Border Color"}]},
            ]
          }]
      }
    },

  };
</script>

<style scoped>

</style>