<template>
  <el-header>
    <Nav />
    <el-button size="medium" @click="logout" v-if="isLoggedIn">
      Logout
    </el-button>
    <el-button size="medium" @click="onClickLogin" v-else>Login</el-button>
  </el-header>
</template>

<style lang="scss" scoped>
.el-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Nav from '@/components/Nav.vue'
import router from '@/router'

@Component({
  components: {
    Nav
  }
})
export default class Header extends Vue {
  get isLoggedIn(): boolean {
    return !!this.$store.state.user
  }

  logout(): void {
    this.$store.dispatch('logout')
  }

  onClickLogin(): void {
    router.push({ path: 'login' })
  }
}
</script>
