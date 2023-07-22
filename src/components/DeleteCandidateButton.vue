<template>
  <router-link to="/homepage/delete" @click="deleteCandidate">Delete</router-link>
</template>

<script>
export default {
  methods: {
    deleteCandidate() {
      this.$emit('deleteCandidate');
    },
  },
};
</script>
<style>
.delete-link {
  display: inline-block;
  padding: 8px 16px;
  background-color: #dc3545;
  color: #008B8B;
  text-decoration: none;
  border-radius: 4px;
}

.delete-link:hover {
  background-color: #c82333;
}

.delete-link:active {
  background-color:  #008B8B;
}
</style>
