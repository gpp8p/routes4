<template>
    <input type="date" :value="this.currentDate">
</template>

<script>
  export default {
    name: "flexDate",
    data (){
      return {
        currentDate: new Date(),
      }
    }
  };
</script>

<style scoped>

</style>