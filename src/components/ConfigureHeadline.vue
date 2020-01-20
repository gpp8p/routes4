<template>
    <RadioChoice :alignmentHz="true" :radioChoices="this.choices" :fieldName=this.fName :label=this.labelText :choiceRequired="this.choiceIsRequired" ></RadioChoice>
</template>

<script>
    import RadioChoice from "../components/RadioChoice.vue";
  export default {
    name: "ConfigureHeadline",
    components: {RadioChoice},
    data() {
      return {
        choices: ['color', 'images'],
        labelText: 'Background is:',
        choiceIsRequired: true,
        fName: 'backGroundType'
      }
    }
  };
</script>

<style scoped>
    .prompt {
        font-size: medium;
        color: blue;
        margin-bottom: 5px;
        text-align: left;
    }
</style>