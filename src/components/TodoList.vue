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
        <input class="search-field" @keyup.enter="searchedWord = $event.target.value" placeholder="search by name" style="height: 40px;" />
      </div>
    </div>

    <table class="todo-list-table" v-if="filteredTodos.length > 0">
      <thead>
      <tr>
        <th class="col-header">
          <button @click="sortTodos('id', 'asc')">
            <img src="./icons/up-arrow.png" style="width: 5px; height: 10px" alt="up">
          </button>
          <button @click="sortTodos('id', 'desc')">
            <img src="./icons/up-arrow.png" style="transform: rotate(180deg); width: 5px; height: 10px" alt="up">
          </button>
          Id</th>
        <th class="col-header">
          <button @click="sortTodos('task', 'asc')">
            <img src="./icons/up-arrow.png" style="width: 5px; height: 10px" alt="up">
          </button>
          <button @click="sortTodos('task', 'desc')">
            <img src="./icons/up-arrow.png" style="transform: rotate(180deg); width: 5px; height: 10px" alt="up">
          </button>
          Task</th>
        <th class="col-header">Status</th>
        <th class="col-header">Action</th>
        <th class="col-header">
          <button @click="sortTodos('date', 'asc')">
            <img src="./icons/up-arrow.png" style="width: 5px; height: 10px" alt="up">
          </button>
          <button @click="sortTodos('date', 'desc')">
            <img src="./icons/up-arrow.png" style="transform: rotate(180deg); width: 5px; height: 10px" alt="up">
          </button>
          Date</th>
      </tr>
      </thead>
      <tbody>
        <todo-item v-for="(todo, index) in filteredTodos" :todo="todo" :index="index" />
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import TodoItem from './TodoItem.vue'

const store = useStore();

const newTodo = ref('');
const filter = ref('all');
const orderBy = ref('id');
let taskId = 1;
const searchedWord = ref('');


const searchTodo = () => {
  filter.value = 'all';

  if(searchedWord.value === '') {
    return;
  }

  //filteredTodos = computed(() => {store.getters.getTodos.filter(todo => todo.task.toLowerCase().includes(searchedWord.toLowerCase()))});
}


const addTodo = () => {
  if(newTodo.value !== '') {
    store.dispatch('addTodo', { task: newTodo.value, status: 'pending', date: new Date().toLocaleString(), id: taskId++ });
    newTodo.value = '';
  }
}

const sortTodos = (field, order) => {
  store.getters.getTodos.sort((a, b) => {
    const fieldA = a[field];
    const fieldB = b[field];

    if (order === 'asc') {
      if (fieldA < fieldB) return -1;
      if (fieldA > fieldB) return 1;
      return 0;
    } else if (order === 'desc') {
      if (fieldA > fieldB) return -1;
      if (fieldA < fieldB) return 1;
      return 0;
    }
  });
}

let filteredTodos = computed(() => {
  let todos = store.getters.getTodos;

  if(searchedWord.value !== '') {
    todos = todos.filter(todo => todo.task.toLowerCase().includes(searchedWord.value.toLowerCase()))
  }

  if (filter.value !== 'all') {
    todos = todos.filter(todo => todo.status === filter.value)
  }

  return todos;
})
</script>
