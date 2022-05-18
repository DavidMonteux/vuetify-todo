<template>
	<v-dialog
		:value="true"
		:return-value.sync="date"
		persistent
		width="300px"
		ref="dialog"
	>
		<v-date-picker
			v-model="date"
			scrollable
		>
			<v-spacer></v-spacer>

			<v-btn
				@click="$emit('close')"
				text
				color="grey"
			>
				Annuler
			</v-btn>

			<v-btn
				@click="saveDate"
				text
				color="primary"
			>
				Enregistrer
			</v-btn>
		</v-date-picker>
	</v-dialog>
</template>

<script>
	export default {
		name: "DueDateDialog",
		props: ['task'],
		data() {

			return { date: null }

		},
		methods: {
			saveDate() {

				let payload = {
					id:			this.task.id,
					dueDate:	this.date
				}

				this.$store.dispatch('updateTaskDueDate', payload)

				this.$emit('close')

			}
		},
		mounted() {

			if(this.task.dueDate)
				this.date = this.task.dueDate

		}
	}
</script>
