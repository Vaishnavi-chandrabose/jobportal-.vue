<template>
  <div>
    <h1>Home Page</h1>
    <CandidateTable :candidates="candidates" @deleteCandidate="deleteCandidate" @openEditCandidateModal="openEditCandidateModal" />
    <button @click="showAddCandidateModal = true">Add Candidate</button>

    <!-- Add Candidate Modal -->
    <div v-if="showAddCandidateModal" class="modal">
      <div class="modal-content">
        <h2>Add Candidate</h2>
        <AddCandidateForm @addCandidate="addCandidate" @closeModal="closeAddCandidateModal" />
      </div>
    </div>

    <!-- Edit Candidate Modal -->
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
  width: 100%; /* Set the width to 100% to take up the full width of the viewport */
  height: 100%; /* Set the height to 100% to take up the full height of the viewport */
  margin: 0;
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

</style>

