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
  };
</script>

<style scoped>

</style>