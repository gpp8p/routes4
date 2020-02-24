<template>
  <div v-on:click="cellClicked" >
    {{ this.cardTitle }}
  </div>
</template>

<script>
/* eslint-disable no-console,no-debugger */
import CardBase from "../components/CardBase.vue";
export default {
  name: "greenComponent",
  extends: CardBase,
  props: {
    cardStyle: {
      type: String,
      required: true
    },
    cardId: {
      type: String,
      required: true
    },
    cardKey: {
      type: String,
      required: true
    },
    cardPosition: {
      type: Array,
      required: true
    },
    cardProperties: {
      type: String,
      required: false
    }
  },
  data() {
    return {
      cardMessage: this.getCardProps(),
      cardHasBeenSetup: false,
      cstyle: this.cardStyle,
      cardTitle:this.getCardProps(),
      styling: {},
      content: {},
      configurationCurrentValues:{},
/*
      configurationCurrentValues:{
        "backgroundType":'checked',
        "backgroundColor":"#FFFFFF",
        "fontSize":"12pt",
        "fontWeight":"bold",
        "border":"checked",
        "borderColor":"#cc0521",
        "borderSize":"medium",
        "shadow":"checked",
        "shadowSize":"10px",
        "shadowSizeSetAt":"10px",
        "shadowColor":"#BBBBBB",
        "textInput":"Have a nice Day!",
        "fontFamily":"Helvetica",
        "fontStyle":"oblique",
        "textAlign":"left",
        "color":"#0537aa"
      },
*/
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
  methods: {
    cellClicked: function() {
      //        console.log(' blank-component clicked');
      //        this.cstyle='background-color: #ffffff;';
      this.$emit("cardClick", [
        "cardClicked",
        this.cardKey,
        "greenComponent",
        this.setCardData,
        this.cardConfiguration,
        this.configurationCurrentValues,
      ]);
      this.cardTitle = "";
    },
    refId: function() {
      return "card" + this.cardId;
    },
    getCardProps() {
//      debugger;
      if ((typeof this.cardProperties === "undefined") | (this.cardProperties == "")) {
        return "Click on this card to set it up (green card)";
      }else {
        var thisProp = this.cardProperties.split(String.fromCharCode(30));
        return thisProp[1];
      }
    }
  }
};
</script>

<style scoped>
.cardStyle {
  height: 100%;
  width: 100%;
}
</style>
