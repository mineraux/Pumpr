<template>
  <div id="nav">
    <!-- TODO: Use submenu for meals related pages -->
    <el-menu :default-active="$route.path" mode="horizontal" :router="true">
      <el-menu-item index="/">Home</el-menu-item>
      <el-menu-item index="/my-diet" v-if="isLoggedIn">My Diet</el-menu-item>
      <el-menu-item index="/my-meals" v-if="isLoggedIn">My Meals</el-menu-item>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Nav extends Vue {
  get isLoggedIn(): boolean {
    return !!this.$store.state.user
  }
}
</script>
