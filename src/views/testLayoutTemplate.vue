<template>
    <span class="layoutScreen">
    <section  class="navbar">
        <div v-if="this.viewStatus==this.VIEW_CREATE_LAYOUT">
            <focusTest @layoutInputCanceled="this.showLayoutMenu"></focusTest>
        </div>
        <div v-if="this.viewStatus==this.VIEW_TOP_MENU">
            <span class="layoutMenu"><span class="layoutMenuItem" @click="createLayout">New Layout</span><span class="layoutMenuItem">User Administration</span></span>
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
            <editGrid2 :layoutId="selectedLayoutId" ref="editGrid" @storeValue="cellClicked"></editGrid2>
        </div>
    </section>
    </span>
</template>

<script>
  /* eslint-disable no-console */

  import focusTest from "../views/focusTest.vue";
  import LayoutListLine from '../components/LayoutListLine.vue';
  import layoutListHeader from '../components/layoutListHeader.vue'
  import axios from 'axios';
  import editGrid2 from '../components/editGrid2';

  export default {
    name: "testLayoutTemplate",
    components: {LayoutListLine, layoutListHeader, focusTest, editGrid2},
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
        viewStatus: this.VIEW_TOP_MENU,
        allLayouts: [],
        gridView: true,
        listView: true,
        selectedLayoutId: ''
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
        this.listView=false;
        this.gridView=true;
        this.showLayoutMenu = false;
        this.$refs.editGrid.reloadLayout(msg);
      },
      cellClicked(msg){
        console.log(msg);
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