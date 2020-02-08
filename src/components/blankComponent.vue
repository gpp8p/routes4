<template>
    <div v-on:click="cellClicked" >
        {{ this.cardTitle }}
    </div>
</template>

<script>
  /* eslint-disable no-console,no-debugger */
  import CardBase from "../components/CardBase.vue";
  export default {
    name: "blankComponent",
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
      cardKey:{
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
        cardTitle:this.getCardProps(),
        cardConfiguration: [{"label":"Card Characteristics","configurationElements":[{"type":"color", "element":"backgroundColor","prompt":"Background Color"},
            {"type":"checkbox", "element":"border","prompt":"Include Border?"},
            {"type":"select","selectOptions":['thin','medium','thick'],"element":"borderSize","prompt":"Border Size?"}]
        }],
      }
    },
    methods: {
      cellClicked: function() {
        this.$emit("cardClick", [
          "cardClicked",
          this.cardKey,
          "blueComponent",
          this.setCardData,
          this.cardConfiguration,
        ]);
        this.cardTitle = "";
      },
      refId: function(){
        return "card"+this.cardId;
      },
      getCardProps() {
//      debugger;
        if ((typeof this.cardProperties === "undefined") | (this.cardProperties == "")) {
          return "Click on this card to set it up (blue card)";
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