<template>
	<!-- Wireframe -->
	<v-app id="inspire">

		<!-- Dossier de navigation -->
		<v-navigation-drawer
			v-model="drawer"
			app
			:mobile-breakpoint="768"
		>
			<!-- mobile-breakpoint : Permet de gérer l'ouverture automatique du dossier -->

			<v-img
				src="mountains.jpg"
				height="170"
				gradient="to top right, rgba(19, 84, 122, 0.5), rgba(128, 208, 199, 0.8)"
				class="pa-4 pt-7"
			>
				<v-avatar
					size="70"
					class="mb-2"
				>
					<img src="https://s.gravatar.com/avatar/ce7f3697e231df38b3ca6065848520da?s=160" alt="Danny Connell" />
				</v-avatar>

				<div class="text-subtitle-1 font-weight-bold white--text">
					Danny Connell
				</div>

				<div class="text-subtitle-2 white--text">danny__connell</div>
			</v-img>

			<v-divider></v-divider>

			<v-list
				dense
				nav
			>
				<v-list-item
					v-for="item in items" :key="item.title"
					link
					:to="item.to"
				>
					<v-list-item-icon>
						<v-icon>{{ item.icon }}</v-icon>
					</v-list-item-icon>

					<v-list-item-content>
						<v-list-item-title>{{ item.title }}</v-list-item-title>
					</v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>

		<!-- Entête -->
		<!-- <v-app-bar
			app
			prominent
			height="170"
			color="primary"
			dark
			src="mountains.jpg"
		> -->
		<!-- <v-app-bar
			app
			prominent
			height="235"
			color="primary"
			dark
			src="mountains.jpg"
		> -->
		<v-app-bar
			app
			prominent
			:height="$route.path === '/' ? 235 : 170"
			color="primary"
			dark
			src="mountains.jpg"
		>
			<template v-slot:img="{ props }">
				<!-- <v-img
					v-bind="props"
					gradient="to top right, rgba(19, 84, 122, 0.5), rgba(128, 208, 199, 0.8)"
				></v-img> -->
				<v-img
					v-bind="props"
					gradient="to top right, rgba(19, 84, 122, 0.7), rgba(128, 208, 199, 1)"
				></v-img>
			</template>

			<!-- Grille -->
			<v-container class="header-container pa-0">
				<v-row>
					<v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

					<v-spacer></v-spacer>

					<search />
				</v-row>

				<v-row>
					<v-app-bar-title class="ml-4 text-h4">
						{{ $store.state.appTitle }}
					</v-app-bar-title>
				</v-row>

				<v-row>
					<live-date-time />
				</v-row>

				<v-row v-if="$route.path === '/'">
					<field-add-task />
				</v-row>
			</v-container>
		</v-app-bar>

		<v-main>
			<router-view />

			<snackbar />
		</v-main>
	</v-app>
</template>

<script>
	export default {
		name: "App",
		components: {
			'snackbar': require('@/components/Shared/Snackbar.vue').default,
			'search': require('@/components/Tools/Search.vue').default,
			'live-date-time': require('@/components/Tools/LiveDateTime.vue').default,
			'field-add-task': require('@/components/Todo/FieldAddTask.vue').default
		},
		data: () => ({
			drawer: null,
			items: [
				{ title: "Todo",     to: "/",      icon: "mdi-format-list-checks" },
				{ title: "A propos", to: "/about", icon: "mdi-help-box"           },
			]
		}),
		mounted() {

			this.$store.dispatch('getTasks')

		}
	}
</script>

<style>
	.header-container { max-width: none!important; }
		/* Pour supprimer le problème d'alignement */
</style>
