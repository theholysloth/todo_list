<template>
  <div class="d-inline-flex focus-ring py-1 px-2 text-decoration-none border rounded-2">
    <input
      type="text"
      v-model="localSearch"
      @input="$emit('search', localSearch)"
      placeholder="Rechercher une tâche..."
    >
  </div>
</template>

<script>
export default {
  name: "SearchBar",

  data() {
    return {
      localSearch: ""
    };
  }
};
</script>

<style scoped>
input {
  padding: 6px;
  border-radius: 4px;
  border: 1px solid #ccc;
}
</style>
