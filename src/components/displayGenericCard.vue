<template>
    <span v-bind:style='cardStyle' v-on:click="processClick" id=cardId>
        <display-green-card v-if="cardType=='greenComponent'" class="genericCardStyle"
                            :card-style=cardStyle
                            :card-id=cardId
                            :card-key=cardKey
                            :card-position=cardPosition
                            :cardProperties = cardProperties>

        </display-green-card>
        <display-ck-card v-if="cardType=='cktestComponent'" class="genericCardStyle"
                         :card-style=cardStyle
                         :card-id=cardId
                         :card-key=cardKey
                         :card-position=cardPosition
                         :cardProperties = cardProperties>
            
        </display-ck-card>
    </span>
</template>

<script>
  import DisplayGreenCard from "./displayGreenCard";
  import DisplayCkCard from "./displayCkCard";
  export default {
    name: "displayGenericCard",
    components: { DisplayCkCard, DisplayGreenCard },
    props: {
      cardType: {
        type: String,
        required: true
      },
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
      gridCss: {
        type: String,
        required: true
      },
      cardProperties: {
        type: String,
        required: false
      }
    },
  };
</script>

<style scoped>
    .genericCardStyle{
        height:100%;
        width:100%;
    }

</style>