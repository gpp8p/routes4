<template>
    <div v-on:click="cellClicked" >
        {{ this.cardTitle }}
    </div>
</template>

<script>
  export default {
    name: "displayGreenCard",
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
    data(){
      return {
        cardTitle:this.getCardProps()
      }
    },
    methods:{
      getCardProps() {
//      debugger;
        if ((typeof this.cardProperties === "undefined") | (this.cardProperties == "")) {
          return "(Card has no data)";
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

</style>