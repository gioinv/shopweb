<template>
  <div>
    Welcome
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {

  },
  layout: 'admin'
})
export default class MyStore extends Vue {
  title:string='demo1';
  keyword:string='';
  items:Array<any> = [];
  itemsClone:Array<any> = [];
}
</script>

<style scoped>

</style>
