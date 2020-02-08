<template>
    <span class="layoutScreen">
    <section  class="navbar">
        <div v-if="this.viewStatus==this.VIEW_CREATE_LAYOUT">
            <focusTest @layoutInputComplete="saveBlankLayout_new" @layoutInputCanceled="this.showLayoutMenu"></focusTest>
        </div>
        <div v-if="this.viewStatus==this.VIEW_TOP_MENU">
            <span class="layoutMenu"><span class="layoutMenuItem" @click="createLayout">New Layout</span><span class="layoutMenuItem">User Administration</span></span>
        </div>
        <div v-if="this.viewStatus==this.VIEW_GRID_MENU">
            <gridInput ref="gridInput" @editLayout="editLayout" @showLayout="showLayout" @storeValue="cellClicked"></gridInput>
        </div>
        <div v-if="this.viewStatus==this.VIEW_HEADLINE_CONFIG">
            <ConfigurationComponent :cardType="this.cardTypeBeingConfigured" :instanceNumberBeingConfigured="this.instancePositionBeingConfigured" @configSelected="configSelectionEventHandler" ></ConfigurationComponent>
        </div>

    </section>
    <section class="content">
        <div v-if="listView">
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
        <div v-if="gridView" style = "position: relative;">
            <editGrid2  :layoutId="selectedLayoutId"  ref="editGrid" @storeValue="cellClicked" @configurationHasBeenSaved="configurationHasBeenSaved"></editGrid2>
        </div>
    </section>
    </span>
</template>

<script>
  /* eslint-disable no-console,no-debugger */

  import focusTest from "../views/focusTest.vue";
  import LayoutListLine from '../components/LayoutListLine.vue';
  import layoutListHeader from '../components/layoutListHeader.vue'
  import axios from 'axios';
  import editGrid2 from '../components/editGrid2';
  import gridInput from '../components/gridInput.vue';
//  import headlineComponent from '../components/headlineComponent.vue';
//  import HeadlineConfig from '../components/ConfigureHeadline.vue';
  import ConfigurationComponent  from '../components/ConfiguationComponent.vue';
//  import { Draggable } from 'draggable-vue-directive'
//  import MoveablePanel from '../components/MoveablePanel.vue'

  export default {
    name: "testLayoutTemplate",
    components: {LayoutListLine, layoutListHeader, focusTest, editGrid2, gridInput, ConfigurationComponent},
 /*
    directives: {
      Draggable,
    },
*/
    mounted: function() {
      this.viewStatus = this.VIEW_TOP_MENU;
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
    data () {
      return {
        VIEW_TOP_MENU: 0,
        VIEW_CREATE_LAYOUT:1,
        VIEW_GRID_MENU:2,
        VIEW_CARD_MENU:3,
        VIEW_HEADLINE_CONFIG:4,
        viewStatus: this.VIEW_TOP_MENU,
        allLayouts: [],
        newLayout: {},
        layoutGrid: [],
        gridView: true,
        listView: true,
        selectedLayoutId: '',
        gridKey: '',
        topLeftRow:0,
        topLeftCol: 0,
        bottomRightRow: 0,
        bottomRightCol: 0,
        layoutId :0,
        newCardType: '',
        configCard: false,
        cardTypeBeingConfigured: '',
        instancePositionBeingConfigured:0,
        screenElementBeingConfigured: {},
        cardDataFunction:null
      }
    },
    methods:{
      createLayout(){
        this.viewStatus=this.VIEW_CREATE_LAYOUT;
      },
      mouseUpEvt(event){
        console.log(event);
      },
      showLayout(){
        this.listView=false;
        this.gridView=true;
        this.showLayoutMenu = false;
        this.$refs.editGrid.showGrid();
        this.viewStatus = this.VIEW_GRID_MENU;
        this.$refs.editGrid.reloadLayoutForDisplay(this.layoutId);
      },

      showLayoutMenu(){
        this.viewStatus = this.VIEW_TOP_MENU;
      },
      layoutSelected(msg){
//        debugger;
        this.listView=false;
        this.gridView=true;
        this.showLayoutMenu = false;
        this.$refs.editGrid.showGrid();
        this.viewStatus = this.VIEW_GRID_MENU;
        this.layoutId = msg[0];
        this.$refs.editGrid.reloadLayout(msg);
        this.$refs.editGrid.freezeCellSelection();
      },
      configurationHasBeenSaved(){
        this.listView=false;
        this.gridView=true;
        this.showLayoutMenu = false;
        this.$refs.editGrid.showGrid();
        this.viewStatus = this.VIEW_GRID_MENU;
      },
      submitNewLayout(msg) {
//        console.log(msg);
        axios.post('http://localhost:8000/createLayout?XDEBUG_SESSION_START=18938', {
          name: msg[0],
          description: msg[1],
          height: msg[2],
          width: msg[3]
        }).then(response=>
            {this.layoutSelected(response.data);
        }).catch(function(error) {
//        }).then(function(response) {
//          console.log(response);
//          this.layoutSelected(response.data);
//        }).catch(function(error) {
          console.log(error);
        });
      },

      saveBlankLayout_new(msg){
        axios.post('http://localhost:8000/createLayoutNoBlanks', {
          name: msg[0],
          description: msg[1],
          height: msg[2],
          width:msg[3]
        }).then(response=>
        {
//            debugger;
          this.layoutId=response.data;
          this.$refs.editGrid.createBlankLayout(msg[2],msg[3],msg[1],msg[0]);
        }).catch(function(error) {
          console.log(error);
        });
      },
      fontSelectionMade(msg){
//        debugger;
        this.$refs.editGrid.setElementStyle(msg[2], msg[0], msg[1]);
      },
      configSelectionEventHandler(msg){
        console.log(msg);
//        debugger;
        if(msg[0][0]=='cancel'){
          this.viewStatus=this.VIEW_TOP_MENU;
          this.cardDataFunction=null;
        }
        this.cardDataFunction(msg[0][1], msg[0][0]);
//      debugger;
//        if(msg[0]=='backgroundColor'|| msg[0]=='backgroundImage'){
//          this.$refs.editGrid.setElementStyle(msg[2], msg[0], msg[1]);
//          this.cardDataFunction(msg[1],'backgroundColor');
//        }
//        if(msg[0]=='font'){
//          this.$refs.editGrid.setElementStyle(msg[2], msg[0], msg[1]);
//        }

      },
      textEntered(msg){
        console.log(msg);
        this.cardDataFunction(msg[0],'title');
      },
      editLayout(){
        this.$refs.editGrid.unlockCellSelection();
        this.$refs.gridInput.editMode();
      },
      cellClicked(msg){
        console.log(msg);
//        debugger;
        if(msg[0]=='topLeft'){
          this.$refs.gridInput.topLeftClicked();
          this.topLeftRow = msg[1];
          this.topLeftCol = msg[2];
//          debugger;
        }
        if(msg[0]=='bottomRight'){
          this.$refs.gridInput.bottomRightClicked();
          this.bottomRightRow = msg[1];
          this.bottomRightCol = msg[2];
//          debugger;
        }
        if(msg[0]=='cardTypeEntered'){
            this.newCardType = msg[1];
        }
        if(msg[0]=='selectAreaOk'){
          this.$refs.gridInput.clearError();
          this.$refs.gridInput.selectAreaOk();
//          debugger;
        }
        if(msg[0]=='nameEntered'){
          this.$refs.gridInput.nameEntered();
        }
        if(msg[0]=='returnToList'){
//          debugger;
          this.viewStatus = this.VIEW_TOP_MENU;
          this.listView=true;
          this.gridView=true;
 //         this.$refs.editGrid.cancelLayoutEdit();
          this.$refs.editGrid.hideGrid();
          this.$refs.editGrid.showCards=false;
          axios.get('http://localhost:8000//layoutList')
            .then(response => {
// eslint-disable-next-line no-debugger
              // JSON responses are automatically parsed.
              this.allLayouts = response.data;
//              debugger;
            })
            .catch(e => {
              this.errors.push(e);
              console.log(e);
            });
        }
        if(msg[0]=='cardEntryReset'){
          this.$refs.editGrid.cancelLayoutEdit();
        }
        if(msg[0]=='error'){
          this.$refs.gridInput.setError(msg[1]);
        }
        if(msg[0]=='saveCard'){
//          debugger;
//            console.log(msg);
          axios.post('http://localhost:8000/saveCard?XDEBUG_SESSION_START=14763', {
            layoutId: this.layoutId,
            cardTitle: msg[0],
            cardType: this.newCardType,
            topLeftRow: this.topLeftRow,
            topLeftCol: this.topLeftCol,
            bottomRightRow: this.bottomRightRow,
            bottomRightCol: this.bottomRightCol
          }).then(response=>
          {
            this.$refs.gridInput.
            this.layoutSelected(response.data);
            this.$refs.editGrid.cancelLayoutEdit();
          }).catch(function(error) {
            console.log(error);
          });

        }
        if(msg[0]=='insertCard'){
//          console.log(msg);
          axios.post('http://localhost:8000/saveCardOnly?XDEBUG_SESSION_START=12016', {
            layoutId: this.layoutId,
            cardTitle: msg[0],
            cardType: this.newCardType,
            topLeftRow: this.topLeftRow,
            topLeftCol: this.topLeftCol,
            bottomRightRow: this.bottomRightRow,
            bottomRightCol: this.bottomRightCol
          }).then(response=>
          {
            console.log('card saved:'+response);
//            debugger;
            this.$refs.editGrid.reloadLayout(this.layoutId);

//            this.$refs.gridInput.
//            this.layoutSelected(response.data);
//            this.$refs.editGrid.cancelLayoutEdit();
          }).catch(function(error) {
            console.log(error);
          });

        }
        if(msg[0]=='newBlankGrid'){
//          debugger;
          this.newLayout=msg[1];
          this.gridParamDefinition = msg[2]
          this.$refs.editGrid.reloadBlankLayout(msg[1]);
          this.listView=false;
          this.gridView=true;
          this.showLayoutMenu = false;
          this.$refs.editGrid.showGrid();
          this.viewStatus = this.VIEW_GRID_MENU;

        }
        if(msg[0]=='cardClicked'){
//          debugger;
          this.configCard=true;
          this.cardTypeBeingConfigured = msg[2]
          this.instancePositionBeingConfigured = msg[1];
          this.screenElementBeingConfigured = msg[4];
          this.cardDataFunction = msg[3];
          if(msg[2]=='greenComponent'| msg[2]=='blankComponent'|msg[2]=='headlineComponent'){
            this.viewStatus = this.VIEW_HEADLINE_CONFIG;
          }
        }

      }

    }
  };
</script>

<style scoped>

    section {

        padding: 0 0%;
        display: table;
        margin: 0;
        height: 98vh;

    }
    .layoutScreen {

    }
    .content {
        margin-left: 2px;
        margin-top: 2px;
        background-color: #dbddd0;
        height:85vh;
        width:97vw;
        border-radius: 4px;
        border-width: 2px;
        border-style: solid;
        border-color: #0a3aff;
        padding-top: 16px;
        padding-left: 5px;
    }
    .navbar {
        margin-left: 2px;
        background-color: #ffcd90;
        height:5vh;
        width:97vw;
        border-radius: 4px;
        border-width: 2px;
        border-style: solid;
        border-color: #0a3aff;
        text-align: left;
        padding-top: 8px;
        padding-left: 5px;
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