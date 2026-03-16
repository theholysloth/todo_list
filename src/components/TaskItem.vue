<template>
    <tr :class="{done: props.task.done}">
    <th scope="row">
      <input class="form-check-input" 
        type="checkbox" 
        role="switch" 
        id="switchCheckDefault" 
        :checked="props.task.done" 
        @change="toggleDone">
    </th>

    <td><label class="form-check-label" for="switchCheck">{{ props.task.nom }}</label></td>
    <td><label class="form-check-label" for="switchCheck">{{ props.task.task }}</label></td>
    <td><label class="date" >{{ props.task.date }}</label></td>
    <td>
      <button class="btn btn-sm" @click="deleteTask">
        <i class="fas fa-trash"></i>
      </button>
      <button class="btn btn-sm btn-primary" @click="editTask">
        <i class="fa-solid fa-pen"></i>
      </button>
    </td>
    </tr>
</template>

<script setup>

const props = defineProps({
    task: Object, 
    id : Number
})

const emit = defineEmits(['toggle-done','delete-task','edit-task'])

function toggleDone(){
    emit('toggle-done',props.id)
}
function deleteTask(){
    emit('delete-task',props.id)
}
function editTask(){
    emit('edit-task', props.id)
}

</script>

<style>

    .done {
    text-decoration:line-through;
    opacity: 0.6;
  }

</style>