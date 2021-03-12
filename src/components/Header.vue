<template>
  <div>
    <Nav />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Nav from '@/components/Nav.vue'

@Component({
  components: {
    Nav
  }
})
export default class Header extends Vue {}
</script>
