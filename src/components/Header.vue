<template>
  <div id="nav">
    <!-- TODO: Use submenu for meals related pages -->
    <el-menu :default-active="$route.path" mode="horizontal" :router="true" @select="handleSelect">
      <el-menu-item index="/">Home</el-menu-item>
      <el-menu-item index="/login">Login</el-menu-item>
      <el-menu-item index="/my-diet">My Diet</el-menu-item>
      <el-menu-item index="/my-meals">My Meals</el-menu-item>
    </el-menu>
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class Header extends Vue {
  handleSelect(key:string, keyPath:string) {
    console.log(key, keyPath);
  }
}
</script>