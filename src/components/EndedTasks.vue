<template>
    <div class="counter">
        Tâches terminées : {{ doneCount }}
    </div>
</template>

<script>
    export default {
        name: "endedTasks",
        props:{
            tasks : Array
        },
        computed: {
            doneCount() {
                return this.tasks.filter(t => t.done).length;
            }
        }
    }
</script>


