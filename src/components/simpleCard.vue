<template>
    <div v-bind:style='cardStyle'
         v-on:click="cellClicked"
    >
    </div>
</template>

<script>
  /* eslint-disable no-console,no-debugger */

  export default {
    name: "simpleCard",
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
      }
    },
    methods: {
      cellClicked: function() {
//        console.log(' blank-component clicked');
        this.$emit('cardClick', [this.cardKey])
      },
      refId: function(){
        return "card"+this.cardId;
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