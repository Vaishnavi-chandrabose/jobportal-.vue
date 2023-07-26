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
    <span class="close-btn" @click="closeEditCandidateModal">&times;</span> 
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
    closeEditCandidateModal() {
      this.showAlert = false; // Hide the alert if it's shown.
      this.$emit('closeModal'); // Emit the 'closeModal' event to notify the parent component.
    },
  },
};
</script>


<style>

.modal {
  position: fixed;
  top: 40%;
  bottom:0%;
  left: 80%;
  transform: translate(-50%, -50%);
  width: 80%;
  max-width: 600px;
  padding: 30px;
  background-color: #f1f1f1; /* Light gray background color */
  border-radius: 2px;
  z-index: 9999; /* Make sure the modal appears on top of other elements */
}
.close-btn {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 24px;
  cursor: pointer;
  color: #f00; /* Red color for the cross button */
  /* You can also use other formats like "#ff0000" for red color */
}

.close-btn:hover {
  color: #d00; /* Darker red color on hover */
}




.close-btn:hover {
  color: #333;
}

.form-row {
  margin-bottom: 10px;
}

input[type="text"],
select,
input[type="number"] {
  width: 70%;
  padding: 8px;
  font-size: 16px;
  border: 2px solid #ccc;
  border-radius: 4px;
}

input[type="radio"] {
  margin-right: 8px;
}

button[type="submit"],
.button {
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

button[type="submit"]:hover,
.button:hover {
  background-color: #0056b3;
}

button[type="submit"]:active,
.button:active {
  background-color: #003f80;
}
</style>

