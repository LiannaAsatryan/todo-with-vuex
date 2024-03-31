<template>
  <div>
    <div class="input-container">
      <input class="header-input-field" v-model="newTodo" placeholder="Add new todo" />
      <div class="buttons">
        <button class="add-button" @click="addTodo">Add Task</button>
        <select class="filter" v-model="filter">
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="in process">In Process</option>
          <option value="completed">Completed</option>
        </select>
      </div>
    </div>

    <table class="todo-list-table" v-if="filteredTodos.length > 0">
      <thead>
      <tr>
        <th class="col-header">Task</th>
        <th class="col-header">Status</th>
        <th class="col-header">Action</th>
      </tr>
      </thead>
      <tbody>
        <todo-item v-for="(todo, index) in filteredTodos" :key="index" :todo="todo" :index="index" />
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import TodoItem from './TodoItem.vue'

const store = useStore()

const newTodo = ref('')
const filter = ref('all')

const addTodo = () => {
  if(newTodo.value !== '') {
    store.dispatch('addTodo', { task: newTodo.value, status: 'pending' })
    newTodo.value = ''
  }
}

const filteredTodos = computed(() => {
  if (filter.value === 'all') {
    return store.getters.getTodos
  } else {
    return store.getters.getTodos.filter(todo => todo.status === filter.value)
  }
})
</script>
