

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

  <router-link 
    to="/config" 
    class="nav-link">
    Configuration
  </router-link>
</nav>


<search-bar   v-if="$route.path === '/'" @search="search = $event" />

    
    <router-view 
      @toggle-done="toggleDone"
      :tasks="tasks"
      :search="search"
      @add-task="addTaskFromChild"
      @update-task="updateTaskFromChild"
      @delete-task="deleteTask"
      @edit-task="goToEditPage"
    />

  </div>
</template>

<script>
import SearchBar from './components/SearchBar.vue';

export default {
  components:{SearchBar},
  data() {
    return { tasks: [], search:"" }
  },
  methods: {
    toggleDone(index) {
      this.tasks[index].done = !this.tasks[index].done;
    },
    addTaskFromChild(task) {
      this.tasks.push({ ...task, done: false });
      this.$router.push('/'); // Redirige vers la liste après ajout
    },
    updateTaskFromChild(updated) {
      this.$set(this.tasks, updated.index, { ...updated });
      this.$router.push('/');
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
    },
    goToEditPage(index) {
      // On redirige vers la page d'édition en passant les infos de la tâche
      const task = this.tasks[index];
      this.$router.push({ 
        name: 'task-edit', 
        params: { index: index, taskData: task } 
      });
    }
  }
}
</script>

<style>
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


</style>






