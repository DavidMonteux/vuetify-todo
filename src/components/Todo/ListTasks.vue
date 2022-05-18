<template>
	<v-list
		flat
		class="pt-0"
	>
		<draggable
			v-model="tasks"
			handle=".handle"
		>
			<!-- handle : Sert à repérer le bouton de déplacement. -->

			<task v-for="task in tasks" :key="task.id"
				:task="task"
			/>
		</draggable>
	</v-list>
</template>

<script>
	import draggable from 'vuedraggable'

	export default {
		name: "ListTasks",
		components: {
			'task': require('@/components/Todo/Task.vue').default,
			draggable
		},
		computed: {
			tasks: {
				get() {

					return this.$store.getters.tasksFiltered

				},
				set(value) {

					this.$store.dispatch('updateTasks', value)

				}
			}
		}
	}
</script>
