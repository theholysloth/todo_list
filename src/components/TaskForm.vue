<template>
  <div class="card mt-3">
    <div class="card-body">
      <div class="container text-center" id="task-form">
        <div class ="row justify-content-md-center">
          <div class="col col-lg-2"><label>Chargé de tâche </label></div>
          <div class="col-md-auto"><input v-model="localNom" type="text" placeholder="chargé de la tâche" /></div>
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
        {{ mode === 'add' ? 'Ajouter' : 'Modifier' }}
      </button>
    
  </div>
</template>





<script>
export default {
  name: "TaskForm",

  props: {
    mode: { type: String, default: 'add' },
    index: Number,
    // Propriétés envoyées par le router lors de l'edit
    nom: String, 
    task: String,
    date: String
  },

  data() {
    return {
    // On initialise avec les props si elles existent
    localNom: this.nom || "",
    localTask: this.task || "",
    localDate: this.date || ""
    };
  },

  methods: {
    submit() {
      if (!this.localNom || !this.localTask || !this.localDate) {
        alert("Veuillez remplir tous les champs !");
        return;
      }

      const payload = {
        nom: this.localNom,
        task: this.localTask,
        date: this.localDate
      };

      if (this.mode === "add") {
        this.$emit("add-task", payload);
      } else {
        this.$emit("update-task", { ...payload, index: this.index });
      }

      // reset uniquement en mode ajout
      if (this.mode === "add") {
        this.localNom = "";
        this.localTask = "";
        this.localDate = "";
      }
    }
  }
};
</script>

<style>
.mt-3 {
    margin-top: 1rem !important;
    width: 75%;
    margin-left: 15%;
    margin-right: 15%;
    background-color: #d7d7c5;
}
</style>

