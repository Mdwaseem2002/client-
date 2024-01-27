<template>
  <div class="container">
    <h1>WELCOME TO OUR PAGE</h1>

    <!-- Form to submit data -->
    <div class="form-wrapper">
      <form @submit.prevent="submitForm">
        <div class="input-group">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="formData.name" required class="gray-input">
        </div>
        <div class="input-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="formData.email" required class="gray-input">
        </div>
        <div class="input-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="formData.password" required class="gray-input">
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>

    <!-- Get button to fetch existing data -->
    <button @click="fetchExistingData">Get</button>

    <h2>Existing Data</h2>
    <div id="existingData">
      <ul v-if="existingData && existingData.length > 0">
        <li v-for="(data, index) in existingData" :key="index">
          Name: {{ data.name }}, Email: {{ data.email }}, Password: {{ data.password }}
        </li>
      </ul>
      <p v-else>No existing data found.</p>
    </div>

    <!-- Display current time -->
    <div class="time">{{ currentTime }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        email: '',
        password: ''
      },
      existingData: [],
      currentTime: ''
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await fetch('http://127.0.0.1:5000/save', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.formData)
        });
        const responseData = await response.json();
        console.log(responseData.message); // Log server response
        alert(responseData.message); // Show response message
        // Clear form fields after submission
        this.formData.name = '';
        this.formData.email = '';
        this.formData.password = '';
        // Do not fetch existing data here
      } catch (error) {
        console.error('Error:', error);
      }
    },
    async fetchExistingData() {
      try {
        const response = await fetch('http://127.0.0.1:5000/get_data');
        if (response.ok) {
          this.existingData = await response.json();
        } else {
          console.error('Failed to fetch existing data:', response.statusText);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    },
    updateTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      const seconds = now.getSeconds().toString().padStart(2, '0');
      this.currentTime = `${hours}:${minutes}:${seconds}`;
    }
  },
  mounted() {
    // Update time initially and every second
    this.updateTime();
    setInterval(() => {
      this.updateTime();
    }, 1000);
  }
};
</script>

<style scoped>
.container {
  text-align: center;
  background-color: lightgrey; /* Change background color to light green */
}

.form-wrapper {
  margin-top: 20px;
}

.input-group {
  margin-bottom: 10px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
  width: 2000px; /* Adjust width as needed */
}

.input-group input {
  width: 250px; /* Adjust width as needed */
  padding: 5px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.gray-input {
  color: rgb(245, 108, 108);
}

button {
  margin-top: 10px;
}

.time {
  margin-top: 20px;
  font-size: 24px;
}
</style>