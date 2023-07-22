<template>
  <div>
    <h1>Home Page</h1>
    <CandidateTable :candidates="candidates" @deleteCandidate="deleteCandidate" />
    <button @click="showAddCandidateModal = true">Add Candidate</button>

    <!-- Modal -->
    <div v-if="showAddCandidateModal" class="modal">
      <div class="modal-content">
        <h2>Add Candidate</h2>
        <AddCandidateForm @addCandidate="addCandidate" @closeModal="closeAddCandidateModal" />
      </div>
    </div>
  </div>
</template>

<script>
import CandidateTable from '../components/CandidateTable.vue';
import AddCandidateForm from '../components/AddCandidateForm.vue';

export default {
  data() {
    return {
      candidates: JSON.parse(localStorage.getItem('candidates') || '[]'),
      showAddCandidateModal: false, 
    };
  },
  components: {
    CandidateTable,
    AddCandidateForm,
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
    saveCandidatesToLocalStorage() {
      localStorage.setItem('candidates', JSON.stringify(this.candidates));
    },
    closeAddCandidateModal() {
      this.showAddCandidateModal = false; 
    },
  },
};
</script>


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

