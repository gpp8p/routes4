<template>
    <span>
        <section class="navbarWrapper">
            <div class="navbar">
                <span v-show="this.cstatus==WAITINGFORCLICK" class="prompt">Click on the top left cell of where you wish to place the card: <MyButton @myButtonClicked="cancelExitClicked" buttonLabel="Cancel and Return to Layout List"></MyButton></span>
                <span v-show="this.cstatus==this.TOPLEFTCLICKED" class="prompt">Click Bottom Right Cell<MyButton @myButtonClicked="cancelClicked" buttonLabel="Cancel"></MyButton></span>
                <span v-show="this.cstatus==this.BOTTOMRIGHTCLICKED" class="prompt">Is this area ok for the new card ?<MyButton @myButtonClicked="yesButtonClicked" buttonLabel="Yes"></MyButton><MyButton @myButtonClicked="cancelClicked" buttonLabel="No"></MyButton></span>
                <span v-show="this.cstatus==this.WAITINGFORNAME" class="prompt">
                    What do you want to name this card ?<input ref="cardName" v-model="nameField.value" type="text" size="20"/>
                    <MyButton @myButtonClicked="doneButtonClicked" buttonLabel="Done"></MyButton><MyButton @myButtonClicked="cancelClicked" buttonLabel="Cancel"></MyButton>
                </span>
                <span v-show="this.cstatus==this.WAITINGFORTYPE" class="prompt">
                    What kind of card are you adding ?
                    <select ref="cardComponentSelect" @change="cardSelectionMade($event)">
                        <option value="select">Select Card Type</option>
                        <option  value="blankComponent">Blank Card</option>
                    </select>
                    <MyButton @myButtonClicked="cancelClicked" buttonLabel="Cancel"></MyButton>
                </span>
                <span v-show="this.cstatus==this.WAITINGFORSUBMIT">Save this card ? <MyButton @myButtonClicked="saveButtonClicked" buttonLabel="Submit"></MyButton><MyButton @myButtonClicked="cancelClicked" buttonLabel="Cancel"></MyButton></span>
                <span v-show="showLayoutMenu" class="layoutMenu"><span class="layoutMenuItem" @click="createLayout">New Layout</span><span class="layoutMenuItem">User Administration</span></span>
                <span v-show="this.showMenuLabelInput">
                    <NewLayoutInput @layoutInputComplete="submitNewLayout" @layoutInputCanceled="cancelLayoutInput"></NewLayoutInput>
                </span>
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
  import NewLayoutInput from '../components/NewLayoutInput.vue'
//  import focusTest from "../views/focusTest.vue";
  export default {
    name: "LayoutIndex",
    components: {LayoutListLine, layoutListHeader, editGrid2, MyButton, NewLayoutInput},
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
        LAYOUTLIST:8,

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
        showLayoutMenu: true,
        showMenuLabelInput: false,
        nameField:
          {
            value:''
          }

      }
    },
    created: function(){
      this.cstatus=this.LAYOUTLIST;
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
        this.cstatus=this.WAITINGFORCLICK;
        this.listView=false;
        this.gridView=true;
        this.showLayoutMenu = false;
        this.$refs.editGrid.reloadLayout(msg);
        this.showTopLeftPrompt = true;
        EventBus.$emit('load-layout', msg);
      },
      yesButtonClicked(){

        console.log('yesButton clicked');
        this.cstatus = this.WAITINGFORNAME;

      },
      doneButtonClicked(){

        console.log('yesButton clicked');
        this.cstatus = this.WAITINGFORTYPE;
      },
      cancelClicked(){
        console.log('noButton clicked');
        this.cstatus = this.WAITINGFORCLICK;
        this.$refs.editGrid.cancelLayoutEdit();

      },
      cancelExitClicked(){
        this.cstatus=this.LAYOUTLIST;
        this.$refs.editGrid.hideGrid();
        axios.get('http://localhost:8000//layoutList')
          .then(response => {
// eslint-disable-next-line no-debugger
            // JSON responses are automatically parsed.
            this.allLayouts = response.data;
            this.listView=true;
            this.showLayoutMenu=true;
          })
          .catch(e => {
            this.errors.push(e);
          });

      },


      cardSelectionMade(evt){
        console.log('Card type selection made:'+evt.target.value);
        this.newCardType = evt.target.value;
        this.cstatus = this.WAITINGFORSUBMIT;
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
            break;
          case this.TOPLEFTCLICKED:
            this.cstatus=this.BOTTOMRIGHTCLICKED;
            break;
          case this.BOTTOMRIGHTCLICKED:
            this.cstatus = this.WAITINGFORNAME;
            break;
          case this.WAITINGFORNAME:
            this.cstatus = this.WAITINGFORTYPE;
            break;
        }
      },
      createLayout(){
        this.showLayoutMenu = false;
        this.showMenuLabelInput = true;
      },
      submitNewLayout(msg){
        this.showLayoutMenu = true;
        this.showMenuLabelInput = false;
        console.log(msg);
      },
      cancelLayoutInput(){
        this.showLayoutMenu = true;
        this.showMenuLabelInput = false;
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
    .layoutMenu {
        display: flex;
        justify-content: space-evenly;
        height: 100%;
        align-items: baseline;
        margin-top: 6px;
    }
    .layoutMenuItem {
        background-color: #ffcd90;
        font-family: Arial;
        font-size: 17px;
        padding: 1px;
    }
    .layoutMenuItem:hover {
        background-color: #fff722;
        color:red;
    }
</style>