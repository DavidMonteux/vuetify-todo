<template>
	<div class="todo">
		<!-- <field-add-task /> -->
			<!-- Déplacé dans 'app.vue' -->

		<list-tasks v-if="$store.state.tasks.length" />

		<no-tasks v-else />

		<button-done-sorting v-if="$store.state.sorting" />
	</div>
</template>

<script>
	export default {
		name: "TodoView",
			// Version simplifiée
		components: {
			// 'field-add-task': require('@/components/Todo/FieldAddTask.vue').default,
			'list-tasks': require('@/components/Todo/ListTasks.vue').default,
			'no-tasks': require('@/components/Todo/NoTasks.vue').default,
			'button-done-sorting': require('@/components/Todo/ButtonDoneSorting.vue').default
		}
	}
</script>
