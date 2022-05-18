<template>
	<v-dialog
		:value="true"
		persistent
		max-width="290"
	>
		<v-card>
			<v-card-title class="text-h5">Modifier une tâche</v-card-title>

			<v-card-text>
				Modifier le titre de cette tâche

				<v-text-field
					v-model="taskTitle"
					@keyup.enter="saveTask"
				/>
			</v-card-text>

			<v-card-actions>
				<v-spacer></v-spacer>

				<v-btn
					@click="$emit('close')"
					color="grey darken-1"
					text
				>
					Annuler
				</v-btn>

				<v-btn
					@click.stop="saveTask"
					color="red darken-1"
					text
					:disabled="taskTitleInvalid"
				>
					Enregistrer
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
	export default {
		name: "EditDialog",
		props: ['task'],
		emits: ['close'],
		data() {

			return { taskTitle: null }

		},
		computed: {
			taskTitleInvalid() {

				return !this.taskTitle || this.taskTitle === this.task.title

			}
		},
		methods: {
			saveTask() {

				// On peut sauvegarder si validation lors du clic sur 'Enregistrer' ou lors de l'appui sur la touche 'Entrer'
				if(!this.taskTitleInvalid) {

					let payload = {
						id:		this.task.id,
						title:	this.taskTitle
					}

					this.$store.dispatch('updateTaskTitle', payload)

					this.$emit('close')

					// Mettre le scrolling en position haute
					this.$vuetify.goTo(0, { duration: 0 })

				}

			}
		},
		mounted() {

			this.taskTitle = this.task.title

		}
	}
</script>
