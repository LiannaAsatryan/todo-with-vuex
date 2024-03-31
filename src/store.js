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
            state.todos[index].status = status
        }
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
        }
    },
    getters: {
        getTodos(state) {
            return state.todos
        }
    }
})

export default store
