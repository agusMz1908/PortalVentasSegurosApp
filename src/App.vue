<script setup>
</script>

<template>
  <div class="app-container">
    <router-view />
  </div>
</template>

<style>
html,
body {
  background-color: black !important;
  color: white;
  margin: 0;
  padding: 0;
  min-height: 100vh;
}

.app-container {
  min-height: 100vh;
  background-color: black;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>


