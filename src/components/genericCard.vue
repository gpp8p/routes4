<template >
<span v-bind:style='cardStyle' v-on:click="processClick" id=cardId>
    <blank-component  v-if="cardType=='blankComponent'" class="genericCardStyle"
                          :card-style=cardStyle
                          :card-id=cardId
                          :card-key=cardKey
                          :card-position=cardPosition
                          :cardProperties = cardProperties
                          @cardClick="processCardClick"
                          @configurationHasBeenSaved="configurationHasBeenSaved"
                          ref="cardKey"
        ></blank-component>
        <green-component  v-if="cardType=='greenComponent'" class="genericCardStyle"
                          :card-style=cardStyle
                          :card-id=cardId
                          :card-key=cardKey
                          :card-position=cardPosition
                          :cardProperties = cardProperties
                          @cardClick="processCardClick"
                          @configurationHasBeenSaved="configurationHasBeenSaved"
                          ref="cardKey"
        ></green-component>

</span>




</template>


<script>
  /* eslint-disable no-console,no-debugger */

  import BlankComponent from "./blankComponent";
  import GreenComponent from "./greenComponent";
//  import BlankComponent2 from "./simpleCard";
  export default {
    name: "genericCard",
    components: { BlankComponent, GreenComponent},
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
    methods: {
      processClick(msg){
//        debugger;
        if(this.hasChildern(this.$refs)){
          console.log('hasChildern is true');
        }else{
          console.log('no childern');
          console.log('generic card recieved a click:'+msg);
          this.$emit('storeValue', [this.cardId])
        }
      },
      configurationHasBeenSaved(){
        this.$emit('configurationHasBeenSaved');
      },
      processCardClick(msg){
        console.log('blankComponent card recieved a click:'+msg);
        this.$emit('cardClick', [msg])
      },
      hasChildern(refs){
        for(var o in refs ){
          return true;
        }
        return false;
      },
    }
  };
</script>

<style scoped>
    .genericCardStyle{
        height:100%;
        width:100%;

    }
</style>