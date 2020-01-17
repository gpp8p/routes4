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
            <gridInput ref="gridInput" @storeValue="cellClicked"></gridInput>
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
            <editGrid2  :layoutId="selectedLayoutId"  ref="editGrid" @storeValue="cellClicked"></editGrid2>
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
//  import { Draggable } from 'draggable-vue-directive'
//  import MoveablePanel from '../components/MoveablePanel.vue'

  export default {
    name: "testLayoutTemplate",
    components: {LayoutListLine, layoutListHeader, focusTest, editGrid2, gridInput},
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
/*
        draggableValue: {
          onDragStart: this.onPosStart,
          onDragEnd: this.onPosEnd,
          onPositionChange: this.onPosChg,
          initialPosition: {
            left: 40,
            top: 100
          },
          resetInitialPos: true
        }
*/


      }
    },
    methods:{
      createLayout(){
        this.viewStatus=this.VIEW_CREATE_LAYOUT;
      },
/*
      onPosStart: function(positionDiff, absolutePosition, event) {
        console.log('drag start');
        console.log(positionDiff);
        console.log(absolutePosition);
        console.log(event);
        this.$refs.editGrid.freezeCellSelection();
      },
      onPosEnd: function(positionDiff, absolutePosition, event) {
        console.log('drag end');
        console.log(positionDiff);
        console.log(absolutePosition);
        console.log(event);
        this.$refs.editGrid.unfreezeCellSelection();
      },
      onPosChg: function(positionDiff, absolutePosition, event) {
        console.log('draging');
        console.log(positionDiff);
        console.log(absolutePosition);
        console.log(event);
      },
*/
      mouseUpEvt(event){
        console.log(event);
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
/*
      saveBlankLayout(msg){
//        debugger;


          axios.post('http://localhost:8000/createLayoutNoBlanks', {
            name: msg[0],
            description: msg[1],
            height: msg[2],
            width:msg[3]
          }).then(response=>
          {
//            debugger;
            this.layoutId=response.data;
            var blankLayout = this.createBlankLayout(msg[2],msg[3],msg[1],msg[0]);
            this.newLayout=blankLayout;
            this.listView=false;
            this.gridView=true;
            this.showLayoutMenu = false;
            this.$refs.editGrid.showGrid();
            this.viewStatus = this.VIEW_GRID_MENU;
            this.layoutId = msg[0];
            var gridHeight = parseInt(msg[2]);
            var gridWidth = parseInt(msg[3]);
            this.gridParamDefinition = this.$refs.editGrid.layoutGridParameters(gridHeight, gridWidth);
            this.$refs.editGrid.reloadBlankLayout(blankLayout);
          }).catch(function(error) {
            console.log(error);
          });
      },
*/
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
/*
      createBlankLayout(height,width, description, menu_label){
        console.log('createBlankLayout:'+height+' '+width);
        this.layoutGrid = [];
        var newCards = [];
        var newCardId=1;
        height++;
        width++;
        for(var h=1;h<height;h++){
          var gridRow = [];
          for(var w = 1; w<width; w++){
            var c=this.createBlankCardInstance(h,w,1,1,newCardId);
            newCards.push(c);
            gridRow.push(newCardId);
            newCardId++;
          }
          this.layoutGrid.push(gridRow);
        }
        var newLayout = {cards: newCards, layout: {description:description, menu_label: menu_label, height: (height-1), width:(width-1)}};
        return newLayout;
      },

      computeGridCss(row, col, height, width){
//        debugger;
        var startRow = row;
        var startColumn = col;
        var endRow=0;
        var endCol=0;
        if(height==1){
          endRow = row;
        }else{
          endRow = row+height;
        }
        endCol=startColumn+width;
        var thisCss = "grid-area:"+startRow+"/"+startColumn+"/"+endRow+"/"+endCol;
        return thisCss;

      },


      createBlankCardInstance(row, col, height, width, id){
        console.log('createBlankCardInstance:'+row+' '+col+' '+height+' '+width+ ' '+id);
        var thisGridCss = this.computeGridCss(row, col, height, width);
        var thisCardStyle = thisGridCss+";"+"background-color:#DBAA6E;color:blue;";
        var thisInstance = {card_component: 'simpleCard', card_position: [row,col,height,width], id:id, card_parameters: {style: thisCardStyle}};
        return thisInstance;

      },

*/

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
        if(msg[0]=='cardEntryCanceled'){
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
          this.configCard = true;
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
    .PanelFloat {
        position: fixed;
        overflow: hidden;
        z-index: 2400;
        opacity: 0.70;
        right: 30px;
        top: 20px !important;
        -webkit-transition: all 0.5s ease-in-out;
        -moz-transition: all 0.5s ease-in-out;
        -ms-transition: all 0.5s ease-in-out;
        -o-transition: all 0.5s ease-in-out;
        transition: all 0.5s ease-in-out;
    }
    .dragDiv {
        position: absolute;
        z-index: 9;
        background-color: #f1f1f1;
        border: 1px solid #d3d3d3;
        text-align: center;
    }
</style>