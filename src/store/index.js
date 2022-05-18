import Vue			from 'vue'
import Vuex			from 'vuex'
import Localbase	from 'localbase'



Vue.use(Vuex)


let dataBase = new Localbase('db')
dataBase.config.debug = false		// On enlève les logs dus à l'utilisation de la bdd.


export default new Vuex.Store({
	state: {
		appTitle: process.env.VUE_APP_TITLE,
		search: null,
		tasks: [],
		snackbar: {
			show:	false,
			text:	""
		},
		sorting: false
	},
	getters: {
		tasksFiltered(state) {

			if(!state.search)
				return state.tasks
			else
				return state.tasks.filter(task => 
						task.title.toLowerCase().includes(state.search.toLowerCase())
					)

		}
	},
	mutations: {
			// Recherche
		setSearch(state, value) {

			state.search = value

		},
			// Tâches
		doneTask(state, id) {

			let task = state.tasks.filter(task => task.id === id)[0]

			task.done = !task.done

		},
		addTask(state, newTask) {

			/*
			let newTask = {
				id:		Date.now(),
				title:	newTaskTitle,
				done:	false,
				dueDate: null
			}
			*/
				// Déplacé dans l'action 'addTask'

			state.tasks.push(newTask)

		},
		deleteTask(state, id) {

			state.tasks = state.tasks.filter(task => task.id !== id)

		},
		updateTaskTitle(state, payload) {

			let task = state.tasks.filter(task => task.id === payload.id)[0]

			task.title = payload.title

		},
		updateTaskDueDate(state, payload) {

			let task = state.tasks.filter(task => task.id === payload.id)[0]

			task.dueDate = payload.dueDate

		},
		updateTasks(state, tasks) {

			state.tasks = tasks

		},
			// Snackbar
		showSnackbar(state, text) {

			let timeout = 0

			if(state.snackbar.show) {

				state.snackbar.show = false
				timeout = 300

			}


			setTimeout(() => {

				state.snackbar.show = true
				state.snackbar.text = text

			}, timeout)

		},
		hideSnackbar(state) {

			state.snackbar.show = false

		},
			// Sorting
		toggleSorting(state) {

			state.sorting = !state.sorting

		}
	},
	actions: {
		getTasks({ commit }) {

			dataBase.collection('tasks')
				.get()
				.then(tasks => {

						// Mettre à jour le state
					commit('updateTasks', tasks)

				})

		},
		doneTask({ state, commit }, id) {

			let task = state.tasks.filter(task => task.id === id)[0]


			dataBase.collection('tasks')
				.doc({ id: id })
				.update({ done: !task.done })
				.then(() => {

					commit('doneTask', id)

				})

		},
		addTask({ commit }, newTaskTitle) {

			let newTask = {
				id:		Date.now(),
				title:	newTaskTitle,
				done:	false,
				dueDate: null
			}


			dataBase.collection('tasks')
				.add(newTask)
				.then(() => {

					commit('addTask', newTask)

					commit('showSnackbar', "Tâche ajoutée !")

				})

		},
		deleteTask({ commit }, id) {

			dataBase.collection('tasks')
				.doc({ id: id })
				.delete()
				.then(() => {

					commit('deleteTask', id)

					commit('showSnackbar', "Tâche supprimée !")

				})

		},
		updateTaskTitle({ commit }, payload) {

			dataBase.collection('tasks')
				.doc({ id: payload.id })
				.update({ title: payload.title })
				.then(() => {

					commit('updateTaskTitle', payload)

					commit('showSnackbar', "Tâche modifiée !")

				})

		},
		updateTaskDueDate({ commit }, payload) {

			dataBase.collection('tasks')
				.doc({ id: payload.id })
				.update({ dueDate: payload.dueDate })
				.then(() => {

					commit('updateTaskDueDate', payload)

					commit('showSnackbar', "Date d'échéance modifiée !")

				})

		},
		updateTasks({ commit }, tasks) {

			dataBase.collection('tasks')
				.set(tasks)
				/*
				.then(() => {

					commit('updateTasks', tasks)

				})
				*/

			commit('updateTasks', tasks)
				// On ne met pas le 'commit' dans un .then(), pour éviter un bug graphique d'attente !

		}
	}
})
