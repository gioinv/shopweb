<template>
  <v-app blue>
    <v-navigation-drawer
      v-model="drawer"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider />
      <div align="center" class="mt-3">
        <v-btn color="primary" @click="onLogout">
          <v-icon>mdi-logout</v-icon>
          {{ $t('common.logout') }}
        </v-btn>
      </div>
    </v-navigation-drawer>
    <v-app-bar
      :clipped-left="clipped"
      app
      color="primary"
    >
      <v-app-bar-nav-icon color="white" @click.stop="drawer = !drawer" />
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <m-snackbar />
  </v-app>
</template>

<script lang="ts">
import { Component, mixins } from 'nuxt-property-decorator'
import { PageMethods } from '@/mixins/Common'
import MSnackbar from '@/components/controls/MSnackbar.vue'
import { Inject } from 'inversify-props'
import type { IAuthService } from '~/api/services'
import 'reflect-metadata'

@Component({
  components: {
    MSnackbar
  }

})
export default class Admin extends mixins(PageMethods) {
  @Inject()
  private authService!: IAuthService

  clipped:boolean= false
  drawer:boolean= !this.$vuetify.breakpoint.smAndDown
  fixed:boolean= false

  items:Array<object> = [
    {
      icon: 'mdi-view-dashboard',
      title: 'Dasboard',
      to: '/administration'
    },
    {
      icon: 'mdi-account',
      title: this.$t('common.user'),
      to: '/administration/users'
    },
    {
      icon: 'mdi-format-list-bulleted',
      title: this.$t('common.category'),
      to: '/administration/categories'
    },
    {
      icon: 'mdi-rhombus-split',
      title: this.$t('common.product'),
      to: '/administration/products'
    }

  ]

  onLogout () {
    this.gotoPage('/user/logout/?redirect=/administration/login')
  }

  async created () {
    // await this.setCategory()
  }
}

</script>
