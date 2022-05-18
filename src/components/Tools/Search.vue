<template>
	<!-- <v-text-field
		:value="$store.state.search"
		@input="$store.commit('setSearch', $event)"
		@focus="searchClosed = false"
		@blur="searchClosed = true"
		placeholder="Recherche"
		prepend-inner-icon="mdi-magnify"
		filled
		dense
		clearable
		class="expanding-search mt-1"
		:class="{ 'closed': searchClosed && !$store.state.search }"
	> -->
	<v-text-field
		:value="$store.state.search"
		@input="$store.commit('setSearch', $event)"
		@focus="searchClosed = false"
		@blur="searchClosed = true"
		placeholder="Recherche"
		prepend-inner-icon="mdi-magnify"
		filled
		dense
		clearable
		class="expanding-search mt-1"
		:class="{ 'closed': searchClosed && !$store.state.search }"
		:disabled="$store.state.sorting"
	>
	</v-text-field>
</template>

<script>
	export default {
		name: "Search",
		data() {

			return { searchClosed:	true }

		}
	}
</script>

<style lang="scss" scoped>
	.expanding-search {
		transition: max-width 0.3s;

		&.closed { max-width: 45px; }
	}
</style>
