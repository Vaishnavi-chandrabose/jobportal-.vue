import { defineStore } from 'pinia';
import axios from 'axios';

export const usejobportal = defineStore('jobportal', {
  state: () => ({
    candidates: [],
    showAddCandidateModal: false,
    showEditCandidateModal: false,
    selectedCandidateData: null,
    mongoData: [],
    isModalOpen: false,
    job: {
      job_id: '',
      name: '',
      position: '',
      gender: '',
      experience: '',
      location: '',
    },
    errors: {
      job_id: '',
      name: '',
      position: '',
      gender: '',
      experience: '',
      location: '',
    },
  }),

  actions: {
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
          collection: 'Job_portal_tabel',
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
        this.candidates = response.data.documents; // Corrected to set candidates with the fetched data
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
  },

  methods: {
    resetForm() {
      this.job = {
        job_id: '',
        name: '',
        position: '',
        gender: '',
        experience: '',
        location: '',
      };
      this.errors = {
        job_id: '',
        name: '',
        position: '',
        gender: '',
        experience: '',
        location: '',
      };
    },
  },
});

usejobportal.id = 'job';

export default usejobportal;
