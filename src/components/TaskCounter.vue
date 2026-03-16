<template>
    <div class="card " >
        <div class="card-body">
            <h5 class="card-header">Total des Taches</h5>
            <p class="card-text">{{tasks.length}}</p>
        </div>
         
    </div>
</template>

<script setup>

    const props = defineProps({
        tasks: Array
    })
</script>

<style scoped>
.card{
    width: 13dvw;
    background-color: bisque;
    margin-left: 3%;
}
    
</style>