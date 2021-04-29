<template>
  <div class="user">
    <div class="title" />
    <pre> {{ listC }}
    <div>
      First:
      <input v-model="test" type="text">
    </div>
    <button @click="update">
      Update Info
    </button>
  </pre>
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'nuxt-property-decorator'
import { CategoryStore } from '@/utils/access-store'
@Component
export default class User extends Vue {
  public localData: object = {}
  public test: number = 0
  public out: number = 0

  @CategoryStore.State('list') list
  @CategoryStore.Getter('getCategoryWSub') listC
  @CategoryStore.Action('setList') setList

  mounted () {
  }

  public update (): void {
    this.setList()
  }

  created () {

  }
}
</script>
