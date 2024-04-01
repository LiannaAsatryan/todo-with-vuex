<template>
  <tr>
    <td>{{ todo.id }}</td>
    <td>{{ todo.task }}</td>
    <td>
      <select v-model="status" @change="updateStatus">
        <option value="pending">Pending</option>
        <option value="in process">In Process</option>
        <option value="completed">Completed</option>
      </select>
    </td>
    <td>
      <button @click="removeTodo">Remove</button>
    </td>
    <td>{{ todo.date }}</td>
  </tr>
</template>

<script setup>
import {ref, watch} from 'vue'
import {useStore} from 'vuex'

const props = defineProps({
  todo: Object,
  index: Number,
  date: Date,
  id: Number,
})

const store = useStore()

const status = ref(props.todo.status)

const date = ref(props.todo.date)

const updateStatus = () => {
  store.dispatch('updateTodoStatus', {index: props.index, status: status.value})
}

const removeTodo = () => {
  store.dispatch('removeTodo', props.index)
}


watch(() => props.todo.status, (newValue) => {
  status.value = newValue
})
</script>
