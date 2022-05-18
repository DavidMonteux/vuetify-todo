<template>
	<v-dialog
		:value="true"
		persistent
		max-width="290"
	>
		<v-card>
			<v-card-title class="text-h5">Supprimer une tâche ?</v-card-title>

			<v-card-text>Êtes-vous sur de vouloir supprimer cette tâche ?</v-card-text>

			<v-card-actions>
				<v-spacer></v-spacer>

				<v-btn
					@click="$emit('close')"
					color="grey darken-1"
					text
				>
					Non
				</v-btn>

				<v-btn
					@click.stop="$store.dispatch('deleteTask', task.id)"
					color="red darken-1"
					text
				>
					Oui
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
	export default {
		name: "DeleteDialog",
		props: ['task']
	}
</script>
