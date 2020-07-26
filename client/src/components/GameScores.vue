<template>
	<div>
		<h4>Top scores for this text</h4>
		<div class=container>
			<table>
				<tr>
					<th>rank</th>
					<th>username</th>
					<th>wpm</th>
				</tr>
				<tr v-for="(highscore,index) in highscores.list" :key="index">
					<td>{{ index + 1}}</td>
					<td>{{ highscore.username }}</td>
					<td>{{ highscore.wpm }}</td>
				</tr>
			</table>
		</div>
	</div>
</template>

<script>
export default {
  name: 'GameScores',

	props: {
		highscores: String
	},
}
</script>

<style scoped>

table {
	margin: auto;
}

th, td {
	padding-left: 5px;
	padding-right: 5px;
}

.container {
	width: 40%;
	margin: auto;
	padding: 8px;
	border-radius: 4px;
	background-color: #1c1e1f;
	color: #e8e6e3;
}

h3 {
  margin: 40px 0 0;
}

</style>
