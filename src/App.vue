<template>
  <nav>
    <router-link to="/">Accueil</router-link>
    <router-link to="/about">À Propos</router-link>
    <router-link to="/create">Créer Tâche</router-link>
    <label class="switch">
      {{console.log("is this dark? "+isDarkTheme)}}
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
      const userId = crypto.randomUUID(); // Génère un identifiant unique pour l'utilisateur
      localStorage.setItem('userId', userId); // Stocke l'identifiant dans le localStorage
    }
    if (!Cookies.get('theme')) {
      // Définition d'un thème par défaut
      const defaultTheme = 'light';
      Cookies.set('theme', defaultTheme); // Stocke le thème par défaut dans un cookie
    }
    this.applyTheme(); // Applique le thème au chargement de l'application
  },
  methods: {
    toggleTheme() {
      this.isDarkTheme = !this.isDarkTheme; // Mettre à jour isDarkTheme avant de changer de thème
      const newTheme = this.isDarkTheme ? 'dark' : 'light';
      Cookies.set('theme', newTheme);
      this.applyTheme();
    },
    applyTheme() {
      const theme = Cookies.get('theme');
      document.body.className = theme; // Applique la classe correspondant au thème au body
    }
  },
};
</script>

