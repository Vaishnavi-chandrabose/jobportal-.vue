<template>
  <table>
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
      <tr v-for="(candidate, index) in candidates" :key="index">
        <td>{{ candidate.name }}</td>
        <td>{{ candidate.position }}</td>
        <td>{{ candidate.gender }}</td>
        <td>{{ candidate.location }}</td>
        <td>{{ candidate.experience }}</td>
        <td>
          <DeleteCandidateButton @deleteCandidate="deleteCandidate(index)" />
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import DeleteCandidateButton from './DeleteCandidateButton.vue';

export default {
  props: {
    candidates: {
      type: Array,
      required: true,
    },
  },
  components: {
    DeleteCandidateButton,
  },
  methods: {
    deleteCandidate(index) {
      this.$emit('deleteCandidate', index);
    },
  },
};
</script>
