<template>
    <span class="lline"><span class="gitem">{{menu_label}}</span><span class="gitem">{{description}}</span><span class="gitem">{{height}}</span><span class="gitem">{{width}}</span></span>
</template>

<script>
  export default {
    name: "LayoutListLine",
    props:
      {
        id: {
          type: String,
          required: true
        },
        menu_label: {
          type: String,
          required: true
        },
        description: {
          type: String,
          required: true
        },
        height: {
          type: String,
          required: true
        },
        width: {
          type: String,
          required: true
        }
      }
  };
</script>

<style scoped>
    .lline {
        display: grid;
        grid-template-columns: 20% 60% 10% 10%;
        font-size: medium;
        font-family: Arial;
        align-items: left;
    }
    .lline:hover {
        background-color: burlywood;
    }
    .gitem {
        text-align: left;
        margin-left: 5px;
    }

</style>