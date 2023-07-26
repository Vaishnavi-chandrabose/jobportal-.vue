<template>
  <div>
    <h2>Edit Candidate</h2>
    <form @submit.prevent="updateCandidate">
      <!-- form content -->
      <label for="name">Enter your Name:</label>
      <input v-model="candidate.name" type="text" id="name" placeholder="Name">
      <br>
 <label for="position">Select your Position:</label>
      <select v-model="candidate.position" id="position">
        <option value="Software Engineer">Software Engineer</option>
        <option value="FrontEnd Developer">FrontEnd Developer</option>
        <option value="BackEnd Developer">BackEnd Developer</option>
        <option value="Data Scientist">Data Scientist</option>
        <option value="Product Manager">Product Manager</option>
      </select>
      <br>

      <label for="gender">Select your Gender:</label>
      <input type="radio" v-model="candidate.gender" value="Male"> Male
      <input type="radio" v-model="candidate.gender" value="Female"> Female
      <br>

      <label for="location">Enter your Location:</label>
      <input v-model="candidate.location" type="text" id="location" placeholder="Location">
      <br>

      <label for="experience">Enter your Experience:</label>
      <input v-model="candidate.experience" type="number" id="experience" placeholder="Experience">
      <br>

      <button type="submit">Update Candidate</button>
      <button @click="closeModal">Cancel</button>
    </form>
  </div>
</template>

<script>
export default {
  props: {
    candidateData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      candidate: { ...this.candidateData },
    };
  },
  methods: {
    updateCandidate() {
      this.$emit('updateCandidate', { ...this.candidate });
    },
    closeModal() {
      this.$emit('closeModal');
    },
  },
};
</script>
