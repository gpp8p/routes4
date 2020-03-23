<template>
    <span class="layoutScreen">
      <div v-if="this.viewStatus==this.VIEW_FLOATING_CONFIG" id="infoi" v-bind:style='styleObject' >
        <config-component
                @newLocation="this.setNewLocation"
                @startDrag="this.startDrag"
                :cardType="this.cardTypeBeingConfigured"
                :currentValues="this.cardCurrentConfigurationValues"
                :configElement="this.cardConfigurationElements"
                :instanceNumberBeingConfigured="this.instancePositionBeingConfigured"
                @configSelected="selectionHandler_layout" >
        >
        </config-component>
      </div>

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
            <flexConfig2
                    :cardType="this.cardTypeBeingConfigured"
                    :currentValues="this.cardCurrentConfigurationValues"
                    :configElement="this.cardConfigurationElements"
                    :instanceNumberBeingConfigured="this.instancePositionBeingConfigured"
                    @configSelected="selectionHandler_layout" >
            </flexConfig2>
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
            <editGrid2  :layoutId="selectedLayoutId"  ref="editGrid" @storeValue="cellClicked" @configurationHasBeenSaved="configurationHasBeenSaved" @cardDataLoaded="cardDataLoaded"></editGrid2>
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
  import flexConfig2 from "../components/FlexConfig2.vue";
  import configComponent from "../components/configComponent.vue";

//  import headlineComponent from '../components/headlineComponent.vue';
//  import HeadlineConfig from '../components/ConfigureHeadline.vue';
//  import ConfigurationComponent  from '../components/ConfiguationComponent.vue';
//  import { Draggable } from 'draggable-vue-directive'
//  import MoveablePanel from '../components/MoveablePanel.vue'

  export default {
    name: "testLayoutTemplate",
    components: {LayoutListLine, layoutListHeader, focusTest, editGrid2, gridInput, flexConfig2, configComponent},
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
        VIEW_FLOATING_CONFIG:5,
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
        cardDataFunction:null,
        cardConfigurationElements:{},
        cardCurrentConfigurationValues:{},

        componentLeft:0,
        componentTop:0,
        styleObject:{
          left: '0px',
          top: '100px',
        },
        offsetLeft:0,
        offsetTop:0,
        showDrg:true

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
      showLayoutList(){
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
      cardDataLoaded(msg){
        console.log(msg);
        this.cardCurrentConfigurationValues=msg[1];
//        debugger;
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
//        debugger;
        axios.post('http://localhost:8000/createLayoutNoBlanks?XDEBUG_SESSION_START=17516', {
          name: msg[0],
          description: msg[1],
          height: msg[2],
          width:msg[3],
          backgroundColor:msg[4]
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
      selectionHandler_layout(msg){
        if(msg[0]=='cancel'){
          this.viewStatus=this.VIEW_TOP_MENU;
          this.cardDataFunction=null;
          this.showLayoutList();
        }else{
 //         debugger;
          this.cardDataFunction(msg[1], msg[0]);
        }
      },
      textEntered(msg){
        console.log(msg);
        debugger;
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
          this.showLayoutList();
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
          this.cardConfigurationElements=msg[4];
          this.cardCurrentConfigurationValues=msg[5];
          this.viewStatus = this.VIEW_FLOATING_CONFIG;
//          this.viewStatus=this.VIEW_HEADLINE_CONFIG;
//          var cardId = msg[7].id;
//          this.cardDataFunction(cardId, 'loadConfiguration' );


//          if(msg[2]=='greenComponent'| msg[2]=='blankComponent'|msg[2]=='headlineComponent'){
//            this.viewStatus = this.VIEW_HEADLINE_CONFIG;
//          }
        }

      },

      setNewLocation(msg){
// eslint-disable-next-line no-debugger
//      debugger;
        this.componentLeft = msg[0]-this.offsetLeft;
        this.componentTop = msg[1]-this.offsetTop;

        this.styleObject.left = this.componentLeft+'px';
        this.styleObject.top= this.componentTop+'px';
      },
      startDrag(msg){
        console.log(msg);
        this.offsetLeft = msg[0]-this.componentLeft;
        this.offsetTop = msg[1]-this.componentTop;

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
        position: relative;
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
    #infoi {
        width: 100%;
        height: 100%;
        position: absolute;
    }
    #infoi {
        z-index: 10;
    }


</style>