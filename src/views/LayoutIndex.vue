<template>
    <span>
        <section class="navbarWrapper">
            <div class="navbar">

            </div>
        </section>
        <section class="intro">
            <div class="content">
                <LayoutListLine v-for="(layout, index) in allLayouts"
                    :key="index"
                    :id="layout.id"
                    :description="layout.description"
                    :menu_label="layout.menu_label"
                    :height="layout.height"
                    :width="layout.width"
                >
                </LayoutListLine>
            </div>
        </section>
    </span>
</template>

<script>
  /* eslint-disable no-debugger */

  import LayoutListLine from '../components/LayoutListLine.vue';
    import axios from 'axios';
  export default {
    name: "LayoutIndex",
    components: {LayoutListLine},
    data () {
      return {
        allLayouts: []
      }
    },
    created: function(){
      axios.get('http://localhost:8000//layoutList')
        .then(response => {
// eslint-disable-next-line no-debugger
          // JSON responses are automatically parsed.
          this.allLayouts = response.data;
          debugger;
        })
        .catch(e => {
          this.errors.push(e);
        });
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
    }
</style>