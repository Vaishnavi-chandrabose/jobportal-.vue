<template>
  <div>
    <table class="fulwidth">
      <thead>
        <tr>
          <th>Name</th>
          <th>Position</th>
          <th>Gender</th>
          <th>Location</th>
          <th>Experience</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(candidate, index) in candidates" :key="candidate.id">
          <td>{{ candidate.name }}</td>
          <td>{{ candidate.position }}</td>
          <td>{{ candidate.gender }}</td>
          <td>{{ candidate.location }}</td>
          <td>{{ candidate.experience }}</td>
          <td>
            <DeleteCandidateButton @deleteCandidate="deleteCandidate(index)" />
            <button @click="showEditModal(candidate, index)">Update</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="showEditCandidateModal" class="modal">
      <div class="modal-content">
        <EditCandidate
          :candidateData="selectedCandidateData"
          @updateCandidate="updateCandidateRow"
          @closeModal="closeEditCandidateModal"
        />
      </div>
    </div>
  </div>
</template>

<script>
import DeleteCandidateButton from './DeleteCandidateButton.vue';
import EditCandidate from './EditCandidate.vue';

export default {
  props: {
    candidates: {
      type: Array,
      required: true,
    },
  },
  components: {
    DeleteCandidateButton,
    EditCandidate,
  },
  data() {
    return {
      showEditCandidateModal: false,
      selectedCandidateData: null,
      selectedCandidateIndex: null,
    };
  },
  methods: {
    deleteCandidate(index) {
      this.$emit('deleteCandidate', index);
    },
    showEditModal(candidateData, index) {
      this.selectedCandidateData = { ...candidateData };
      this.selectedCandidateIndex = index;
      this.showEditCandidateModal = true;
    },
    updateCandidateRow(updatedCandidate) {
      this.candidates[this.selectedCandidateIndex] = { ...updatedCandidate };
      this.saveCandidatesToLocalStorage();
      this.closeEditCandidateModal();
    },
    saveCandidatesToLocalStorage() {
      localStorage.setItem('candidates', JSON.stringify(this.candidates));
    },
    closeEditCandidateModal() {
      this.showEditCandidateModal = false;
      this.selectedCandidateData = null;
      this.selectedCandidateIndex = null;
    },
  },
};
</script>




<style>
.fulwidth{
 width:1500px;

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