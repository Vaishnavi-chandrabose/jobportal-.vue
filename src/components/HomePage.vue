<template>
  <div>
    <h1>Home Page</h1>
    <CandidateTable :candidates="candidates" @deleteCandidate="deleteCandidate" @openEditCandidateModal="openEditCandidateModal" />
    <button @click="showAddCandidateModal = true">Add Candidate</button>

    <div v-if="showAddCandidateModal" class="modal">
      <div class="modal-content">
        <h2>Add Candidate</h2>
        <AddCandidateForm @addCandidate="addCandidate" @closeModal="closeAddCandidateModal" />
      </div>
    </div>

    <div v-if="showEditCandidateModal" class="modal">
      <div class="modal-content">
        <EditCandidate :candidateData="JSON.parse(JSON.stringify(selectedCandidateData))" @updateCandidate="updateCandidateRow" @closeModal="closeEditCandidateModal" />
      </div>
    </div>
  </div>
</template>

<script>
import CandidateTable from '../components/CandidateTable.vue';
import AddCandidateForm from '../components/AddCandidateForm.vue';
import EditCandidate from '../components/EditCandidate.vue';

export default {
  data() {
    return {
      candidates: JSON.parse(localStorage.getItem('candidates') || '[]'),
      showAddCandidateModal: false,
      showEditCandidateModal: false,
      selectedCandidateData: null,
    };
  },
  components: {
    CandidateTable,
    AddCandidateForm,
    EditCandidate,
  },
  methods: {
    addCandidate(newCandidate) {
      this.candidates.push(newCandidate);
      this.saveCandidatesToLocalStorage();
    },
    deleteCandidate(index) {
      this.candidates.splice(index, 1);
      this.saveCandidatesToLocalStorage();
    },
    
     updateCandidateRow(updatedCandidate) {
      const index = this.candidates.findIndex((candidate) => candidate.id === updatedCandidate.id);
      if (index !== -1) {
        this.candidates[index] = updatedCandidate;
        this.saveCandidatesToLocalStorage();
      }
    },
    saveCandidatesToLocalStorage() {
      localStorage.setItem('candidates', JSON.stringify(this.candidates));
    },
    closeAddCandidateModal() {
      this.showAddCandidateModal = false;
    },
   
  openEditCandidateModal(candidateData) {
    this.selectedCandidateData = JSON.parse(JSON.stringify(candidateData)); // Create a copy
    this.showEditCandidateModal = true;
  },
    closeEditCandidateModal() {
      this.showEditCandidateModal = false;
      this.selectedCandidateData = null;
    },
  },
};
</script>

<style>
/* Your CSS styles... */
</style>



<style>
#app {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

button {
  margin: 10px 0;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th,
td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ccc;
}

th {
  background-color: #6495ed;
  color: white;
}

tr:hover {
  background-color: #f5f5f5;
}
</style>

