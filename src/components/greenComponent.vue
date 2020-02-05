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
      cardTitle: "Click on this card to set it up",
      styling: {},
      content: {}
    };
  },
  methods: {
    cellClicked: function() {
      //        console.log(' blank-component clicked');
      //        this.cstyle='background-color: #ffffff;';
      this.$emit("cardClick", [
        "cardClicked",
        this.cardKey,
        "greenComponent",
        this.setCardData
      ]);
      this.cardTitle = "";
    },
    refId: function() {
      return "card" + this.cardId;
    },
    getCardProps() {
      //        debugger;
      if (
        (typeof this.cardProperties === "undefined") |
        (this.cardProperties == "")
      ) {
        if (this.cardTitle == "") {
          return "Click on this card to set it up";
        } else {
          return this.cardTitle;
        }
      } else {
        var thisProp = this.cardProperties.split(":");
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
