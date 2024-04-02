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
      <button @click="showDeleteModal">Remove</button>
    </td>
    <td>{{ todo.date }}</td>
    <td>
      <button @click="editTodo">Edit</button>
    </td>
  </tr>
  <EditModal v-model:showModal="showModal" :task="editedTask" :index="index" :closeModal="closeModal"/>
  <DeleteConfirmationModal :isActive="isActive" :closeModal="closeConfirmationModal" :removeTodo="removeTodo"/>
</template>

<script setup>
import {ref, watch} from 'vue'
import {useStore} from 'vuex'
import EditModal from "./EditModal.vue";
import DeleteConfirmationModal from './DeleteConfirmationModal.vue'

const props = defineProps({
  todo: Object,
  index: Number,
  date: Date,
  id: Number,
})

const store = useStore()

const status = ref(props.todo.status)

const date = ref(props.todo.date)

const showModal = ref(false);
const editedTask = ref(props.todo.task);
const index = ref(props.index);
const isActive = ref(false);


const showDeleteModal = () => {
  console.log(isActive.value);
  isActive.value = true;
}


const editTodo = () => {
  showModal.value = true;
  editedTask.value = props.todo.task;
}



const updateStatus = () => {
  store.dispatch('updateTodoStatus', {index: props.index, status: status.value})
}

const removeTodo = () => {
  store.dispatch('removeTodo', props.index);
}

const closeModal = () => {
  showModal.value = false;
}

const closeConfirmationModal = () => {
  isActive.value = false;
}

watch(() => props.todo.status, (newValue) => {
  status.value = newValue
})
</script>
