<template>
    <task-counter :tasks="tasks"/>
    <div class="table-responsive" >
        <table class="table">
            <thead class="table-light">
                <tr>
                    <th scope="col">terminée</th>
                    <th scope="col">Nom</th>
                    <th scope="col">Tâche</th>
                    <th scope="col">Date limite</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
                
            <tbody>
                <task-item
                    v-for="t in filteredTasks" 
                    :key="t.id" 
                    :task="t" 
                    :id="t.id" 
                    @delete-task="emit('delete-task', t.id)" 
                    @edit-task="emit('edit-task', t.id)" 
                    @toggle-done="emit('toggle-done', t.id)"
                />
            <!--les 3 @ sont juste des retransmissions d'emit de taskItem. taskitem sur des click appelle des fonctions qui eux emettent à TaskList qui lui va recevoir avec les @ et donc emet aussi -->
            </tbody>
        </table>
    </div>
</template>

<script setup>
    import {computed } from 'vue';
    import TaskItem from './TaskItem.vue';
    import TaskCounter from './TaskCounter.vue';
    //avec composant API, on n'a plus besoin de composant : {taskItem}, on peut directement utiliser le composant dans les template

    const emit = defineEmits(['toggle-done','delete-task','edit-task'])
    //on emettait pas directement dans taskList dans la version 2 , taskList etait juste un relais entre taskitem et son parent (TaskForm) 
    const props = defineProps({
        tasks:Array,
        search: String,
        filter: String
    })

    const filteredTasks = computed(() => {
        const searchValue = (props.search || '').toLowerCase()
        let list = props.tasks

        if (props.filter === 'done') {
            list = list.filter(t => t.done)
        } else if (props.filter === 'todo') {
            list = list.filter(t => !t.done)
        }
        return list.filter(t =>
            t.nom.toLowerCase().includes(searchValue.toLowerCase()) || //cherche dans nom et task les taches correspondants au filtre
            t.task.toLowerCase().includes(searchValue.toLowerCase())
        )
    })
</script>

<style>


</style>