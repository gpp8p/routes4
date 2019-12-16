<template>
    <span>
        <section class="navbarWrapper">
            <div class="navbar">
                <span v-show="showTopLeftPrompt" class="prompt">Click on the top left cell of where you wish to place the card</span>
                <span v-show="showBottomRightPrompt" class="prompt">Click Bottom Right Cell</span>
                <span v-show="showSelectOkButtons" class="prompt">Is this area ok for the new card ?<MyButton @myButtonClicked="yesButtonClicked" buttonLabel="Yes"></MyButton><MyButton @myButtonClicked="cancelClicked" buttonLabel="No"></MyButton></span>
                <span v-show="showCardNamePrompt" class="prompt">
                    What do you want to name this card ?<input ref="cardName" v-model="nameField.value" type="text" size="20"/>
                    <MyButton @myButtonClicked="doneButtonClicked" buttonLabel="Done"></MyButton>
                </span>
                <span v-show="showCardComponentSelect" class="prompt">
                    What kind of card are you adding ?
                    <select ref="cardComponentSelect" @change="cardSelectionMade($event)">
                        <option value="select">Select Card Type</option>
                        <option  value="blankComponent">Blank Card</option>
                    </select>
                </span>
                <span v-show="showSubmbitButtons">Save this card ? <MyButton @myButtonClicked="saveButtonClicked" buttonLabel="Submit"></MyButton><MyButton @myButtonClicked="cancelClicked" buttonLabel="Cancel"></MyButton></span>
            </div>
        </section>
        <section v-if="listView" class="intro">
            <div class="content">
                <layoutListHeader></layoutListHeader>
                <LayoutListLine v-for="(layout, index) in allLayouts"
                    :key="index"
                    :id="layout.id"
                    :description="layout.description"
                    :menu_label="layout.menu_label"
                    :height="layout.height"
                    :width="layout.width"
                    @layoutSelected="layoutSelected"
                >
                </LayoutListLine>
            </div>
        </section>
        <section v-if='gridView'>
            <editGrid2 :layoutId="selectedLayoutId" ref="editGrid" @storeValue="cellClicked"></editGrid2>
        </section>
    </span>
</template>

<script>
  /* eslint-disable no-debugger,no-console */

  import LayoutListLine from '../components/LayoutListLine.vue';
  import layoutListHeader from '../components/layoutListHeader.vue'
  import EventBus  from '../main.js';
  import axios from 'axios';
  import editGrid2 from '../components/editGrid2';
  import MyButton from "../components/MyButton";
  export default {
    name: "LayoutIndex",
    components: {LayoutListLine, layoutListHeader, editGrid2, MyButton},
    data () {
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

        cstatus: 0,
        allLayouts: [],
        gridView: true,
        listView: true,
        selectedLayoutId: '',
        showSelectOkButtons: false,
        showTopLeftPrompt: false,
        showBottomRightPrompt: false,
        showCardNamePrompt: false,
        showCardComponentSelect: false,
        showSubmbitButtons: false,
        nameField:
          {
            value:''
          }

      }
    },
    created: function(){

      axios.get('http://localhost:8000//layoutList')
        .then(response => {
// eslint-disable-next-line no-debugger
          // JSON responses are automatically parsed.
          this.allLayouts = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        });
    },
    methods: {
      layoutSelected(msg){
        this.listView=false;
        this.gridView=true;
        this.$refs.editGrid.reloadLayout(msg);
        this.showTopLeftPrompt = true;
        EventBus.$emit('load-layout', msg);
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
        this.$refs.editGrid.cancelLayoutEdit();

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

      cellClicked(msg){
        console.log('layoutIndex notified of click in cell:'+msg);
        switch(this.cstatus){
          case this.WAITINGFORCLICK:
            this.cstatus=this.TOPLEFTCLICKED;
            this.showSelectOkButtons = false;
            this.showTopLeftPrompt = false;
            this.showBottomRightPrompt =  true;
            this. showCardNamePrompt = false;
            this.showCardComponentSelect =  false;
            this.showSubmbitButtons =  false;
            break;
          case this.TOPLEFTCLICKED:
            this.cstatus=this.BOTTOMRIGHTCLICKED;
            this.showSelectOkButtons = true;
            this.showTopLeftPrompt = false;
            this.showBottomRightPrompt =  false;
            this. showCardNamePrompt = false;
            this.showCardComponentSelect =  false;
            this.showSubmbitButtons =  false;
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
      }
    }

  };
</script>

<style scoped>
    section {
        width: 100vw;
        padding: 0 0%;
        display: table;
        margin: 0;
        max-width: none;
        height: 100vh;

    }
    .content {
        margin: 2px;
        background-color: #dbddd0;
        height:90vh;
        width:98vw;
        border-radius: 4px;
        border-width: 2px;
        border-style: solid;
        border-color: #0a3aff;

    }
    .intro {
        height: 93vh;
        width: 100vw;
        background-color: #ffffff;


    }
    .navbarWrapper {
        height: 7vh;
        width: 100vw;
        background-color: #ffffff;

    }
    .navbar {
        margin: 2px;
        background-color: #ffcd90;
        height:6vh;
        width:98vw;
        border-radius: 4px;
        border-width: 2px;
        border-style: solid;
        border-color: #0a3aff;
        text-align: left;
    }
</style>