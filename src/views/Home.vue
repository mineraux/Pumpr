<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <button @click="onClick">Get data</button>
    <ul>
      <li v-for="name in names" :key="name">{{name}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import HelloWorld from "@/components/HelloWorld.vue";
import { db } from "@/firebase/db";
import { mapGetters } from "vuex";

@Component({
  components: {
    HelloWorld
  },
  computed: mapGetters(['names'])
})
export default class Home extends Vue {
  onClick(): void {
    db.collection('myCollection')
    .get()
    .then(querySnapshot => {
      const documents = querySnapshot.docs.map(doc => doc.data())
      // do something with documents

      console.log(documents)
    })
  }

  names!:any[]
}
</script>
