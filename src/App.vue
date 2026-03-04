<template>
  <div id="app">
    <div id="liveAlertPlaceholder"></div>

    <div class="container">


    <task-form 
      v-if="!isEditing" 
      mode="add" 
      @add-task="addTaskFromChild">
      <template v-slot:header>Ajout d'une tache</template>
    <!--LE v-if ici va permettre de faire apparaitre ou non cette div
    addTask ici est le nom de l'event qu'il ecoute de son fils. et addTaskFromChildren est la methode qui sera appliquée si le fils declenche effectivement cet event-->
    </task-form> 


    <task-form
     v-else mode="edit" 
     :nom="editNom" 
     :task="editTask" 
     :date="editDate" 
     :index="editIndex" 
     @update-task="updateTaskFromChild"> 
        <!--edition : à l'interieur de la balise du composant enfant , le parent fourni les valeur des prop à envoyer à l'enfant-->
        <!-- si on est en mode edition c'est lui qui s'affiche-->
        <!--quand le pere recoit l'event update-task signifiant que le user à valider ses modifs, il applique les données recu via son fils à sa methode updateTaskFr..-->
    </task-form>
    
    <hr />
    <!----------------------------------------------------->
    <div id="affichage">
      <h3>Liste des tâches</h3>

      <!--<ul class="list-group list-group-numbered">
        <li class="list-group-item" v-for="(t, index) in tasks" :key="index">
          <input class="form-check-input" type="checkbox" role="switch" id="switchCheckDefault">
          <label class="form-check-label" for="switchCheck">{{ t.nom }} — {{ t.task }} — {{ t.date }}</label>
          <button v-on:click="deleteTask(index)">Supprimer</button>
        </li>
      </ul>-->

      
    </div>

    <search-bar @search="search = $event" />
    
    <div>
      <task-counter :tasks="tasks"></task-counter>
      <ended-tasks :tasks="tasks" />
    </div>
    <task-list
     :tasks="tasks" 
     :search="search" 
     @delete-task="deleteTask" 
     @edit-task="edit" 
     @toggle-done="toggleDone">
     
     </task-list>



    </div>
  </div>
</template>



<script>
/*import AddTaskForm from './components/AddTaskForm.vue';
import EditTaskForm from './components/EditTaskForm.vue';*/
import TaskList from './components/TaskList.vue';
import SearchBar from './components/SearchBar.vue';
import TaskCounter from './components/TaskCounter.vue';
import EndedTasks from './components/EndedTasks.vue';
import TaskForm from './components/TaskForm.vue';

export default {
  name: 'App',
  components: {
    /*AddTaskForm, //on rajoute le composant fils 
    EditTaskForm,*/
    TaskList,
    SearchBar, 
    TaskCounter,
    EndedTasks,
    TaskForm
  },
  data: function () {// contient l’état brut du composant : des valeurs qu'on modifie directement avec v-model, des tableaux, des objets, etc.
    return {
      search : "",
      isEditing:false,
      nom: '',
      tasks: [], 
      date: '',
      task: '', 
      editNom: '', 
      editTask:'', 
      editDate: '', 
      editIndex:null, 
      done:false,
    }
  },
  methods: {
    addTaskFromChild(task){
      this.tasks.push({...task,done:false});
    },
    
    /*addTask(){ //sans composant 
      if (!this.nom || !this.task || !this.date) {
        alert("Veuillez remplir tous les champs !");
        return; 
      }
      this.tasks.push({
        nom:this.nom,
        task: this.task, 
        date: this.date, 
      });
      //il faut vider les variables apres avoir ajouter une nouvelle tache sinon ces valeurs pourraient etre assignées à une future ou une precedente
      this.nom = '';
      this.date = '';
      this.task = ''
    }, */
    deleteTask(index){
      this.tasks.splice(index,1)
    },

    edit(index){//le pere recupere les valeur lors de la modification et les enverra via props au fils 
      this.isEditing = true;
      this.editIndex= index;
      const t = this.tasks[index];
      this.editNom = t.nom;
      this.editTask = t.task;
      this.editDate = t.date;
    }, 

    updateTaskFromChild(updated) {//le user a finit d'editer et met à jour les valeurs
      this.$set(this.tasks, updated.index,{
        ...this.tasks[updated.index], // conserve done 
      nom: updated.nom, 
      task: updated.task, 
      date: updated.date
      });

      this.isEditing = false;
    },
    toggleDone(index) {
      this.tasks[index].done = !this.tasks[index].done;
    }



    /*
    updateTask() {
      if(!this.editNom || !this.editTask || !this.editDate){
        alert("Veuillez remplir tous les champs !");
        return;
      }
      this.$set(this.tasks, this.editIndex, {
        nom: this.editNom,
        task: this.editTask, 
        date: this.editDate, 
      });
      */

      /*this.tasks[this.editIndex] = { //dans vue2,cette ecriture n'est pas reactive. il y a des limites de reactivité sur les tableaux et les objets(contrairement aux propriétés) faisant que ces modifications ne sont pas detectée 
        nom: this.editNom,              //pour les tableaux et les objets, si on utilise les methodes mutantes : push, splice, shift vue y est reactif mais pas l'affectation directe par index du style this.tasks[32]={...} vue ne voit pas que l'elt du tableau a changé et le dom ne se met pas à jour 
        task: this.editTask,            //this.§set(array,index) est une methode speciale permettant de contourner ce manque de reactivité 
        date: this.editDate,
      };*//*
      this.editDate='';
      this.editNom='';
      this.editTask='';
      this.editIndex=null;
      this.isEditing=false
    }*/
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
button{
  border-radius: .25em;
  margin-left: .25em;
}
.btn-spr{
  color: crimson;
}
body{
  background-color: #1ba552;
}
.form-control{
  width: 20%;

}
</style>









