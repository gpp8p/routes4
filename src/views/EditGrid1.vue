<template>
    <div>
        <span v-show="showTopLeftPrompt" class="prompt">Click on the top left cell of where you wish to place the card ?</span>
        <span v-show="showBottomRightPrompt" class="prompt">Click Bottom Right Cell</span>
        <span v-show="showSelectOkButtons" class="prompt">Is this area ok for the new card ?<MyButton @myButtonClicked="yesButtonClicked" buttonLabel="Yes"></MyButton><MyButton @myButtonClicked="cancelClicked" buttonLabel="No"></MyButton></span>
        <span v-show="showCardNamePrompt" class="prompt">
            What do you want to name this card ?<input ref="cardName" v-model="nameField.value" type="text" size="20"/>
            <MyButton @myButtonClicked="doneButtonClicked" buttonLabel="Done"></MyButton>
        </span>
        <span v-show="showCardComponentSelect">
            <select ref="cardComponentSelect" @change="cardSelectionMade($event)">
                <option value="select">Select Card Type</option>
                <option  value="blankComponent">Blank Card</option>
            </select>
        </span>
        <span v-show="showSubmbitButtons">Save this card ? <MyButton @myButtonClicked="saveButtonClicked" buttonLabel="Submit"></MyButton><MyButton @myButtonClicked="cancelClicked" buttonLabel="Cancel"></MyButton></span>
        <div v-bind:style=gridParamDefinition>
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
        csrf_token :'',
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
        layoutId:0,
        selectedColor: '#66bb6a',
        unSelectedColor: 'coral',
        newCardType: '',
        scolor: '',
        gridParamDefinition: '',
        nameField:
          {
            value:''
          }

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
          this.cardInstances = response.data.cards;
          this.gridParamDefinition = this.layoutGridParameters(response.data.layout.height, response.data.layout.width);
          debugger;
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
            this.topLeftRow = this.cardInstances[this.topLeftClicked].card_position[0];
            this.topLeftCol = this.cardInstances[this.topLeftClicked].card_position[1];
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
            this.bottomRightRow = this.cardInstances[this.bottomRightClicked].card_position[0];
            this.bottomRightCol = this.cardInstances[this.bottomRightClicked].card_position[1];
            this.cstatus=this.BOTTOMRIGHTCLICKED;
            this.showSelectOkButtons = true;
            this.showTopLeftPrompt = false;
            this.showBottomRightPrompt =  false;
            this. showCardNamePrompt = false;
            this.showCardComponentSelect =  false;
            this.showSubmbitButtons =  false;
            this.$refs.key[msg].$el.style.backgroundColor='#66bb6a';
            this.scolor = this.selectedColor;
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
        this.scolor = this.unSelectedColor;
        this.cardInstances.forEach(this.fillInCell);
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
          this.$refs.key[index].$el.style.backgroundColor=this.scolor;
        }
      },
      cardSelectionMade(evt){
        console.log('Card type selection made:'+evt.target.value);
        this.newCardType = evt.target.value;
        this.cstatus = this.WAITINGFORSUBMIT;
        this.showSelectOkButtons = false;
        this.showTopLeftPrompt = false;
        this.showBottomRightPrompt =  false;
        this. showCardNamePrompt = false;
        this.showCardComponentSelect =  false;
        this.showSubmbitButtons =  true;
      },
      saveButtonClicked(){
        axios.post('http://localhost:8000/saveCard',
          {
            layoutId: this.layoutId,
            cardType: this.cardType,
            cardTitle: this.nameField.value,
            topLeftRow: this.topLeftRow,
            topLeftCol: this.topLeftCol,
            bottomRightRow: this.bottomRightRow,
            bottomRightCol: this.bottomRightCol
          })
          .then(function (response) {
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      layoutGridParameters(height, width){
        var heightSize = Math.round(100/height);
        var widthSize = Math.round(100/width);
        var gridHeightCss = 'grid-template-rows: ';
        var gridWidthCss = 'grid-template-rows: ';
        var x = 0
        for(x=0;x<height;x++){
          gridHeightCss = gridHeightCss+heightSize+'% ';
        }
        for(x=0;x<width;x++){
          gridWidthCss = gridWidthCss+widthSize+'% ';
        }
        var gridCss = 'display: grid; grid-gap: 3px; background-color: #fff; height: 90vh; color: #444; '+gridHeightCss+";"+gridWidthCss+";";
        return gridCss;
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