<template>
    <span class="layoutScreen">
    <section  class="navbar">
        <div v-if="this.viewStatus==this.VIEW_CREATE_LAYOUT">
            <focusTest @layoutInputComplete="submitNewLayout" @layoutInputCanceled="this.showLayoutMenu"></focusTest>
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
        <div v-if="gridView">
            <editGrid2 :layoutId="selectedLayoutId"  ref="editGrid" @storeValue="cellClicked"></editGrid2>
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

  export default {
    name: "testLayoutTemplate",
    components: {LayoutListLine, layoutListHeader, focusTest, editGrid2, gridInput},
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
        viewStatus: this.VIEW_TOP_MENU,
        allLayouts: [],
        gridView: true,
        listView: true,
        selectedLayoutId: '',
        gridKey: '',
        topLeftRow:0,
        topLeftCol: 0,
        bottomRightRow: 0,
        bottomRightCol: 0,
        layoutId :0,
        newCardType: ''

      }
    },
    methods:{
      createLayout(){
        this.viewStatus=this.VIEW_CREATE_LAYOUT;
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
        console.log(msg);
        axios.post('http://localhost:8000/createLayout?XDEBUG_SESSION_START=18938', {
          name: msg[0],
          description: msg[1],
          height: msg[2],
          width: msg[3]
        }).then(response=>
            {this.layoutSelected(response.data)
        }).catch(function(error) {
//        }).then(function(response) {
//          console.log(response);
//          this.layoutSelected(response.data);
//        }).catch(function(error) {
          console.log(error);
        });
      },




      cellClicked(msg){
        console.log(msg);
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
          this.viewStatus = this.VIEW_TOP_MENU;
          this.listView=true;
          this.gridView=true;
          this.$refs.editGrid.cancelLayoutEdit();
          this.$refs.editGrid.hideGrid();
          axios.get('http://localhost:8000//layoutList')
            .then(response => {
// eslint-disable-next-line no-debugger
              // JSON responses are automatically parsed.
              this.allLayouts = response.data;
            })
            .catch(e => {
              this.errors.push(e);
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
            console.log(msg);
          axios.post('http://localhost:8000/saveCard?XDEBUG_SESSION_START=10690', {
            layoutId: this.layoutId,
            cardTitle: msg[0],
            cardType: this.newCardType,
            topLeftRow: this.topLeftRow,
            topLeftCol: this.topLeftCol,
            bottomRightRow: this.bottomRightRow,
            bottomRightCol: this.bottomRightCol
          }).then(response=>
          {this.layoutSelected(response.data);
          this.$refs.editGrid.cancelLayoutEdit();
          }).catch(function(error) {
            console.log(error);
          });

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
        height:86vh;
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
        height:4vh;
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