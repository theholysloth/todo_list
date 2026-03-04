<template>
  <div class="container text-center" id="task-form">
    <div class ="row justify-content-md-center">
      <div class="col col-lg-2"><label>Chargé de tâche :</label></div>
      <div class="col-md-auto"><input v-model="localNom" type="text" placeholder="chargé de la tâche" /></div>
    </div>

    <div class="row justify-content-md-center">
      <div class="col col-lg-2"><label>Tâche :</label></div>
      <div class="col-md-auto"><input v-model="localTask" type="text" /></div>
    </div>

    <div class="row justify-content-md-center">
      <div class="col col-lg-2"><label>Date de rendu :</label></div>
      <div class="col-md-auto"><input v-model="localDate" type="date" /></div>
    </div>

    <button @click="submit">
      {{ mode === 'add' ? 'Ajouter' : 'Modifier' }}
    </button>
  </div>
</template>

<script>
export default {
  name: "TaskForm",

  props: {
    mode: { type: String, required: true }, // "add" ou "edit"
    initialNom: String,
    initialTask: String,
    initialDate: String,
    index: Number
  },

  data() {
    return {
      localNom: this.initialNom || "",
      localTask: this.initialTask || "",
      localDate: this.initialDate || ""
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
