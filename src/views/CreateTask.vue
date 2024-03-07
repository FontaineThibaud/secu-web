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
    import { db } from '../firebaseConfig';
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
        //eslint-disable-next-line
        const specialChars = /[<>{}@#&'"\/]/;
        if (specialChars.test(this.taskTitle)) {
            alert(`Le titre de la tâche ne doit pas contenir ces characteres < > { } @ # & " / '`);
            return;
        }
        try {
            const id = crypto.randomUUID();
            set(ref(db, 'tasks/'+ localStorage.getItem('user') + '/' + id), {
                id: id,
                title: this.taskTitle,
                done: false
            });
          this.taskTitle = '';
          this.$router.push('/');
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .create-task {
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    border-radius: 5px;
    background-color: #f9f9f9;
  }

  .light .create-task {
      background-color: #f9f9f9;
      border: 1px solid #ccc;
  }

  .dark .create-task {
      background-color: #333;
      color: var(--colorWhite)
  }

  .create-task h2 {
      font-size: 1.5rem;
      margin-bottom: 20px;
  }

  .create-task form {
      display: flex;
      flex-direction: column;
  }

  .create-task form label {
      font-weight: bold;
      margin-bottom: 10px;
  }

  .create-task form input {
      padding: 10px;
      margin-bottom: 20px;
      border: 1px solid #ccc;
      border-radius: 5px;
  }

  .create-task form button {
      padding: 10px 20px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
  }
  .light .create-task form button {
    background-color: var(--colorBlueLight);
      color: var(--colorWhite);
  }
  .dark .create-task form button {
      background-color: var(--colorBlueDark);
      color: var(--colorWhite);
  }
  .light .create-task form button:hover {
    background-color: var(--colorBlueDark);
      
  }
  .dark .create-task form button:hover {
    background-color: var(--colorBlueLight);
  }

  </style>