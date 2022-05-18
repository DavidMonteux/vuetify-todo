<template>
	<div>
		<!-- <v-list-item
			@click="$store.commit('doneTask', task.id)"
			:class="{ 'blue lighten-2': task.done }"
			:ripple="false"
		> -->
		<v-list-item
			@click="$store.dispatch('doneTask', task.id)"
			:class="{ 'blue lighten-2': task.done }"
			:ripple="false"
		>
			<!-- On enlève l'effet ondulation lors du clic sur un élément avec ripple="false" -->

			<template v-slot:default>
				<v-list-item-action>
					<v-checkbox
						:input-value="task.done"
						color="secondary"
					></v-checkbox>
				</v-list-item-action>

				<v-list-item-content>
					<v-list-item-title :class="{ 'text-decoration-line-through': task.done }">
						{{ task.title }}
					</v-list-item-title>
				</v-list-item-content>

				<v-list-item-action v-if="task.dueDate">
					<v-list-item-action-text>
						<v-icon small>mdi-calendar</v-icon>
						{{ task.dueDate | niceDate }}
					</v-list-item-action-text>
				</v-list-item-action>

				<v-list-item-action>
					<task-menu :task="task" />
				</v-list-item-action>

				<v-list-item-action v-if="$store.state.sorting">
					<v-btn
						color="primary"
						icon
						class="handle"
					>
						<!-- La classe 'handle' est utilisée par vuedraggable -->

						<v-icon>mdi-drag-horizontal-variant</v-icon>
					</v-btn>
				</v-list-item-action>
			</template>
		</v-list-item>

		<v-divider></v-divider>
	</div>
</template>

<script>
	import { format } from 'date-fns'

	export default {
		name: "Task",
		/*
		props: {
			task: {
				type:		Object,
				required:	true
			}
		}
		*/
			// Version simplifiée
		props: ['task'],
		components: { 'task-menu': require('@/components/Todo/TaskMenu.vue').default },
		filters: {
			niceDate(date) {

				return format(new Date(date), 'd/MMMM/y')

			}
		}
	}
</script>

<style scoped>
	/* - Amélioration visuelles du draggable - */

		/* On enlève l'effet de transparence lors du déplacement d'un élément */
	.sortable-ghost { opacity: 0; }

		/* On ajoute une ombre sur l'élément à déplacer */
	.sortable-drag { box-shadow: 0 0 10px rgba(0, 0, 0, 0.4); background-color: #f1f1f1; }
</style>
