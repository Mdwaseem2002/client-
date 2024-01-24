<!-- HelloWorld.vue -->

<template>
  <div>
    <h1>{{ msg }}</h1>
    
    <!-- Your form with name and email fields -->
    <form @submit.prevent="submitForm">
      <label for="name">Name:</label>
      <input type="text" id="name" v-model="name" required>

      <label for="email">Email:</label>
      <input type="email" id="email" v-model="email" required>

      <button type="submit">Submit</button>
    </form>

    <router-link to="/display-data">Go to Display Data</router-link>
    <router-view />
  </div>
</template>

<script>
export default {
  data() {
    return {
      msg: 'Hello World!',
      name: '',
      email: '',
    };
  },
  methods: {
    submitForm() {
      // Do something with the submitted data
      console.log('Name:', this.name);
      console.log('Email:', this.email);

      // You can also navigate to another route if needed
      this.$router.push('/display-data');
    },
  },
};
</script>

<style scoped>
/* Your component-specific styles */
</style>