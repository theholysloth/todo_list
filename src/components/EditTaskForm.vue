<template>
    <div id="edit">
        <p>
            <label >Chargé de tache : </label>
            <input v-model="localNom">
        </p>
        <p>
            <label >tache : </label>
            <input v-model="localTask">
        </p>
        <p>
            <label >date de rendu : </label>
            <input v-model="localDate" type="date"> <!-- v-model relie un input HTML a une variable JavaScript(dans les deux sens ). des qu'une valuer est rentré , vue la m-a-j instantannément-->
            <!-- v-bind permet lui aussi de lier un objet statique html à un objet dynamique js, sauf que lui il n'est que dans un sens JS->HTML -->
        </p>
        
        <button @click="submit">Mettre à jour</button> <!--@click, est un raccourci pour v-on:click , il permet dappeller de facon interactiveautomatique une fonction au click-->
    </div>
</template>

<script>
    export default {
        name: "editTaskForm",
        props : { //les props sont le mecanisme permettant au parent d'envoyer des données à un composant enfant. une prop est un peu comme un parametre de fonction
        //il faut , dans le fils, declarer les props qu'il attend. on peut aussi les declarer avec la syntaxe suivante : defineProps({...:type, ...}) dans <script setup> 
        //on ne modifie jamais directement une prop car elles sont en lecture seule. C’est pour ça qu’on copie la prop dans une variable locale
            nom: String, 
            task: String, 
            date: String, 
            index: Number 
        },//ici , etant donné que c'est le parent qui sait ce qu'il faut modifier , c'est à lui de les envoyer au fils d'ou l'utilité des props
        data: function(){
            return{
                localNom: this.nom,
                localTask:this.task,
                localDate:this.date
            };
        },
        methods:{
            submit(){
                if(!this.localDate || !this.localNom|| !this.localTask){
                    alert('Veuillez renseigner tout les champs, svp!');
                    return;
                }
                this.$emit("update-task",{ //de la meme facon, quand le user envoie les modifications(via "mettre à jour"), c'est le fils qui les recoit et doit les envoyer au pere d'out l'emit 
                    nom:this.localNom, 
                    date: this.localDate, 
                    task: this.localTask, 
                    index: this.index
                });
            }
        }
    }
</script>