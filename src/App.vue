<template>
  <nav>
    <router-link to="/">Accueil</router-link>
    <router-link to="/about">À Propos</router-link>
    <router-link to="/create">Créer Tâche</router-link>
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

export default {
  name: 'App',
  data() {
    return {
      isDarkTheme: Cookies.get('theme') === 'dark',
    };
  },
  mounted() {
    if (!localStorage.getItem('userId')) {
      const userId = crypto.randomUUID(); // identifiant unique pour l'utilisateur
      localStorage.setItem('userId', userId);
    }
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
    }
  },
};
</script>

