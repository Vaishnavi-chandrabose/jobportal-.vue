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
import axios from 'axios';

export default {
  data() {
    return {
      candidates: [], // Initialize candidates as an empty array
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
    async getJobs() {
      try {
        const accessToken = await this.getMongoDBToken();
        if (!accessToken) {
          console.log('Failed to get MongoDB access token. Unable to fetch job data.');
          return;
        }

        let data = JSON.stringify({
          dataSource: 'Cluster0',
          database: 'job_portal_db',
          collection: 'job_portal_table',
          filter: {},
        });

        let config = {
          method: 'post',
          url: 'https://ap-south-1.aws.data.mongodb-api.com/app/data-fhzlj/endpoint/data/v1/action/find',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
          },
          data: data,
        };

        const response = await axios.request(config);
        this.mongoData = response.data.documents;
        console.log('Job data fetched successfully:', response.data.documents);
      } catch (error) {
        console.log('API Error:', error);
      }
    },
    async getMongoDBToken() {
      
      let refresh_token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJiYWFzX2RhdGEiOm51bGwsImJhYXNfZGV2aWNlX2lkIjoiMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAwIiwiYmFhc19kb21haW5faWQiOiI2NGEyOWI1NmYzNmE3ZjI4NmUzZmRkODUiLCJiYWFzX2lkIjoiNjRiNzUwODMyYjEyYjI4ZmRiNDMxMTM1IiwiYmFhc19pZGVudGl0eSI6eyJpZCI6IjY0YjYzMTU3ZjY1NjU4MzM1YzI2NDhiZCIsInByb3ZpZGVyX3R5cGUiOiJhcGkta2V5IiwicHJvdmlkZXJfaWQiOiI2NGEyOWI2MWYzNmE3ZjI4NmUzZmUwZmIifSwiZXhwIjoxNjk0OTE5Mjk5LCJpYXQiOjE2ODk3MzUyOTksInN0aXRjaF9kYXRhIjpudWxsLCJzdGl0Y2hfZGV2SWQiOiIwMDAwMDAwMDAwMDAwMDAwMDAwMDAwMDAiLCJzdGl0Y2hfZG9tYWluSWQiOiI2NGEyOWI1NmYzNmE3ZjI4NmUzZmRkODUiLCJzdGl0Y2hfaWQiOiI2NGI3NTA4MzJiMTJiMjhmZGI0MzExMzUiLCJzdGl0Y2hfaWRlbnQiOnsiaWQiOiI2NGI2MzE1N2Y2NTY1ODMzNWMyNjQ4YmQiLCJwcm92aWRlcl90eXBlIjoiYXBpLWtleSIsInByb3ZpZGVyX2lkIjoiNjRhMjliNjFmMzZhN2YyODZlM2ZlMGZiIn0sInN1YiI6IjY0YjYzMTU3ZjY1NjU4MzM1YzI2NDhiYiIsInR5cCI6InJlZnJlc2gifQ.UGaUuGRmgCAbttJJZIGaR4WFNV1ER65DiC4pHY7LVdQ';

      let config = {
        method: 'post',
        url: 'https://ap-south-1.aws.realm.mongodb.com/api/client/v2.0/auth/session',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + refresh_token,
        },
      };

      try {
        const response = await axios.request(config);
        return response.data.access_token;
      } catch (error) {
        console.log('Error getting MongoDB access token:', error);
        return null;
      }
    },
  },
   mounted() {
    this.getJobs();
  },
  saveCandidatesToBackend() {
      axios
        .post('https://ap-south-1.aws.data.mongodb-api.com/app/data-fhzlj/endpoint/data/v1/action/insertOne', this.candidates)
        .then((response) => {
          console.log('Candidates saved to MongoDB:', response.data);
        })
        .catch((error) => {
          console.error('Error saving candidates to MongoDB:', error);
        });
    },
   addCandidate(newCandidate) {
      this.candidates.push(newCandidate);
      this.saveCandidatesToBackend();
    },
    deleteCandidate(index) {
      this.candidates.splice(index, 1);
      this.saveCandidatesToBackend();
    },
    updateCandidateRow(candidateId, updatedCandidate) {
      const index = this.candidates.findIndex((candidate) => candidate.id === candidateId);
      if (index !== -1) {
        this.candidates[index] = { ...updatedCandidate };
        this.saveCandidatesToBackend();
      }
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
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

html,
body {
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
  background-color: #ffa07a;
  padding: 10px;
  border-radius: 2px;
}
</style>






