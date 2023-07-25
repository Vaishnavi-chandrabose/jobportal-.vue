<template>
  <form @submit.prevent="addCandidate">
    <table>
      <tr>
        <td>
          <label for="name">Enter your Name:</label>
        </td>
        <td>
          <input v-model="newCandidate.name" type="text" id="name" placeholder="Name">
        </td>
      </tr>
      <tr>
        <td>
          <label for="position">Select your Position:</label>
        </td>
        <td>
          <select v-model="newCandidate.position" type="text" id="position" placeholder="Position" >
          <option value="" disabled>Select Position</option>
            <option value="Software Engineer">Software Engineer</option>
            <option value="FE">FrontEnd Developer</option>
            <option value="BE">BackEnd Developer</option>
            <option value="Data Scientist">Data Scientist</option>
            <option value="Product Manager">Product Manager</option>
          </select>
        </td>
      </tr>
      <tr>
        <td>
          <label for="gender">Select your Gender:</label>
        </td>
        <td>
          <label>
            <input type="radio" v-model="newCandidate.gender" value="Male" >
            Male
          </label><br>
          <label>
            <input type="radio" v-model="newCandidate.gender" value="Female" >
            Female
          </label>
        </td>
      </tr>
      <tr>
        <td>
          <label for="location">Enter your Location:</label>
        </td>
        <td>
          <input v-model="newCandidate.location" type="text" id="location" placeholder="Location" r>
        </td>
      </tr>
      <tr>
        <td>
          <label for="experience">Enter your Experience:</label>
        </td>
        <td>
          <input v-model="newCandidate.experience" type="number" id="experience" placeholder="Experience" >
        </td>
      </tr>
    </table>
    <button type="submit">Add Candidate</button>
  </form>
  <div v-if="showAlert" class="alert">
    Please fill in all required fields.
  </div>
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
      showAlert: false, 
    };
  },
  methods: {
    addCandidate() {
      if (this.validateForm()) {
        this.$emit('addCandidate', { ...this.newCandidate });
        this.resetForm();
      } else {
        this.showAlert = true; 
      }
    },
    resetForm() {
      this.newCandidate = {
        name: '',
        position: '',
        gender: '',
        location: '',
        experience: '',
      };
      this.showAlert = false; 
    },
    validateForm() {
      const isNameValid = this.newCandidate.name.trim() !== '';
      const isPositionValid = this.newCandidate.position !== '';
      const isGenderValid = this.newCandidate.gender !== '';
      const isLocationValid = this.newCandidate.location.trim() !== '';
      const isExperienceValid = this.newCandidate.experience >= 0; 

      return isNameValid && isPositionValid && isGenderValid && isLocationValid && isExperienceValid;
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
