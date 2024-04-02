<template>
  <div class="modal-overlay" :class="{ 'active': isActive }" @click="cancelDelete">
    <div class="modal-container" @click.stop>
      <p>Are you sure you want to delete the item?</p>
      <div class="buttons">
        <button class="btn" @click="confirmDelete">Yes</button>
        <button class="btn" @click="cancelDelete">No</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  removeTodo: Function,
  isActive: Boolean,
  closeModal: Function,
})


const confirmDelete = () => {
  props.removeTodo();
  props.closeModal();
}

const cancelDelete = () => {
  props.closeModal();
}

</script>




<style lang="scss" scoped>

.modal-overlay {
  &.active {
    display: block;
  }

  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
}

.modal-container {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  .buttons {
    display: flex;
    justify-content: center;
    gap: 15px;

    .btn {
      padding: 10px 20px;
      background-color: #403029;
      color: #FFFFFF;
      border: none;
      border-radius: 3px;
      cursor: pointer;
      margin-top: 20px;
      min-width: 30px;
      font-size: 15px;

      &:hover {
        background-color: darken(#403029, 20%);
      }
    }
  }
}
</style>
