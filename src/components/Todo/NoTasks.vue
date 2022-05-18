<template>
	<div class="no-tasks">
		<v-icon
			size="100"
			color="primary"
		>
			mdi-check
		</v-icon>

		<div class="text-h5 primary--text">Aucune tâche</div>
	</div>
</template>

<script>
	export default {
		name: "NoTasks"
	}
</script>

<style scoped>
	.no-tasks {
		position: absolute; top: 50%; left: 50%;

		text-align: center;

		opacity: 50%;

		transform: translate(-50%, -50%);
	}
</style>
