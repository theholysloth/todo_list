<template>
    <div id="add">
        
        <p>
        <label >Chargé de tache : </label>
        <input id= "fill_name" v-model="addNom" type="text" placeholder="chargé de la tache"/>
      </p>
      <p>
        <label >tache : </label>
        <input id= "fill_task" v-model="addTask" type="text" />
      </p>
      <p>
        <label >date de rendu : </label>
        <input id= "fill_date" v-model="addDate" type="date" />
      </p>
      <button v-on:click="submit">Ajouter</button>
    </div>
</template>

<script>
    export default {
        name:"AddTaskForm",
        data: function (){
            return{
                addNom:"",
                addTask:"",
                addDate:""
            };
        },
        methods : {
            submit(){
                if (!this.addNom || !this.addTask || !this.addDate) {
                    alert("Veuillez remplir tous les champs !");
                    return; 
                }
                this.$emit("add-task", {//lorsqu'on clique sur ajouter, il émet/envoie un event(add-task) vers le parent App.vue qui l'ecoute
                    nom:this.addNom, //le fils envoie des données au parent . il peut en envoyer plusieurs separé par une virgule sauf que j'ai decidé d'envoyer une seule, contenant toutes les données 
                    date:this.addDate,
                    task:this.addTask
                });
                this.addDate="";
                this.addNom="";
                this.addTask="";
            }
        }
    }
</script>

