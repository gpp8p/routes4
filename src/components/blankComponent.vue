<template>
    <div v-bind:style=cardStyle>
        {{cardId}}) Hello There...
    </div>
</template>

<script>
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
    }
  };
</script>

<style scoped>


</style>