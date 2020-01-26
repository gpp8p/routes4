<template>
    <span>
        <MyButton @myButtonClicked="nextClicked" buttonLabel="Next"></MyButton>
        <MyButton v-if="this.currentStatus>0"   @myButtonClicked="prevClicked" buttonLabel="Previous"></MyButton>
        <MyButton @myButtonClicked="cancelClicked" buttonLabel="Cancel"></MyButton>
    </span>
</template>

<script>
  import MyButton from "../components/MyButton.vue";
  export default {
    name: "nextCancelButtons",
    components: {MyButton},
    props: {
      currentStatus:{
        type: Number,
        required: true
      }
    },
    methods:{
      nextClicked(){
        this.$emit('buttonClick', ['next'])
      },
      prevClicked(){
        this.$emit('buttonClick', ['previous'])
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