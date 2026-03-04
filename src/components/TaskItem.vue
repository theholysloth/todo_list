<template>
  <tr>
  
    <th scope="row"><input class="form-check-input" type="checkbox" role="switch" id="switchCheckDefault" :checked="task.done" @change="$emit('toggle-done', index)"></th>
    <td><label class="form-check-label" for="switchCheck">{{ task.nom }}</label></td>
    <td><label class="form-check-label" for="switchCheck">{{ task.task }}</label></td>
    <td><label class="form-check-label" for="switchCheck">{{ task.date }}</label></td>
    <td>
      <button @click="$emit('delete-task', index)">Supprimer</button>
      <button @click="$emit('edit-task', index)">Modifier</button>
    </td>
  </tr>
</template>

<script>
export default {
  name: "TaskItem",
  props: {
    task: Object,
    index: Number
  }
};
</script>

