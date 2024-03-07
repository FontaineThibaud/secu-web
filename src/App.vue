<template>
  <nav>
    <div v-if="isConnected">
      <router-link to="/">Accueil</router-link>
      <router-link to="/about">À Propos</router-link>
      <router-link to="/create">Créer Tâche</router-link>
      <button @click="signOut">Déconnexion</button>
    </div>
    <div v-else>
      <router-link to="/login">Connexion</router-link>
      <router-link to="/register">Inscription</router-link>
    </div>
    <label class="switch">
      <input type="checkbox" @change="toggleTheme" :checked="isDarkTheme">
      <span class="slider"></span>
    </label>
  </nav>
  <router-view/>
</template>
<script>
import Cookies from 'js-cookie';
import "./App.css"
import { getAuth, signOut } from "firebase/auth";

export default {
  name: 'App',
  data() {
    return {
      isDarkTheme: Cookies.get('theme') === 'dark',
      isConnected: localStorage.getItem('user') !== null,
    };
  },
  mounted() {
    if (!Cookies.get('theme')) {
      const defaultTheme = 'light';
      Cookies.set('theme', defaultTheme);
    }
    this.applyTheme();
  },
  methods: {
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme;
      const newTheme = this.isDarkTheme ? 'dark' : 'light';
      Cookies.set('theme', newTheme);
      this.applyTheme();
    },
    applyTheme() {
      const theme = Cookies.get('theme');
      document.body.className = theme;
    },
    async signOut() {
      const auth = getAuth();
      try {
        await signOut(auth);
        console.log("User signed out");
        localStorage.removeItem('user');
        window.location.href = '/login';
      } catch (error) {
        console.error(error.message);
      }
    },
  },
};
</script>

