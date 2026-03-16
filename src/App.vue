
<template>
  <div id="app">
    <nav class="nav justify-content-center mb-4 menu-wrapper">
      <router-link 
        to="/" 
        class="nav-link"
        exact>
        Tâches
      </router-link>
      
      <router-link 
        to="/add" 
        class="nav-link"
        exact>
        Ajouter une Tâche
      </router-link>

    </nav>

    <search-bar v-if="$route.path === '/'" @search="search = $event" />
    
    <div class="btn-group mb-3" v-if="$route.path === '/'">
      <button class="btn btn-primary" @click="filter = 'all'">Toutes</button>
      <button class="btn btn-success" @click="filter = 'done'">Terminées</button>
      <button class="btn btn-warning" @click="filter = 'todo'">Restantes</button>
    </div>
    <router-view 
      @toggle-done="toggleDone"
      :filter="filter"
      :tasks="tasks"
      :search="search"
      @add-task="addTaskFromChild"
      @update-task="updateTaskFromChild"
      @delete-task="deleteTask"
      @edit-task="goToEditPage"
    />

  </div>
</template>

<script setup>
  import SearchBar from './components/SearchBar.vue'
  import {ref} from 'vue'
  import {useRouter, useRoute} from 'vue-router'
  const router = useRouter()
  const route = useRoute()

  const tasks = ref([])
  const search = ref('')
  const filter = ref('all')

  function toggleDone(id) {
    const index = tasks.value.findIndex(t => t.id === id)
    if (index !== -1) {
      tasks.value[index].done = !tasks.value[index].done
    }
  }


  function addTaskFromChild(task) {
      tasks.value.push({ ...task, 
        id: Date.now(),
        done: false });
      router.push('/'); // Redirige vers la liste après ajout
    }

  function updateTaskFromChild(updated) {
    const index = tasks.value.findIndex(t => t.id === updated.id)
    tasks.value[index] = {...updated}
    router.push('/');
    }

  function deleteTask(id) {
    const index = tasks.value.find(t => t.id === id)
    tasks.value.splice(index, 1);
    }

  function goToEditPage(id) {
      // On redirige vers la page d'édition en passant les infos de la tâche
      const task = tasks.value.find(t => t.id === id)
      router.push({ 
        name: 'task-edit', 
        params: { id:task.id, taskData: task } 
      });
    }


</script>

<style scoped>


#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.form-check-input{
  background-color: antiquewhite;
  border-color: black;
  margin-right: .25em;
}
.add-update{
  border-radius: 1.25em;
  margin-left: 45%;
  margin-right: 45%; 
  margin-bottom: 0.25em;
}
.btn-spr{
  color: crimson;
}
body{
  background-color: #e3ece8;
}
.form-control{
  width: 20%;

}

.menu-wrapper {
  border: 2px solid #ccc;
  border-radius: 12px;
  padding: 10px 20px;
  background-color: #f8f9fa;
  display: inline-flex;
  gap: 20px;
}

/* Style des liens */
.nav-link {
  color: #555;
  font-weight: 500;
  padding: 6px 12px;
  border-radius: 6px;
}

/* Survol */
.nav-link:hover {
  background-color: #e2e6ea;
}

/* Lien actif */
.router-link-exact-active {
  color: white !important;
  background-color: #0d6efd;
  font-weight: 700;
}

.btn-group{
  position: absolute;
  top: 190px; /* Distance du bas */
  right: 20px;  /* Distance de la droite */

}
</style>
