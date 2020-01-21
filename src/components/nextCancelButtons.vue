<template>
    <span>
        <MyButton @myButtonClicked="nextClicked" buttonLabel="Next"></MyButton>
        <MyButton @myButtonClicked="cancelClicked" buttonLabel="Cancel"></MyButton>
        {{this.err}}
    </span>
</template>

<script>
  import MyButton from "../components/MyButton.vue";
  export default {
    name: "nextCancelButtons",
    props: {
      err:{
        type: String,
        required: false
      }
    },
    data() {
      return {
        errorMessage: this.err
      }
    },
    components: {MyButton},
    methods:{
      nextClicked(){
        this.$emit('buttonClick', ['next'])
      },
      cancelClicked(){
        this.$emit('buttonClick', ['cancel'])
      }
    }

  };
</script>

<style scoped>
    .errorCss {
        text-align: right;
        margin-right: 10px;
        color: red;
    }


</style>