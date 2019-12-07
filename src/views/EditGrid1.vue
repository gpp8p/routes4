<template>
    <div>
        <span v-show="showTopLeftPrompt" class="prompt">Click on the top left cell of where you wish to place the card ?</span>
        <span v-show="showBottomRightPrompt" class="prompt">Click Bottom Right Cell</span>
        <span v-show="showSelectOkButtons" class="prompt">Is this area ok for the new card ?<MyButton @myButtonClicked="yesButtonClicked" buttonLabel="Yes"></MyButton><MyButton @myButtonClicked="cancelClicked" buttonLabel="No"></MyButton></span>
        <span v-show="showCardNamePrompt" class="prompt">
            What do you want to name this card ?<input ref="cardName" type="text" size="20"/>
            <MyButton @myButtonClicked="doneButtonClicked" buttonLabel="Done"></MyButton>
        </span>
        <span v-show="showCardComponentSelect">
            <select ref="cardComponentSelect">
                <option value="select">Select Card Type</option>
                <option  value="blankComponent">Blank Card</option>
            </select>
        </span>
        <span v-show="showSubmbitButtons"><MyButton @myButtonClicked="yesButtonClicked" buttonLabel="Submit"></MyButton><MyButton @myButtonClicked="cancelClicked" buttonLabel="Cancel"></MyButton></span>
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
        showSelectOkButtons: false,
        showTopLeftPrompt: true,
        showBottomRightPrompt: false,
        showCardNamePrompt: false,
        showCardComponentSelect: false,
        showSubmbitButtons: false,
        topLeftRow:0,
        topLeftCol:0,
        bottomRightRow:0,
        bottomRightCol:0,
        layoutId:0
      }
    },
    created: function() {
      this.WAITINGFORCLICK=0;
      this.TOPLEFTCLICKED =1;
      this.BOTTOMRIGHTCLICKED=2;
      this.SELECTAREAOK = 3;
      this.WAITINGFORNAME = 4;
      this.WAITINGFORTYPE = 5;
      this.WAITINGFORSUBMIT = 6;

      this.WAITINGTOSAVE=8;
      this.CANCELLAYOUTUPDATE=7;


      this.layoutId = this.$route.params.layoutId;
      axios.get(`http://localhost:8000/getLayout?layoutId=`+this.layoutId)
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
            this.showSelectOkButtons = false;
            this.showTopLeftPrompt = false;
            this.showBottomRightPrompt =  true;
            this. showCardNamePrompt = false;
            this.showCardComponentSelect =  false;
            this.showSubmbitButtons =  false;
            this.$refs.key[msg].$el.style.backgroundColor='#66bb6a';
            break;
          case this.TOPLEFTCLICKED:
            this.bottomRightClicked = msg[0];
            this.cstatus=this.BOTTOMRIGHTCLICKED;
            this.showSelectOkButtons = true;
            this.showTopLeftPrompt = false;
            this.showBottomRightPrompt =  false;
            this. showCardNamePrompt = false;
            this.showCardComponentSelect =  false;
            this.showSubmbitButtons =  false;
            this.$refs.key[msg].$el.style.backgroundColor='#66bb6a';
            this.cardInstances.forEach(this.fillInCell);
            break;
          case this.BOTTOMRIGHTCLICKED:
            this.cstatus = this.WAITINGFORNAME;
            this.showSelectOkButtons = false;
            this.showTopLeftPrompt = false;
            this.showBottomRightPrompt =  false;
            this. showCardNamePrompt = false;
            this.showCardComponentSelect =  false;
            this.showSubmbitButtons =  false;
            break;
          case this.WAITINGFORNAME:
            this.cstatus = this.WAITINGFORTYPE;
            this.showSelectOkButtons = false;
            this.showTopLeftPrompt = false;
            this.showBottomRightPrompt =  false;
            this. showCardNamePrompt = false;
            this.showCardComponentSelect =  true;
            this.showSubmbitButtons =  false;
            break;


        }
      },
      
      yesButtonClicked(){

        console.log('yesButton clicked');
        this.cstatus = this.WAITINGFORNAME;
        this.showSelectOkButtons = false;
        this.showTopLeftPrompt = false;
        this.showBottomRightPrompt =  false;
        this. showCardNamePrompt = true;
        this.showCardComponentSelect =  false;
        this.showSubmbitButtons =  false;

      },
      doneButtonClicked(){

        console.log('yesButton clicked');
        this.cstatus = this.WAITINGFORTYPE;
        this.showSelectOkButtons = false;
        this.showTopLeftPrompt = false;
        this.showBottomRightPrompt =  false;
        this. showCardNamePrompt = false;
        this.showCardComponentSelect =  true;
        this.showSubmbitButtons =  false;

      },
      cancelClicked(){
        console.log('noButton clicked');
        this.cstatus = this.WAITINGFORCLICK;
        this.showSelectOkButtons = false;
        this.showTopLeftPrompt = true;
        this.showBottomRightPrompt =  false;
        this. showCardNamePrompt = false;
        this.showCardComponentSelect =  false;
        this.showSubmbitButtons =  false;
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