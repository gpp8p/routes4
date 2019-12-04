<template>
    <div>
        <span class="prompt" ref="prompt">Click on the top left cell of where you wish to place the card.</span><span v-show="showButtons"><MyButton @myButtonClicked="yesButtonClicked" buttonLabel="Yes"></MyButton><MyButton @myButtonClicked="noButtonClicked" buttonLabel="No"></MyButton></span>
        <div class="softGridWrapper">
            <blank-component v-for="(instance, index) in cardInstances"
                             :key="index"
                             :card-style=instance.card_parameters.style
                             :card-id="instance.id"
                             :card-key="index"
                             :card-position=instance.card_position
                             @storeValue="processClick"
                             ref="key">{{instance.message}}</blank-component>
        </div>
    </div>

</template>

<script>
  /* eslint-disable no-debugger,no-console */

  import axios from 'axios';
  import blankComponent from "../components/blankComponent";
  import MyButton from "../components/MyButton";
  export default {
    name: "EditGrid1",
    components: { blankComponent, MyButton },
    data() {
      return {
        cardInstances: [],
        topLeftClicked: 0,
        bottomRightClicked: 0,
        cstatus: 0,
        showButtons: false,
        topLeftRow:0,
        topLeftCol:0,
        bottomRightRow:0,
        bottomRightCol:0
      }
    },
    created: function() {
      this.WAITINGFORCLICK=0;
      this.TOPLEFTCLICKED =1;
      this.BOTTOMRIGHTCLICKED=2;
      this.WAITINGTOSAVE=3;
      this.CANCELLAYOUTUPDFATE=4;
      axios.get(`http://localhost:8000/getLayout?layoutId=5`)
        .then(response => {
          // JSON responses are automatically parsed.
          this.cardInstances = response.data;
          this.cstatus=this.WAITINGFORCLICK;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    methods:{
      processClick(msg){
        console.log(msg[0]);
        switch(this.cstatus){
          case this.WAITINGFORCLICK:
            this.topLeftClicked=msg[0];
            this.cstatus=this.TOPLEFTCLICKED;
            this.showButtons=false;
            this.$refs.prompt.innerHTML = "Click Bottom Right Cell";
            this.$refs.key[msg].$el.style.backgroundColor='#66bb6a';
            break;
          case this.TOPLEFTCLICKED:
            this.bottomRightClicked = msg[0];
            this.cstatus=this.BOTTOMRIGHTCLICKED;
            this.showButtons=true;
            this.$refs.key[msg].$el.style.backgroundColor='#66bb6a';
            this.cardInstances.forEach(this.fillInCell);
            this.$refs.prompt.innerHTML = "Is this the area you wish to fill ? ";
            break;
          case this.BOTTOMRIGHTCLICKED:
            this.$refs.prompt.innerHTML = "Start over - click on top left cell";
            this.cstatus = this.WAITINGFORCLICK;
            this.showButtons=false;
            this.topLeftClicked=0;
            this.bottomRightClicked
            break;


        }
      },
      yesButtonClicked(){
        console.log('yesButton clicked');
      },
      noButtonClicked(){
        console.log('noButton clicked');
      },
      fillInCell(item, index, arr){
        var thisCardCol = arr[index].card_position[1];
        var thisCardRow = arr[index].card_position[0];
        var topLeftCol = arr[this.topLeftClicked].card_position[1];
        var topLeftRow = arr[this.topLeftClicked].card_position[0];
        var bottomRightCol = arr[this.bottomRightClicked].card_position[1];
        var bottomRightRow = arr[this.bottomRightClicked].card_position[0];
        if(thisCardCol >= topLeftCol && thisCardRow >= topLeftRow && thisCardCol <= bottomRightCol && thisCardRow <= bottomRightRow){
          console.log(item.id);
          this.$refs.key[index].$el.style.backgroundColor='#66bb6a';
        }
      }
    }
  };
</script>

<style scoped>
    .softGridWrapper {
        display: grid;
        grid-gap: 3px;
        grid-template-columns: 10% 10% 10% 10% 10% 10% 10% 10% 10% 10% ;
        grid-template-rows: 10% 10% 10% 10% 10% 10% 10% 10% 10% 10% ;
        background-color: #fff;
        height: 90vh;
        color: #444;
    }

    .prompt {
        font-size: medium;
        color: blue;
        margin-bottom: 5px;
    }



</style>