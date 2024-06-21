<template>
    <div class="login">
      <h2>Login</h2>
      <form @submit.prevent="login">
        <input type="text" placeholder="Username" v-model="id" required>
        <input type="password" placeholder="Password" v-model="password" required>
        <button type="submit">Login</button>
      </form>
    </div>
</template>
  
<script>
import http from '@/http';
  export default {
    data() {
      return {
        id: '',
        password: ''
      }
    },
    methods: {
      async login() {
        try {
          const response = await http.post('/account/login', {
            username: this.id,
            password: this.password
          });

          console.log('Login response:', response.data);

          if (response.data.data && response.data.data.access_token) {
            localStorage.setItem('access_token', response.data.data.access_token);
            localStorage.setItem('refresh_token', response.data.data.refresh_token);
            this.$router.push('/dashboard');
          } else {
            alert('Login failed: Invalid ID or password');
          }
        } catch (error) {
          console.error('There was an error logging in:', error);
          alert('Failed to login. Please try again later.');
        }
      }
    }
  }
</script>


<style scoped>
.login {
  color: #4caf50;
  font-family: "Lucida Console", "Courier New", monospace;
  max-width: 300px;
  margin: 100px auto;
  padding: 20px;
  border: 1px solid #4caf50;
  border-radius: 5px;
  background-color: #222;
  box-shadow: 0 0 10px #4caf50;
}

input {
  width: 80%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #444;
  border-radius: 5px;
  background-color: #333;
  color: #ddd;
}

button {
  width: 70%;
  padding: 10px;
  margin-top: 10px;
  border: none;
  border-radius: 5px;
  background-color: #4caf50;
  box-shadow: 0 0 10px black;
  color: #fff;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}
</style>
  