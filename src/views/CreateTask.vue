<template>
    <div class="create-task">
      <h2>Créer une nouvelle tâche</h2>
      <form @submit.prevent="addTask">
        <div>
          <label for="taskTitle">Titre de la tâche :</label>
          <input id="taskTitle" v-model="taskTitle" type="text" placeholder="Entrez le titre de la tâche" required>
        </div>
        <button type="submit">Ajouter la tâche</button>
      </form>
    </div>
  </template>
  
  <script>
    import { db } from '../firebaseConfig'; // Assurez-vous que le chemin d'accès est correct
    import { ref, set } from "firebase/database";
  
  export default {
    data() {
      return {
        taskTitle: '',
      };
    },
    methods: {
      async addTask() {
        if (!this.taskTitle.trim()) return;

        console.log('Ajouter la tâche :', this.taskTitle);
        try {
            set(ref(db, 'tasks/' + crypto.randomUUID()), {
                title: this.taskTitle,
                done: false
            });
          this.taskTitle = ''; // Réinitialiser le champ après l'ajout
          this.$router.push('/'); // Rediriger l'utilisateur vers la page d'accueil (ou une autre page de confirmation)
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Ajoutez ici le style de votre choix pour le formulaire */
  </style>