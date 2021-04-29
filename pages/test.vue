<template>
  <div>
    <div align="center">
      <!-- <nuxt-link :to="localePath('/test', 'en')">
        {{ $t('message') }}
      </nuxt-link>
      <nuxt-link :to="localePath('/test', 'vi')">
        {{ $t('message') }}
      </nuxt-link> -->
      {{ $t('common.login') }}
      <nuxt-link :to="switchLocalePath('en')">
        English
      </nuxt-link>
      <nuxt-link :to="switchLocalePath('vi')">
        Vietname
      </nuxt-link>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
      <p>s</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'

@Component({
  components: {

  }
})
export default class MyStore extends Vue {
  title:string='demo1';
  keyword:string='';
  items:Array<any> = [];
  itemsClone:Array<any> = [];
}
</script>

<style scoped>
ul,li{
  list-style-type: none;
  font-weight: 100;
}
.answer{
  font-weight: bold;
  color: cadetblue;
}

</style>
