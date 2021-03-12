<template>
  <el-row type="flex" justify="center">
    <el-form
      ref="form"
      :model="loginForm"
      label-position="top"
      label-width="100px"
      @submit.prevent
    >
      <el-form-item label="Email">
        <el-input v-model="loginForm.email" type="email"></el-input>
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="loginForm.password" type="password"></el-input>
      </el-form-item>
      <el-button type="primary" @click="login">Login</el-button>
    </el-form>
  </el-row>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

type Credentials = {
  email: string
  password: string
}

@Component
export default class Login extends Vue {
  loginForm: Credentials = {
    email: '',
    password: ''
  }

  // TODO: Add error label if information are not formatted correctly
  login(): void {
    this.$store.dispatch('login', {
      email: this.loginForm.email,
      password: this.loginForm.password
    })
  }

  // TODO: Add Logout
  // TODO: Lock nav if not loggedIn
}
</script>
