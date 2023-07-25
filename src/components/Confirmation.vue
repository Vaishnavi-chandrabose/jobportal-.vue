<template>
  <div class="modal">
    <div class="modal-content">
      <p>Are you sure you want to delete the candidate?</p>
      <div class="modal-buttons">
        <button @click="confirmDelete">Delete</button>
        <button @click="cancelDelete">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    confirmDelete() {
      this.$emit('confirmed');
    },
    cancelDelete() {
      this.$emit('cancelled');
    },
  },
};
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 4px;
  
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 16px;
}

button {
  padding: 8px 16px;
  margin-left: 8px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:nth-child(1) {
  background-color: #9400D3;
  color: #fff;
}

button:nth-child(2) {
  background-color: #FF1493;
  color: #fff;
}
</style>
