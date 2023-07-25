<template>
       
  
  <button  @click="showConfirmation">Delete</button>
   <Confirmation v-if="showModal" @confirmed="deleteCandidate" @cancelled="closeModal" />
</template>

<script>
import Confirmation from './Confirmation.vue';
import EditCandidate from'../components/EditCandidate.vue';

export default {
  components: {
    Confirmation,
    EditCandidate,
  },
  data() {
    return {
      showModal: false, 
    };
  },
  methods: {
    showConfirmation() {
      this.showModal = true; 
    },
    deleteCandidate() {
      this.$emit('deleteCandidate');
      this.closeModal();
    },
    closeModal() {
      this.showModal = false; 
    },
  },
};
</script>








<style>
.delete-link {
  display: inline-block;
  padding: 8px 16px;
  background-color: #dc3545;
  color: #008B8B;
  text-decoration: none;
  border-radius: 4px;
}

.delete-link:hover {
  background-color: #c82333;
}

.delete-link:active {
  background-color:  #008B8B;
}
</style>
