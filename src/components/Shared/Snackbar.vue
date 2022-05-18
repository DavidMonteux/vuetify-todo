<template>
	<v-snackbar v-model="$store.state.snackbar.show">
		{{ $store.state.snackbar.text }}

		<template v-slot:action="{ attrs }">
			<v-btn
				v-bind="attrs"
				@click="$store.commit('hideSnackbar')"
				text
				color="primary"
			>
				Fermer
			</v-btn>
		</template>
	</v-snackbar>
</template>

<script>
	export default {
		name: "Snackbar"
	}
</script>

<style>
	/* Fixer le problème d'affichage avec les mobiles */
	div.v-snack:not(.v-snack--absolute) { height: 100%; }
</style>
