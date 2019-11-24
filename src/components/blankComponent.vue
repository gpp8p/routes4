<template>
    <div v-bind:style=cardStyle
         v-on:click="cellClicked"
    >
        {{cardId}}) Hello There...
    </div>
</template>

<script>
  /* eslint-disable no-console */

  export default {
    name: "blankComponent",
    props: {
      cardStyle: {
        type: String,
        required: true
      },
      cardId: {
        type: String,
        required: true
      }
    },
    methods: {
      cellClicked: function() {
        console.log('clicked');
        this.$emit('storeValue', [this.cardId])
      }
    }
  };
</script>

<style scoped>


</style>