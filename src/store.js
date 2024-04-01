import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            todos: []
        }
    },
    mutations: {
        addTodo(state, todo) {
            state.todos.push(todo)
        },
        removeTodo(state, index) {
            state.todos.splice(index, 1)
        },
        updateTodoStatus(state, { index, status }) {
            state.todos[index].status = status;
        },
        updateTodoDate(state, { index, date }) {
            state.todos[index].date = date;
        },
        // searchTodos(state, searchedWord) {
        //     state.todos = state.todos.filter(todo => todo.task.toLowerCase().includes(searchedWord.toLowerCase()));
        // },
    },
    actions: {
        addTodo({ commit }, todo) {
            commit('addTodo', todo)
        },
        removeTodo({ commit }, index) {
            commit('removeTodo', index)
        },
        updateTodoStatus({ commit }, payload) {
            commit('updateTodoStatus', payload)
        },
        updateTodoDate({ commit }, payload) {
            commit('updateTodoDate', payload)
        }
    },
    getters: {
        getTodos(state) {
            return state.todos
        }
    }
})

export default store
