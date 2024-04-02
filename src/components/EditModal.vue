<template>
  <div v-if="showModal" class="modal-overlay" @click="closeModal">
    <div class="modal-container" @click.stop>
      <p>You can change the task name !</p>
      <input v-model="editedTask" type="text" />
      <button @click="saveEditedTask">Save</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {useStore} from 'vuex'



const props = defineProps({
  showModal: Boolean,
  task: String,
  index: Number,
  closeModal: Function,
})

const editedTask = ref(props.task);

const closeModal = () => {
  if (typeof props.closeModal === 'function') {
    props.closeModal();
  }
}

const saveEditedTask = () => {
  store.dispatch('updateTodoTask', { index: props.index, task: editedTask });
  closeModal();
}
const store = useStore()

</script>


<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: flex-start;
  align-items: center;
  z-index: 3;

  .modal-container {
    width: 40%;
    height: 100vh;
    background-color: white;
    padding: 10px;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    margin-left: 0;
    z-index: 4;

    p {
      font-size: 30px;
      font-weight: 700;
    }

    input {
      margin-inline: auto;
      width: 90%;
      margin-top: 50px;
      margin-bottom: 10px;
      border: 2px solid #403029;
      height: 40px;
      font-size: 20px;
    }

    button {
      padding: 10px 20px;
      background-color: #403029;
      color: #FFFFFF;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      margin-top: 20px;
      min-width: 100px;
      font-size: 20px;

      &:hover {
        background-color: darken(#403029, 20%);
      }
    }
  }
}
</style>