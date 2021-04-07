<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      {{ title }}

      <div v-for="(item, index) in categoryList" :key="index">
        <nuxt-link :to="'/detail/'+item.id">
          {{ item.name }}
        </nuxt-link>
      </div>
      <v-btn color="success" @click="onGoogle">
        Login google
      </v-btn>
      <v-btn color="success" @click="onRegist">
        Regist google
      </v-btn>
      <v-btn color="success" @click="onEmail">
        Login email
      </v-btn>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import Logo from '@/components/Logo.vue'
import { loginGoogle, register, loginEmail } from '@/services/user'

@Component({
  components: {
    Logo

  }
})
export default class MyStore extends Vue {
  title:string='demo1';
  categoryList:Array<Object> = []
  items:Array<Object> = []

  public getData (): void {
    this.categoryList = [

    ]
  }

  onGoogle ():void {
    loginGoogle().then((x) => {

    })
  }

  onRegist ():void {
    register('gioi.nv@ebisol.vn', 'abcd@1234').then((x) => {

    })
  }

  onEmail ():void {
    loginEmail('gioi.nv@ebisol.vn', 'abcd@1234').then((x) => {

    })
  }

  /* async writeToFirestore() {
      const ref = fireDb.collection("test").doc("test")
      const document = {
        text: "This is a test message."
      }        try {
        await ref.set(document)
      } catch (e) {
        // TODO: error handling
        console.error(e)
      }
      this.writeSuccessful = true
    }
  } */

  created () {
    /* debugger
    this.$fire.authReady().then((x)=>{
      debugger
    }) */
  }
}
</script>
