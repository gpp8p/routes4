<template>
            <blank-component v-if="cardType=='simpleCard'" class="genericCardStyle"
                    :card-style=cardStyle
                    :card-id=cardId
                    :card-key=cardKey
                    :card-position=cardPosition
                    @storeValue="processClick"
                    ref="cardKey"
            ></blank-component>
</template>

<script>
  /* eslint-disable no-console */

  import BlankComponent from "./blankComponent";
  export default {
    name: "genericCard",
    components: { BlankComponent },
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
      }
    },
    methods: {
      processClick(msg){
//        console.log('generic component recieves storeValue');
        this.$emit('storeValue', [msg])
      }
    }
  };
</script>

<style scoped>
    .genericCardStyle{
        height:100%;
        width:100%;
        background-color: coral;
    }
</style>