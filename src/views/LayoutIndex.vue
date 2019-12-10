<template>
    <span>
        <section class="navbar">
            This is the navbar
        </section>
        <section class="intro">
            <div class="content">
            </div>
        </section>
    </span>
</template>

<script>
  export default {
    name: "LayoutIndex"
  };
</script>

<style scoped>
    section {
        width: 100vw;
        padding: 0 0%;
        display: table;
        margin: 0;
        max-width: none;
        background-color: #ddbd5e;
        height: 100vh;

    }
    .content {
        display: table-cell;
        vertical-align: middle;
    }
    .intro {
        height: 93vh;
        width: 100vw;

    }
    .navbar {
        height: 7vh;
        width: 100vw;
        background-color: #f2bb50;

    }
</style>