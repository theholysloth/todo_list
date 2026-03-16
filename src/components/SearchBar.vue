<template>
    <div class="search focus-ring py-1 px-2 rounded-2">
    <input
      type="text"
      v-model="localSearch"
      @input="emit('search', localSearch)"
      placeholder="Rechercher une tâche..."
    >
  </div>
</template>

<script setup>
import { ref } from 'vue';
const localSearch = ref("")

const emit = defineEmits(["search"])
</script>

<style>

input {
  padding: 6px;
  border-radius: 8px;
  border: 1px solid #8b8b8b;
  margin-left: 80%;

}
.search{
  position: absolute;
  top: 70px;
  right: 20px;
}
 
</style>