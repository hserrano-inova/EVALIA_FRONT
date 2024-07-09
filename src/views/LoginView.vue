<template>
  <main class="form-signin">
    <form @submit.prevent="handleLogin">
      <img class="mb-4" src="@/assets/img/applogo_inv.png">

      <div class="form-floating">
        <input type="text" class="form-control" v-model="username" placeholder="User" required>
        <label for="floatingInput">Usuario</label>
      </div>
      <div class="form-floating">
        <input type="password" class="form-control" v-model="password" placeholder="Password" required>
        <label for="floatingPassword">Password</label>
      </div>
      <p class="text-warning" v-if="noauth">Usuario o Password Incorrecto</p>
      <br />
      <button class="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
      <!-- <p class="mt-5 mb-3 text-muted">&copy; InovaLabs</p> -->
    </form>
  </main>
</template>


<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router'
import AuthService from '@/authreq/auth';

export default {
  name: 'LoginView',
  setup() {
    const router = useRouter();
    const username = ref('');
    const password = ref('');

    const handleLogin = async () => {
      await AuthService.login(username.value, password.value)
      .then(() => {
        router.push('/lview')
      })
    }; 

    return {
      username,
      password,
      handleLogin
    };
  }
};
</script>

<style scoped>
html,
body {
  height: 100%;
}

body {
  display: flex;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  padding-top: 150px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}
</style>