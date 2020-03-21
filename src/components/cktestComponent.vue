<template>
  <div v-on:click="cellClicked" >
    <vue-ckeditor type="classic" v-model="editorData" :config="editorConfig" :editors="editors"></vue-ckeditor>
  </div>
</template>

<script>
/* eslint-disable no-console,no-debugger */


import CardBase from "../components/CardBase.vue";
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import VueCkeditor from 'vue-ckeditor5'
//import EssentialsPlugin from '@ckeditor/ckeditor5-essentials/src/essentials';
//import BoldPlugin from '@ckeditor/ckeditor5-basic-styles/src/bold';
//import ItalicPlugin from '@ckeditor/ckeditor5-basic-styles/src/italic';
//import LinkPlugin from '@ckeditor/ckeditor5-link/src/link';
//import ParagraphPlugin from '@ckeditor/ckeditor5-paragraph/src/paragraph';

export default {
  name: "cktestComponent",
  extends: CardBase,
  components: {
    'vue-ckeditor': VueCkeditor.component
  },

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
//      editor: ClassicEditor,
      editors: {
        classic: ClassicEditor,
      },
      editorData: '<p>Content of the editor.</p>',

/*
      configurationCurrentValues:{
        "backgroundTypeColor":'checked',
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
              "element": "backgroundTypeColor",
              "fieldName": "backgroundType",
              "prompt": "Background Type ?",
              "valueFrom":"backgroundTypeColor",
              "radioOptions": ['Color'],
              "onClick": [{ "type": "color", "element": "backgroundColor", "valueFrom":"backgroundColor", "prompt": "Background Color" }]
            },
            {
              "type": "radio",
              "element": "backgroundTypeImage",
              "fieldName": "backgroundType",
              "prompt": "Background Type ?",
              "valueFrom":"backgroundTypeImage",
              "radioOptions": ['Image'],
              "onClick": [{ "type": "file", "element": "backgroundImage", "prompt": "Upload Background Image ?" }]
            },
            {
              "type": "checkbox", "element": "border", "valueFrom":"borderInclude", "prompt": "Include Border?",
              "onClick": [{
                "type": "select",
                "selectOptions": ['thin', 'medium', 'thick'],
                "valueFrom":"borderSize",
                "element": "borderSize",
                "prompt": "Border Size?"
              },
                { "type": "color", "valueFrom":"borderColor", "element": "borderColor", "prompt": "Border Color" }]
            },
            {
              "type": "checkbox", "element": "shadow", "valueFrom":"shadow", "prompt": "Shadow ?"
            },
            { "type": "checkbox", "element": "roundIncluded", "valueFrom":"roundIncluded", "prompt": "Round Corners ?" }
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
//      debugger;
      console.log('cktestComponent was clicked');
    },
    refId: function() {
      return "card" + this.cardId;
    },
    getCardProps() {
//      debugger;
      if ((typeof this.cardProperties === "undefined") | (this.cardProperties == "")) {
        return "Click on this card to set it up (green card)";
      }else {
        var colonDelimiterLocatedAt= this.cardProperties.indexOf(":");
        var thisProp = this.cardProperties.substr(colonDelimiterLocatedAt+1);
        return thisProp;
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
