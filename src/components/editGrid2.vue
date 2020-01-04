<template>
  <div v-bind:style="gridParamDefinition" v-if="this.displayGrid" class="gridSection">
    <generic-card
      v-for="(instance, index) in cardInstances"
      :key="index"
      :cardType="instance.card_component"
      :card-style="instance.card_parameters.style"
      :card-id="instance.id"
      :card-key="index"
      :card-position="instance.card_position"
      :gridCss="gridParamDefinition"
      @storeValue="processClick"
      @cardClick="processCardClick"
      ref="key"
      ></generic-card>

  </div>
</template>

<script>
  /* eslint-disable no-debugger,no-console */

  import axios from "axios";
import EventBus from '../main.js';
import genericCard from '../components/genericCard.vue';


export default {
  name: "editGrid2",
  components: {genericCard},
  props: {
    layoutId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      WAITINGFORCLICK:0,
      TOPLEFTCLICKED:1,
      BOTTOMRIGHTCLICKED:2,
      SELECTAREAOK:3,
      WAITINGFORNAME:4,
      WAITINGFORTYPE:5,
      WAITINGFORSUBMIT:6,
      WAITINGTOSAVE:8,
      CANCELLAYOUTUPDATE:7,
      csrf_token: "",
      cardInstances: [],
      gridParamDefinition: "",
      displayGrid: false,
      showCards: true,
      evmsg:'',
      topLeftClicked: 0,
      bottomRightClicked: 0,
      cstatus: 0,
      topLeftRow:0,
      topLeftCol:0,
      bottomRightRow:0,
      bottomRightCol:0,
      selectedColor: '#66bb6a',
      unSelectedColor: 'rgb(219, 170, 110)',
      newCardType: '',
      scolor: '',


    };
  },
  mounted () {
    EventBus.$on('load-layout', function () {
    console.log('event bus recieved event');
    });
  },
  methods: {
    layoutGridParameters(height, width) {
      var heightSize = (95 / height).toFixed(2);
      var widthSize = (98 / width.toFixed(2));
      var gridHeightCss = "grid-template-rows: ";
      var gridWidthCss = "grid-template-columns: ";
      var x = 0;
      for (x = 0; x < height; x++) {
        gridHeightCss = gridHeightCss + heightSize + "% ";
      }
      for (x = 0; x < width; x++) {
        gridWidthCss = gridWidthCss + widthSize + "% ";
      }
      var gridCss =
        "display: grid; grid-gap: 3px; background-color: #dbddd0; height: 90vh; color: #ffcd90; " +
        gridHeightCss +
        ";" +
        gridWidthCss +
        ";";
      return gridCss;
    },
    hideGrid(){
      this.displayGrid=false;
      this.showCards=false;
    },
    showGrid(){
      this.displayGrid=true;
    },
    reloadLayout: function(msg) {
      this.displayGrid=true;
      this.layoutId = msg;
//      console.log("reloading" + msg);
      axios
        .get("http://localhost:8000/getLayout?layoutId=" + this.layoutId)
        .then(response => {
          // JSON responses are automatically parsed.
//          debugger;
          this.cardInstances = response.data.cards;
          this.gridParamDefinition = this.layoutGridParameters(
            response.data.layout.height,
            response.data.layout.width
          );
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    cancelLayoutEdit(){
//      console.log('noButton clicked');
      this.cstatus = this.WAITINGFORCLICK;
      this.scolor = this.unSelectedColor;
      this.fillSelectedCells(this.cardInstances,this.topLeftCol,this.topLeftRow,this.bottomRightCol,this.bottomRightRow, this.unSelectedColor);
    },
    fillInCell(item, index, arr){
      debugger;
      var thisCardCol = arr[index].card_position[1];
      var thisCardRow = arr[index].card_position[0];
      var topLeftCol = arr[this.topLeftClicked].card_position[1];
      var topLeftRow = arr[this.topLeftClicked].card_position[0];
      var bottomRightCol = arr[this.bottomRightClicked].card_position[1];
      var bottomRightRow = arr[this.bottomRightClicked].card_position[0];
//      console.log(thisCardCol+'-'+thisCardRow+'-'+topLeftCol+'-'+topLeftRow+'-'+bottomRightCol+'-'+bottomRightRow);
      if(thisCardCol >= topLeftCol && thisCardRow >= topLeftRow && thisCardCol <= bottomRightCol && thisCardRow <= bottomRightRow){
//        console.log(item.id);
        this.$refs.key[index].$el.style.backgroundColor=this.scolor;
      }else{
//        console.log(item.id);
//        console.log(thisCardCol+'-'+thisCardRow+'-'+topLeftCol+'-'+topLeftRow+'-'+bottomRightCol+'-'+bottomRightRow);
      }
    },
    checkClickPos(brClickRow, brClickCol, tlSelectRow, tlSelectCol){
//      debugger;
      if((brClickRow<tlSelectRow)||(brClickCol<tlSelectCol)){
        return false;
      }else{
        return true;
      }


    },
    fillSelectedCells(arr,tlCol,tlRow,brCol,brRow, colorToFill){
      var topLeftCol = tlCol;
      var topLeftRow = tlRow;
      var bottomRightCol = brCol;
      var bottomRightRow = brRow;
      for(var i = 0; i<arr.length; i++){
        var thisCardCol = arr[i].card_position[1];
        var thisCardRow = arr[i].card_position[0];
//        console.log('thisCardCol:'+thisCardCol+'topLeftCol:'+topLeftCol+'thisCardRow:'+thisCardRow+'topLeftRow:'+topLeftRow);
//        console.log('thisCardCol:'+thisCardCol+'bottomRightCol:'+bottomRightCol+'thisCardRow:'+thisCardRow+'bottomRightRow:'+bottomRightRow);
//        console.log(arr[i].id);
//        console.log('-----------------------------')
        if(thisCardCol >= topLeftCol && thisCardRow >= topLeftRow && thisCardCol <= bottomRightCol && thisCardRow <= bottomRightRow){
//          console.log('card matched');
          this.$refs.key[i].$el.style.backgroundColor=colorToFill;
        }

      }
      console.log('done');
    },
    processCardClick(msg){
      console.log("Card Click - "+msg);
//      debugger;
    },
    processClick(msg){
//      console.log('editGrid2 gets storeValue-'+msg);
//      debugger;
      var cardThatWasClicked = this.findCard(msg[0]);
      console.log('cardThatWasClicked:'+cardThatWasClicked);
      switch(this.cstatus){
        case this.WAITINGFORCLICK:
          this.topLeftClicked=msg[0];
          this.topLeftRow = this.cardInstances[cardThatWasClicked].card_position[0];
          this.topLeftCol = this.cardInstances[cardThatWasClicked].card_position[1];
//          debugger;
          this.cstatus=this.TOPLEFTCLICKED;
          this.$refs.key[cardThatWasClicked].$el.style.backgroundColor='#66bb6a';
          this.$emit('storeValue', ['topLeft', this.topLeftRow,this.topLeftCol ]);
          break;
        case this.TOPLEFTCLICKED:
          this.bottomRightClicked = msg[0];
          var brClickRow = this.cardInstances[cardThatWasClicked].card_position[0];
          var brClickCol = this.cardInstances[cardThatWasClicked].card_position[1];
          if(this.checkClickPos(brClickRow, brClickCol, this.topLeftRow, this.topLeftCol)){
            this.bottomRightRow = this.cardInstances[cardThatWasClicked].card_position[0];
            this.bottomRightCol = this.cardInstances[cardThatWasClicked].card_position[1];
            this.cstatus=this.BOTTOMRIGHTCLICKED;
            this.$refs.key[cardThatWasClicked].$el.style.backgroundColor='#66bb6a';
            this.scolor = this.selectedColor;
//            this.cardInstances.forEach(this.fillInCell);
            this.fillSelectedCells(this.cardInstances,this.topLeftCol,this.topLeftRow,this.bottomRightCol,this.bottomRightRow, '#66bb6a');
            this.$emit('storeValue', ['bottomRight', this.bottomRightRow,this.bottomRightCol ]);
          }else{
            this.$emit('storeValue', ['error', 'You must click and to the right',0 ]);
          }
          break;
        case this.BOTTOMRIGHTCLICKED:
          this.cstatus = this.WAITINGFORNAME;
          break;
        case this.WAITINGFORNAME:
          this.cstatus = this.WAITINGFORTYPE;
          break;
      }
    },
    findCard(cardId){
      for(var i=0;i<this.cardInstances.length;i++){
        if(this.cardInstances[i].id == cardId){
          return i;
        }
      }
    }


  }
};
</script>

<style scoped>
  .gridSection {
    height:80vh;
    width:96vw;
  }
  .prompt {
    font-size: medium;
    color: blue;
    margin-bottom: 5px;
    text-align: left;
  }



</style>
