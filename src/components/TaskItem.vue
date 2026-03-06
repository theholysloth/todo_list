<template>
  <tr :class="{ done: task.done }"> <!--v-if:class="done si la valeur de task.done"-->
  
    <th scope="row">
      <input class="form-check-input" 
      type="checkbox" 
      role="switch" 
      id="switchCheckDefault" 
      :checked="task.done" 
      @change="$emit('toggle-done', index)">
    </th>

    <td><label class="form-check-label" for="switchCheck">{{ task.nom }}</label></td>
    <td><label class="form-check-label" for="switchCheck">{{ task.task }}</label></td>
    <td><label class="date" >{{ task.date }}</label></td>
    <td>
      <button class="btn btn-sm" @click="$emit('delete-task', index)">
        <i class="fas fa-trash"></i>
      </button>
      <button class="btn btn-sm btn-primary" @click="$emit('edit-task', index)">
        <i class="fa-solid fa-pen"></i>
      </button>
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

<style>
  .done {
    text-decoration:line-through;
    opacity: 0.6;
  }
</style>

