<template>
	<div>
		<v-menu
			bottom
			left
		>
			<template v-slot:activator="{ on, attrs }">
				<v-btn
					v-bind="attrs"
					v-on="on"
					color="primary"
					icon
				>
					<v-icon>mdi-dots-vertical</v-icon>
				</v-btn>
			</template>

			<v-list>
				<v-list-item
					v-for="(item, index) in items" :key="index"
					@click="handleClick(index)"
				>
					<v-list-item-icon>
						<v-icon v-text="item.icon"></v-icon>
					</v-list-item-icon>

					<v-list-item-title>{{ item.title }}</v-list-item-title>
				</v-list-item>
			</v-list>
		</v-menu>

		<!-- Dialogues -->
		<edit-dialog
			v-if="dialogs.edit"
			:task="task"
			@close="dialogs.edit = false"
		/>

		<due-date-dialog
			v-if="dialogs.dueDate"
			:task="task"
			@close="dialogs.dueDate = false"
		/>

		<delete-dialog
			v-if="dialogs.delete"
			:task="task"
			@close="dialogs.delete = false"
		/>
	</div>
</template>

<script>
	export default {
		name: "TaskMenu",
			// Version simplifiée
		props: ['task'],
		components: {
			'delete-dialog': require('./Dialogs/DeleteDialog.vue').default,
			'edit-dialog': require('./Dialogs/EditDialog.vue').default,
			'due-date-dialog': require('./Dialogs/DueDateDialog.vue').default
		},
		data() {

			return {
				items: [
					{
						title: "Editer",
						icon: "mdi-pencil",
						click() { this.dialogs.edit = true }
					},
					{
						title: "Date d'échéance",
						icon: "mdi-calendar",
						click() { this.dialogs.dueDate = true }
					},
					{
						title: "Supprimer",
						icon: "mdi-delete",
						click() { this.dialogs.delete = true }
					},
					{
						title: "Tri",
						icon: "mdi-drag-horizontal-variant",
						// click() { this.$store.commit('toggleSorting') }
						click() {

							if(!this.$store.state.search)
								this.$store.commit('toggleSorting')
							else
								this.$store.commit('showSnackbar', "Comment OSEZ-vous essayer de trier en cherchant !")

						}
					}
				],
				dialogs: {
					edit:		false,
					dueDate:	false,
					delete:		false
				}
			}

		},
		methods: {
			handleClick(index) {

				// this.items[index].click()
				this.items[index].click.call(this)	// On passe le 'this' à la fonction appellée 'click()'.

			}
		}
	}
</script>
