<template>
    <div class="task-list">
      <h1>Liste des Tâches</h1>
      <div class="columns">
        <div class="column">
          <h2>À Faire</h2>
          <ul>
            <li v-for="task in tasks.filter(task => !task.done)" :key="task.id">
              <input type="checkbox" v-model="task.done" @change="updateTask(task)">
              <span :class="{ 'task-done': task.done }">{{ task.title }}</span>
              <button @click="deleteTask(task.id)">Supprimer</button>
            </li>
          </ul>
        </div>
        <div class="separator"></div>
        <div class="column">
          <h2>En Cours</h2>
          <ul>
            <li v-for="task in tasks.filter(task => task.done)" :key="task.id">
              <input type="checkbox" v-model="task.done" @change="updateTask(task)">
              <span :class="{ 'task-done': task.done }">{{ task.title }}</span>
              <button @click="deleteTask(task.id)">Supprimer</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
</template>
  
<script>
import { db } from '../firebaseConfig';
import { ref, onValue, set } from "firebase/database";
import { getAuth } from "firebase/auth";

export default {
    name: 'HomeView',
    data() {
        return {
            tasks: [],
        };
    },
    mounted() {
        const tasks = ref(db, 'tasks/' + localStorage.getItem('user'));
        onValue(tasks, (snapshot) => {
            const data = snapshot.val()
            if (data)
                this.tasks = Object.values(data)
            else
                this.tasks = []
        })
        console.log(getAuth());
    },
    methods: {
        async updateTask(task) {
            try {
                await set(ref(db, 'tasks/' + localStorage.getItem('user') + '/' + task.id), task);
            } catch (e) {
                console.error("Error updating task: ", e);
            }
        },
        async deleteTask(taskId) {
            try {
                await set(ref(db, 'tasks/' + localStorage.getItem('user') + '/' + taskId), null);
            } catch (e) {
                console.error("Error deleting task: ", e);
            }
        }
    }
}
</script>
<style>
    .columns {
        display: flex;
        justify-content: space-between;
        margin-top: 5em;
    }

    .column {
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .column:not(:last-child) {
        margin-right: 20px;
        border-right: 1px solid #ccc;
        padding-right: 20px;
    }

    .column h2 {
        font-size: 1.5rem;
        margin-bottom: 10px;
        text-align: center;
    }

    .column ul {
        list-style-type: none;
        padding: 0;
        width: 80%;
        margin-top: 2.5em;
    }

    .column li {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px;
        margin-bottom: 1em;
    }

    .light .column li {
        background-color: var(--colorGrayLight);
        color: var(--colorWhite);
    }

    .dark .column li {
        background-color: var(--colorGrayDark);
        color: var(--colorWhite);
    }

    .column li:last-child {
        border-bottom: none;
    }

    .column li input[type="checkbox"] {
        margin-right: 10px;
    }

    .column li button {
        padding: 5px 10px;
        background-color: #dc3545;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }

    .column li button:hover {
        background-color: #c82333;
    }

    .task-done {
        text-decoration: line-through;
        color: #4d4d4d;
    }
</style>