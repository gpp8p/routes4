<template >
<span v-bind:style='cardStyle' v-on:click="processClick" id=cardId>
    <blank-component  v-if="cardType=='blankComponent'" class="genericCardStyle"
                          :card-style=cardStyle
                          :card-id=cardId
                          :card-key=cardKey
                          :card-position=cardPosition
                          @cardClick="processCardClick"
                          ref="cardKey"
        ></blank-component>
</span>




</template>


<script>
  /* eslint-disable no-console,no-debugger */

  import BlankComponent from "./blankComponent";
//  import BlankComponent2 from "./simpleCard";
  export default {
    name: "genericCard",
    components: { BlankComponent},
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
      }
    },
    methods: {
      processClick(msg){
        console.log('generic card recieved a click:'+msg);
        this.$emit('storeValue', [this.cardId])
      },
      processCardClick(msg){
        console.log('blankComponent card recieved a click:'+msg);
        this.$emit('cardClick', [msg])
      }
    }
  };
</script>

<style scoped>
    .genericCardStyle{
        height:100%;
        width:100%;
        background-color: #ffcd90;
    }
</style>