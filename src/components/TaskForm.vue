<template>
    <div class="card mt-3">
    <div class="card shadow-sm">
    <div class="card-body">
    
      <div class="container text-center" id="task-form">
        <div class ="row justify-content-md-center">
          <div class="col col-lg-2"><label>Chargé de tâche </label></div>
          <div class="col-md-auto"><input v-model="localNom" type="text" placeholder="Chargé de Tache"/></div>
        </div>

        <div class="row justify-content-md-center">
          <div class="col col-lg-2"><label>Tâche </label></div>
          <div class="col-md-auto"><input v-model="localTask" type="text" /></div>
        </div>

        <div class="row justify-content-md-center">
          <div class="col col-lg-2"><label>Date de rendu </label></div>
          <div class="col-md-auto"><input v-model="localDate" type="date" /></div>
        </div>
      </div>
    </div>
    <button class="btn btn-primary add-update" @click="submit">
        {{ props.mode === 'add' ? 'Ajouter' : 'Modifier' }}
    </button>
    </div>
    </div>
    <!--dans tout le template, on ne doi jamais utiliser .value sur un ref (car ils sont automatiquement deballé dans les template)et sur les props y'en a pas-->
</template>

<script setup>

import {ref} from 'vue'

/* En vue 3 , lorsqu'on utilise la composition API, il n'y a plus export default. le composant est automatiquement exporté  
    Props: 
        la definition (explicite) des props se fait grace à defineProps afin que vue sache quelle props externe passés au composant doit etre traité 
        comme des attributs declarés

    data: 
        les données sont defines soit avec ref soit avec reactive. quand on utilise ref, pour acceder à la valeur de la donnée, 
        il faut rajouter .value au nom de variable

    methods : 
        les methods definies dans la section methods devienne de simples fonctions 
    
        - $event uniquement dans un template, quand on veut récupérer la valeur envoyée par un événement.
        Dans un composant enfant, quand tu émet un événement
        */

const props = defineProps({ //du coup on peut maintenant acceder à chaque elt du props à l'aide de props.champ
    mode: {type: String , default:'add'}, 
    nom:String, 
    task: String, 
    date: String, 
    id: Number
})

//defintion de data
const localNom = ref(props.nom || '')
const localTask = ref(props.task || '')
const localDate = ref(props.date || '')

//emits 
const emit = defineEmits(['add-task', 'update-task','toggle-done','delete-task', 'edit-task']) //pareil que les props on peut l'appeler grace au nom 

//methods 
function submit(){
    if (!localNom.value || !localDate.value || !localTask.value){
        alert("Veuillez remplir tous les champs !")
        return; 
    }

    const payload = {
        nom:localNom.value,
        task: localTask.value, 
        date:localDate.value
    }; 

    if(props.mode === 'add'){
        emit('add-task',payload);
        localDate.value= '';
        localNom.value = ''; 
        localTask.value= ''
    }else{
        emit('update-task',{...payload,id:props.id}) //au payload, on ajoute le champ id
    }
}

</script>


<style>
.mt-3 {
  margin: 1rem auto 0 auto !important;
  width: 100%;
  max-width: 720px;
  border-radius: 12px;
  padding: 1rem;
  background-color: #d7d7c5;
}

</style>