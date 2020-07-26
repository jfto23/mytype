<template>
  <div id="app">
		<h1>my<span class=title>type</span></h1>
		<TheGame></TheGame>
  </div>
</template>

<script>
import TheGame from './components/TheGame.vue'

export default {
  name: 'App',
  components: {
    TheGame
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
	text-align: center;
}

body {
	background-color: #181A1B;
	color: #e8e6e3;
	font-size: 150%;
}

h1 {
	margin-bottom: 70px;
}

.title {
	color: #ff3498;
}


</style>
