<template>
	<div>
		<div class=textBox>
			<span v-for="(word,index) in listOfWords"
					:key="index"
					:id="index"
					:class="{
					'current': index === currentWord,
					'wrong': index === currentWord && !word.startsWith(content),
					'right': index < currentWord || win
					}">
				{{ word }}
			</span>
		</div>
		<input type="text" ref="typingBox" autocomplete="off" v-model="content"
		@keydown.space="checkWord($event)" autofocus>
			<div v-if="win">
				{{ wordsPerMinute }} wpm
				<button @click="resetData"> Play Again </button>
				<br>
				<input placeholder="Name" maxlength="5" type="text" v-model="username">
				<br>
				<button :disabled="username.length === 0" @click.once="postScore"
								v-if="!submitted">
					Submit Score </button>
			</div>
		<transition name="fade">
			<GameScores v-if="showHighScore" :highscores=highscores></GameScores>
		</transition>
	</div>
</template>

<script>
import service from "../service";
import GameScores from "./GameScores.vue";

export default {
  name: 'TheGame',

	components: {
		GameScores,
	},
  
  data() {
    return {
			showHighScore: false,
			text: { text: ""},
			currentWord: 0,
			content: "",
			time: 0,
			started: false,
			username: "",
			submitted: false,
			highscores: {},
    }
  },

	methods: {
		checkWord: function(event) {
			if (this.content === this.listOfWords[this.currentWord]) {
				event.preventDefault();
				this.content = "";
				this.currentWord += 1
			}
		},

		startTimer: function() {
			if (!this.started) {
				this.started = true
				let context = this;
				let id = setInterval(function() {
					context.time += 0.1;
					if (context.win) {
						clearInterval(id);
					}
				}, 100);
			}
		},

		resetData: async function() {
			this.text = await service.getText();
			this.currentWord = 0;
			this.content = "";
			this.time = 0;
			this.started = false;
			this.showHighScore = false;
			this.submitted = false;
			this.highscores = {};
		},

		postScore: async function() {
			let l = await service.postScore(this.username, this.text.text_id,this.wordsPerMinute)
				.then(() => service.deleteScores(this.text.text_id))
				.then(() => service.getScores(this.text.text_id));

			this.submitAndUpdate(l);
		},

		submitAndUpdate: function(l) {
			this.$set(this.highscores, "list", l);
			this.submitted = true;
			this.showHighScore = true;

		},


	},


	computed: {
		win: function() {
			if (this.text.text === "") {
				return false;
			}
			else {
				return this.currentWord === this.listOfWords.length-1 && this.content
				=== this.listOfWords[this.currentWord]
			}
		},
		listOfWords: function() {
			return this.text.text.replace("\r","").split(" ");
		},

		wordsPerMinute: function() {
			return Math.ceil((this.text.text.length/5) / (this.time/60));
		},


	},

	watch: {
		win: function() {
			this.$nextTick( () => {
				let typingBox = this.$refs.typingBox;
				if (this.win) {
					typingBox.disabled = true;
				}
				else {
					typingBox.disabled = false;
					typingBox.focus()

				}
			});
		},

		content: function() {
			if (this.content.length !== 0) {
				this.startTimer();
			}

		}
	},


	async created() {
		this.text = await service.getText();
	}

}

</script>

<style scoped>

.current {
	color: #8bd3c5;
}

.wrong {
	color: #e1616c;
}

.right {
	color: #98d96e;
}

.fade-enter-active {
	transition: opacity .5s;
}

.fade-enter {
	opacity: 0;
}

h3 {
  margin: 40px 0 0;
}

input {
	border: none;
	padding: 8px;
	border-radius: 4px;
	width: 40%;
	margin-top: 20px;
	margin-bottom: 20px;
}

input[type="text"], textarea {
	background-color: #1c1e1f;
	color: #e8e6e3;
	font-size: 100%;
}

input:focus {
	outline: none;
}

button {
	border-radius: 4px;
	border: none;
	padding: 8px;
	background-color: #cc0065;
	cursor: pointer;
	margin: 10px;
	color: #e8e6e3;
	font-size: 100%;
}

button:focus {
	outline: none;
}

.textBox {
	width: 40%;
	padding: 8px;
	margin: auto;
	text-align: left;
}

.hidden {
	display: hidden;
}

</style>
