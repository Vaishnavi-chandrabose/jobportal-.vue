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
        <EditCandidate :candidateData="selectedCandidateData" :key="selectedCandidateData.id" @updateCandidate="updateCandidateRow" @closeModal="closeEditCandidateModal" />
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
    updateCandidateRow(candidateId, updatedCandidate) {
      const index = this.candidates.findIndex((candidate) => candidate.id === candidateId);
      if (index !== -1) {
        this.candidates[index] = { ...updatedCandidate };
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
      this.selectedCandidateData = { ...candidateData };
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
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

html, body {
  height: 100%;
  margin: 0;
  padding: 0;
}

.home-page {
height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

#app {
  width: 100%;
  height: 100%; 
  margin: 0;
  padding: 20px;
  font-family: 'Roboto', sans-serif; 
}
button {
  display: block;
  margin: 0 auto;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
}
button:hover {
  background-color: #0056b3;
}

h1 {
  text-align: center;
  margin-bottom: 10px;
  font-family: 'Roboto', sans-serif;
  font-size: 30px;
  font-weight: 700; 
  color: #333; 
  background-color: #FFA07A; 
  padding: 10px; 
  border-radius: 2px; 
}

</style>

