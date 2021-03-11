<template>
  <div id="app">
    <Header />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Header from '@/components/Header.vue'

@Component({
  components: {
    Header
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
body {
  margin: 0ch;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  padding: 30px;
}
</style>
