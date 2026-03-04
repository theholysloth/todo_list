<template>
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
            <task-item v-for="(t, i) in filteredTasks" :key="i" :task="t" :index="i" @delete-task="$emit('delete-task', i)" @edit-task="$emit('edit-task', i)" @toggle-done="$emit('toggle-done', i)"/>
        </tbody>
    </table>
</template>

<script>
import TaskItem from './TaskItem.vue';

    export default {
        name:"TaskList" ,
        components : {TaskItem},
        props:{
            tasks: Array,
            search: String            
        } ,
        computed : {//sert à créer des valeurs qui dépendent d’autres valeurs, et qui se mettent à jour automatiquement quand les données changent.
    //jamais besoin de faire variable = ...(interdit)
            filteredTasks() {
                return this.tasks.filter(t =>
                    t.nom.toLowerCase().includes(this.search.toLowerCase()) || //cherche dans nom et task les taches correspondants au filtre
                    t.task.toLowerCase().includes(this.search.toLowerCase())
                );
            }
        }
    }
    
</script>