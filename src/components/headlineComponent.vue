<template>
    <div v-on:click="cellClicked" style=cardStyle>
        {{this.cardMessage}}
    </div>
</template>

<script>
  /* eslint-disable no-console,no-debugger */

  export default {
    name: "headlineComponent",
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
        cardMessage: this.getCardProps(),
        cardHasBeenSetup: false
      }
    },
    methods: {
      cellClicked: function() {
//        console.log(' blank-component clicked');
        this.$emit('cardClick', [this.cardKey])
      },
      refId: function(){
        return "card"+this.cardId;
      },
      getCardProps(){
        debugger;
        if (typeof this.cardProperties === 'undefined') {
          return "Click on this card to set it up";
        }else{
          var thisProp = this.cardProperties.split(':');
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