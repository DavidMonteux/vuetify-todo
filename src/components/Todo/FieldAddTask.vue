<template>
	<!-- <v-text-field
		v-model="newTaskTitle"
		@keyup.enter="addTask"
		outlined
		filled
		label="Ajouter une tâche"
		clearable
		class="pa-3"
		hide-details
	> -->
	<v-text-field
		v-model="newTaskTitle"
		@keyup.enter="addTask"
		outlined
		filled
		clearable
		class="pa-3 field-add-task"
		placeholder="Ajouter une tâche"
		hide-details
	>
		<template v-slot:append>
			<v-icon
				@click="addTask"
				:disabled="newTaskTitleInvalid"
			>
				<!-- color="primary" -->

				mdi-plus
			</v-icon>
		</template>
	</v-text-field>
</template>

<script>
	export default {
		name: "FieldAddTask",
		data() {

			return { newTaskTitle: "" }

		},
		computed: {
			newTaskTitleInvalid() {

				return !this.newTaskTitle

			}
		},
		methods: {
			addTask() {

				if(!this.newTaskTitleInvalid) {

					this.$store.dispatch('addTask', this.newTaskTitle)

					this.newTaskTitle = ""

				}

			}
		}
	}
</script>

<style lang="sass">
	.field-add-task.v-input--is-focused
		// .v-text-field__slot
		.v-input__slot
			// background: black!important
			background: rgba(31, 94, 129, 0.6)!important
</style>
