<template>
    <div class="counter">
        Total des Taches {{tasks.length}}
    </div>
</template>

<script>
    export default {
        name : "TaskCounter",
        props: {
            tasks: Array,
        }
    };
</script>

