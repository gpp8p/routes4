<template>

    <span class="layoutMenu">
        <span v-show="this.menuInputStatus.isStatus('menu_label')">
            What is the label you wish for this layout ?<input ref="menuLabelInput" v-model="menuLabelInput.value" type="text" size="32"/><MyButton @myButtonClicked="this.buttonClicked" buttonLabel="Next"></MyButton>
        </span>
        <span v-show="this.menuInputStatus.isStatus('description')">
            Please provide a short description of this layout: <input ref="menuDescriptionInput" v-model="menuDescriptionInput.value" type="text" size="80"/><MyButton @myButtonClicked="this.buttonClicked" buttonLabel="Next"></MyButton>
        </span>
        <span v-show="this.menuInputStatus.isStatus('rows')">
            How many rows will the layout have ? <input ref="menuRowsInput" v-model="menuRowsInput.value" type="text" size="5"/><MyButton @myButtonClicked="this.buttonClicked" buttonLabel="Next"></MyButton>
        </span>
        <span v-show="this.menuInputStatus.isStatus('rows')">
            How many columns will the layout have ? <input ref="menuColumnsInput" v-model="menuColumnsInput.value" type="text" size="5"/><MyButton @myButtonClicked="this.buttonClicked" buttonLabel="Next"></MyButton>
        </span>

    </span>

</template>

<script>
  /* eslint-disable no-debugger */

  import MyButton from "../components/MyButton.vue";
  export default {
    name: "NewLayoutInput",
    components: {MyButton},
    data(){
      return {
        menuLabelInput:
          {
            value:''
          },
        menuDescriptionInput:
          {
            value:''
          },
        menuRowsInput:
          {
            value:''
          },
        menuColumnsInput:
          {
            value:''
          },
        menuInputStatus: {
          status: ['menu_label', 'description', 'rows', 'columns', 'submit'],
          statusNow: 0,
          isStatus(testStatus) {
            if(this.status[this.statusNow]==testStatus){
              return true;
            }else{
              return false;
            }
          },
          bumpStatus(){
            debugger;
            this.statusNow++;
            if(this.statusNow>status.length){
              this.statusNow =0;
              return false;
            }else{
              return true;
            }
          },
          backStatus(){
            this.statusNow--;
            if(this.statusNow<0){
              this.statusNow =0;
              return false;
            }else{
              return true;
            }
          }
        },
      }
    },
    methods:{
      buttonClicked(){
        if(!this.menuInputStatus.bumpStatus()){
          this.$emit('layoutInputComplete', [this.menuLabelInput.value, this.menuDescriptionInput.value, this.menuRowsInput.value, this.menuColumnsInput.value]);
        }
      }
    }
  };
</script>

<style scoped>

</style>