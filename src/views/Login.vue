<template>
  <form @submit.prevent>
    <div>
      <label for="email">Email</label>
      <input type="email" id="email" v-model="loginForm.email" />
    </div>
    <div>
      <label for="paswword">Password</label>
      <input type="password" id="password" v-model="loginForm.password" />
    </div>
    <button @click="login">Log In</button>
  </form>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";

type Credentials = {
  email: string,
  password: string
}

@Component({})
export default class Login extends Vue {
  loginForm: Credentials = {
    email: '',
    password: ''
  }

  login(): void {
    this.$store.dispatch('login', {
      email: this.loginForm.email,
      password: this.loginForm.password
    })
  }
}
</script>