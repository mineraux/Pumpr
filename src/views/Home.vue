<template>
  <div class="home">
    <button @click="onClick">Get data</button>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-property-decorator'
import { db } from '@/firebase/db'

export default class Home extends Vue {
  onClick(): void {
    db.collection('myCollection')
      .get()
      .then(querySnapshot => {
        const documents = querySnapshot.docs.map(doc => doc.data())

        console.log(documents)
      })
  }
}
</script>
