<template>
  <el-header>
    <Nav />
    <el-button size="medium" @click="logout">Logout</el-button>
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

@Component({
  components: {
    Nav
  }
})
export default class Header extends Vue {
  logout(): void {
    this.$store.dispatch('logout')
  }
}
</script>
