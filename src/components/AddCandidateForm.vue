<template>
  <form @submit.prevent="addCandidate">
    <table>
      <tr>
        <td>
          <label for="name">Enter your Name:</label>
        </td>
        <td>
          <input v-model="newCandidate.name" type="text" id="name" placeholder="Name" required>
        </td>
      </tr>
      <tr>
        <td>
          <label for="position">Enter your Position:</label>
        </td>
        <td>
          <input v-model="newCandidate.position" type="text" id="position" placeholder="Position" required>
        </td>
      </tr>
      <tr>
        <td>
          <label for="gender">Enter your Gender:</label>
        </td>
        <td>
          <input v-model="newCandidate.gender" type="text" id="gender" placeholder="Gender" required>
        </td>
      </tr>
      <tr>
        <td>
          <label for="location">Enter your Location:</label>
        </td>
        <td>
          <input v-model="newCandidate.location" type="text" id="location" placeholder="Location" required>
        </td>
      </tr>
      <tr>
        <td>
          <label for="experience">Enter your Experience:</label>
        </td>
        <td>
          <input v-model="newCandidate.experience" type="number" id="experience" placeholder="Experience" required>
        </td>
      </tr>
    </table>
    <button type="submit">Add Candidate</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      newCandidate: {
        name: '',
        position: '',
        gender: '',
        location: '',
        experience: '',
      },
    };
  },
  methods: {
    addCandidate() {
      this.$emit('addCandidate', { ...this.newCandidate });
      this.resetForm();
    },
    resetForm() {
      this.newCandidate = {
        name: '',
        position: '',
        gender: '',
        location: '',
        experience: '',
      };
    },
  },
};
</script>


<style>
button {
  display: block;
  margin-top: 20px;
  padding: 10px 20px;
  font-size: 16px;
  background-color: #007bff; 
  color: #fff; 
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #0056b3; 
}

button:active {
  background-color: #003f80; 
}
</style>
