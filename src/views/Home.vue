<template>
    <div>
      <h1>Liste des Tâches</h1>
        <p>Voici la liste des tâches à faire.</p>
        <div>
            <ul>
                <li v-for="task in tasks" :key="task.id">
                    {{ task.title }}
                </li>
            </ul>
        </div>
    </div>
  </template>
  
  <script>
    import { db } from '../firebaseConfig';
    import { ref, onValue } from "firebase/database";

    export default {
        name: 'HomeView',
    data() {
        return {
        tasks: [],
        };
    },
    mounted() {
        const tasks = ref(db, 'tasks/')
        onValue(tasks, (snapshot) => {
            const data = snapshot.val()
            console.log(data);
            this.tasks = Object.values(data)
        })

    },
    }
  </script>