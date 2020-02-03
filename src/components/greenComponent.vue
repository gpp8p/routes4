<template>
  <div v-on:click="cellClicked" style="this.cstyle">
    {{ this.cardTitle }}
  </div>
</template>

<script>
/* eslint-disable no-console,no-debugger */

export default {
  name: "greenComponent",
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
      cardTitle: "Click on this card to set it up"
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
    setCardData(cardData, cardDataElement) {
      debugger;
      switch (cardDataElement) {
        case "title":
          this.cardTitle = cardData;
          break;
        case "backgroundColor":
          this.$el.style.backgroundColor=cardData;
          break;
        case "backgroundImage":
          var backGroundImageReference = "url('" + cardData + "')";
          this.$el.style.backgroundImage = backGroundImageReference;
          this.$el.style.backgroundSize="100% 100%";
          break;
        case "fontFamily":
          this.$el.style.fontFamily=cardData;
          break;
        case "fontSize":
          this.$el.style.fontSize=cardData;
          break;
        case "fontWeight":
          this.$el.style.fontWeight=cardData;
          break;
        case "fontStyle":
          this.$el.style.fontStyle=cardData;
          break;
        case "color":
          this.$el.style.color=cardData;
          break;
        case "textAlign":
          this.$el.style.textAlign=cardData;
          break;
      }
      return this.cardKey;
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
