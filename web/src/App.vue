<template>
<div class="p-d-flex p-jc-center">


  <AppMain  />
		<AppFooter />
	</div>

</template>

<script setup>
import AppMain from './components/AppMain.vue'

// This starter template is using Vue 3 experimental <script setup> SFCs
// Check out https://github.com/vuejs/rfcs/blob/script-setup-2/active-rfcs/0000-script-setup.md
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  color: #2c3e50;
  margin-top: 60px;
}
</style>
<style lang="scss">
@import './App.scss';
</style>