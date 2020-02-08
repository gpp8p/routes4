<template>
    <span>
        {{this.prompt}} - {{this.idx}}
    </span>
</template>

<script>
  export default {
    name: "dummyConfig",
    props: {
      prompt:{
        type: String,
        required: true
      },
      idx: {
        type: Number,
        required: true
      }
    }
  };
</script>

<style scoped>

</style>