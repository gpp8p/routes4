<template>
    <div>
        <h2>Edit Grid</h2>
        <div>
            <div class="softGridWrapper">
                <blank-component v-for="(thisStyle, index) in allStyles" :key="index"  :card-style=thisStyle :card-id=index>{{index}}) card</blank-component>
            </div>
        </div>
    </div>

</template>

<script>
  /* eslint-disable no-debugger,no-console */

  import blankComponent from "../components/blankComponent";
  export default {
    name: "editGrid",
    components: { blankComponent },
    data() {
      return {
        thisRow: 0,
        thisColumn: 0,
        styleString: '',
        allStyles: []
      }
    },
    created: function() {
      let row = 1;
      let column = 1;
      let x = 0;
      for(x=0;x<100;x++){
        let styleString =  "grid-area: "+row+ " / " +column+ " / " +row+ " / " + (column + 1)+ "; background-color:coral;";
        this.allStyles[x]= styleString;
        column++;
        if(column==10){
          column = 0;
          row++;
        }
      }
    },
  };
</script>

<style scoped>
    .softGridWrapper {
        display: grid;
        grid-gap: 3px;
        grid-template-columns: 10% 10% 10% 10% 10% 10% 10% 10% 10% 10% ;
        grid-template-rows: 10% 10% 10% 10% 10% ;
        background-color: #fff;
        height: 90vh;
        color: #444;
    }

</style>