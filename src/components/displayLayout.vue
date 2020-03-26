<template>
    <div v-bind:style="gridParamDefinition">
        <display-generic-card
                v-for="(instance, index) in cardInstances"
                :key="index"
                :cardType="instance.card_component"
                :card-style="instance.card_parameters.style"
                :card-id="instance.id"
                :card-key="index"
                :card-position="instance.card_position"
                :gridCss="gridParamDefinition"
                :cardProperties="instance.card_parameters.properties">
            
        </display-generic-card>
    </div>
</template>

<script>
  import DisplayGenericCard from "./displayGenericCard";
  export default {
    name: "displayLayout",
    components: { DisplayGenericCard }
  };
</script>

<style scoped>

</style>