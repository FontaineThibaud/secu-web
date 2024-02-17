<template>
  <div class="about-container">
    <h1>À Propos</h1>
    <p class="about-txt">Cette application de liste de tâches a été conçue avec Vue 3 et Firebase.</p>
    <p class="about-txt">Elle a été réalisé dans le cadre d'un cours de sécurité Web à l'université de Laval</p>
  </div>
</template>

<script>
export default {
  name: 'AboutView',
};
</script>
<style>
.light .about-container {
    max-width: 600px;
    margin: 5em auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
  }
  .dark .about-container {
    max-width: 600px;
    margin: 5em auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #333;
    color: #fff;
  }
  .about-container {
    max-width: 600px;
    margin: 5em auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  h1 {
    font-size: 2rem;
    margin-bottom: 20px;
}
  .about-txt {
    margin-top: 2em;
    font-size: 1.2rem;
}
.about-container {
    max-width: 600px;
    margin: 5em auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  h1 {
    font-size: 2rem;
    margin-bottom: 20px;
}
  .about-txt {
    margin-top: 2em;
    font-size: 1.2rem;
  }
</style>