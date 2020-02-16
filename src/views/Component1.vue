<template>
    <span>
       <testRecursionComponent v-for="(configElement, index) in this.cardConfiguration[configurationLine].configurationElements" :currentValues="configurationCurrentValues" :configElement="configElement" :key="index"  @configSelected="configSelectedEvent"  ></testRecursionComponent>
       <nextCancelButtons :currentStatus="this.configurationLine" @buttonClick="bumpLine" ></nextCancelButtons>
    </span>

</template>

<script>
  /* eslint-disable no-debugger,no-console */

  import testRecursionComponent from "../components/testRecursionComponent.vue";
  import nextCancelButtons from "../components/nextCancelButtons.vue";
  export default {
    name: "Component1",
    components: {testRecursionComponent, nextCancelButtons},
    data() {
      return {
        expandedElementNow: 'null',
        closeExpanderFunction: null,
        configurationLine: 0,
        configurationCurrentValues:{},
        configurationCurrentValues1:{
            "backgroundType":'checked',
            "backgroundColor":"#FFFFFF",
            "fontSize":"12pt",
            "fontWeight":"bold",
            "border":"checked",
            "borderColor":"#cc0521",
            "borderSize":"medium",
            "shadow":"checked",
            "shadowSize":"10px",
            "shadowColor":"#BBBBBB",
            "textInput":"Have a nice Day!",
            "fontFamily":"Helvetica",
            "fontStyle":"oblique",
            "textAlign":"left",
            "color":"#0537aa"
        },
        cardConfiguration: [
          {
            "label": "Card Appearance",
            "configurationElements": [

              {
                "type": "radio",
                "element": "backgroundType",
                "fieldName": "backgroundType",
                "prompt": "Background Type ?",
                "radioOptions": ['Color'],
                "onClick": [{ "type": "color", "element": "backgroundColor", "prompt": "Background Color" }]
              },
              {
                "type": "radio",
                "element": "backgroundImage",
                "fieldName": "backgroundType",
                "prompt": "Background Type ?",
                "radioOptions": ['Image'],
                "onClick": [{ "type": "file", "element": "backgroundImage", "prompt": "Upload Background Image ?" }]
              },
              {
                "type": "checkbox", "element": "border", "prompt": "Include Border?",
                "onClick": [{
                  "type": "select",
                  "selectOptions": ['thin', 'medium', 'thick'],
                  "element": "borderSize",
                  "prompt": "Border Size?"
                },
                  { "type": "color", "element": "borderColor", "prompt": "Border Color" }]
              },
              {
                "type": "checkbox", "element": "shadow", "prompt": "Shadow ?",
                "onClick": [{
                  "type": "select",
                  "selectOptions": ['5px', '10px', '20px'],
                  "element": "shadowSize",
                  "prompt": "Shadow Size?"
                },
                  { "type": "color", "element": "shadowColor", "prompt": "Shadow Color" }]
              },
              { "type": "checkbox", "element": "roundIncluded", "prompt": "Round Corners ?" }
            ]
          },
          {
            "label": "Headline",
            "configurationElements": [
              { "type": "input", "element": "textInput", "fieldSize": "80", "prompt": "Enter Text:" }
            ]
          },
          {
            "label": "Text Attributes",
            "configurationElements": [
              { "type": "fontSelect", "element": "fontFamily", "prompt": "Select Font:" },
              {
                "type": "select",
                "selectOptions": ['10pt', '12pt', '18pt', '24pt', '36pt', '48pt', '72pt'],
                "element": "fontSize",
                "prompt": "Size?"
              },
              {
                "type": "select",
                "selectOptions": ['normal', 'bold', 'bolder', 'lighter'],
                "element": "fontWeight",
                "prompt": "Weight?"
              },
              {
                "type": "select",
                "selectOptions": ['normal', 'italic', 'oblique'],
                "element": "fontStyle",
                "prompt": "Style"
              },
              {
                "type": "select",
                "selectOptions": ['left', 'center', 'right'],
                "element": "textAlign",
                "prompt": "Align:"
              },
              { "type": "color", "element": "color", "prompt": "Color:" }
            ]
          },
          {
            "label":"Save Configuration",
            "configurationElements":[
              {"type":"saveConfiguration", "element":"saveConfiguration", "prompt":""}
            ]
          }
        ],
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