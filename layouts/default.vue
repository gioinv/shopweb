<template>
  <v-app light>
    <v-container>
      <v-row no-gutters class="ml-5 mr-5  mb-2 header-link">
        <v-col>
          <v-icon size="20" color="secondary">
            mdi-headphones
          </v-icon> <nuxt-link to="/">
            0984887878
          </nuxt-link><br>
          <v-icon size="20" color="secondary">
            mdi-email-outline
          </v-icon> <nuxt-link to="/">
            abc@sdf.sdf
          </nuxt-link>
        </v-col>
        <v-col class="text-right">
          <ul class="top">
            <li>
              <v-icon size="20" color="secondary" class="top-icon">
                mdi-map-marker-outline
              </v-icon>
              <nuxt-link to="/">
                {{ $t('header.position') }}
              </nuxt-link>
            </li>
            <li>
              <v-icon size="20" color="secondary" class="top-icon">
                mdi-account-outline
              </v-icon> <nuxt-link to="/user/login">
                {{ $t('header.my_account') }}
              </nuxt-link>
            </li>
            <li v-if="!isLogged" class="no-border">
              <v-icon size="20" color="secondary" class="top-icon">
                mdi-power
              </v-icon>
              <nuxt-link to="/user/login">
                {{ $t('common.login') }}
              </nuxt-link>
            </li>
            <li v-else class="no-border">
              <v-icon size="20" color="secondary" class="top-icon">
                mdi-logout-variant
              </v-icon>
              <nuxt-link to="/user/logout/?redirect=/user/login">
                {{ $t('common.logout') }}
              </nuxt-link>
            </li>
          </ul>
          <div v-if="isAdmin">
            <v-icon size="20" color="secondary" class="top-icon">
              mdi-account-settings-outline
            </v-icon>
            <nuxt-link to="/administration/">
              Administration panel
            </nuxt-link>
          </div>
        </v-col>
      </v-row>
      <v-divider />
      <div class=" top-wrap ml-5 mr-5 mt-3">
        <div class="first">
          <div class="logo">
            <span class="secondary--text">E</span>-shop
          </div>
        </div>
        <div class="second d-flex align-center">
          <div class="d-flex search-box">
            <div class="search-line" style="flex:0.5">
              <v-select

                placeholder="All catogory"
                hide-details
                outlined
                dense
              />
            </div>
            <div class="search-line">
              <v-text-field
                placeholder="keyword"
                hide-details
                outlined
                dense
              />
            </div>
            <div class="search-btn">
              <v-btn class="ma-0" icon>
                <v-icon size="30" color="white">
                  mdi-magnify
                </v-icon>
              </v-btn>
            </div>
          </div>
        </div>
        <div class="third text-right">
          <ul class="top">
            <li class="no-border">
              <v-btn
                class="white--text"
                color="secondary"
                icon
                depressed
              >
                <v-icon>mdi-heart-outline</v-icon>
              </v-btn>
            </li>
            <li class="no-border">
              <v-badge
                bordered
                color="secondary"
                content="2"
                overlap
              >
                <v-btn
                  class="white--text"
                  color="secondary"
                  icon
                  depressed
                >
                  <v-icon>mdi-cart-outline</v-icon>
                </v-btn>
              </v-badge>
            </li>
          </ul>
        </div>
      </div>
    </v-container>

    <div id="topMenu" class="top-bar">
      <v-container class="mt-0 pt-0">
        <ul class="nav-menu ">
          <li class="mr-2 nav-category">
            <v-icon color="white">
              mdi-menu
            </v-icon>
            Danh mục
            <ul>
              <li><a href="#">Sub Nav Link</a></li>
              <v-divider />
              <li>
                <a href="#">Sub Nav Link</a>
                <ul>
                  <li><a href="#">Sub Sub Nav Link</a></li>
                  <li><a href="#">Sub Sub Nav Link</a></li>
                  <li><a href="#">Sub Sub Nav Link</a></li>
                </ul>
              </li>
              <v-divider />
              <li><a href="#">Sub Nav Link</a></li>
              <v-divider />
              <li><a href="#">Sub Nav Link</a></li>
            </ul>
          </li>
          <li><a href="#" class="nav-active">Nav Link</a></li>
          <li><a href="#">Nav Link</a></li>
          <li><a href="#">Nav Link</a></li>
        </ul>
      </v-container>
    </div>

    <v-app-bar
      v-if="false"
      :clipped-left="clipped"
      inverted-scroll
      app
      color="primary"
    >
      <v-container>
        <div class="logo">
          Eshop
        </div>
      </v-container>
    </v-app-bar>

    <v-main>
      <div style="background:#f5f5f5;height:100%">
        <v-container>
          <nuxt />
        </v-container>
      </div>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      temporary
      fixed
    >
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light>
              mdi-repeat
            </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-divider />
    <v-footer
      :absolute="!fixed"
      app
      color="light-grey"
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
    <m-snackbar />
  </v-app>
</template>

<script lang="ts">
import { Component, mixins, Watch } from 'nuxt-property-decorator'
import MSnackbar from '@/components/controls/MSnackbar.vue'
import { PageMethods } from '@/mixins/Common'
import { Inject } from 'inversify-props'
import { UserStore } from '~/utils/access-store'
import type { IAuthService } from '~/api/services'
import 'reflect-metadata'

@Component({
  components: {
    MSnackbar
  }

})
export default class MyStore extends mixins(PageMethods) {
  icon:string = '';
  isSubMenu:boolean = false;
  openMenu:boolean = false;
  isSticky:boolean = false;
  clipped:boolean = false;
  rightDrawer:boolean = false;
  right:boolean = false;
  fixed:boolean = false;

   @Inject()
  private authService!: IAuthService

  @UserStore.Action('logout') logout
  @UserStore.Getter('isAdmin') isAdmin
  @UserStore.Getter('isLogged') isLogged

  items:Array<Object> = [];
  menu:Array<Object> = [];

  options:Object={
    topSpacing: 0
  }

  writeCategory () {

  }

  @Watch('isSticky')
  Watch (newVal: boolean) {
    const category = document.getElementById('category')
    const menuTop = document.getElementById('menuTop')

    if (category && menuTop) {
      if (newVal) {
        category.classList.add('sticky')
        menuTop.classList.add('sticky')
      } else {
        category.classList.remove('sticky')
        menuTop.classList.remove('sticky')
      }
    }
  }

  created () {
    this.menu = [

    ]
  }

  onMenuItemClick () {

  }

  mounted () {
    const stickyElm = document.getElementById('topMenu')
    if (stickyElm) {
      const observer = new IntersectionObserver((_ref) => {
        const e = _ref[0]
        this.isSticky = e.intersectionRatio < 1
        return e.target.classList.toggle('sticky', e.intersectionRatio < 1)
      }, {
        threshold: [1]
      })
      observer.observe(stickyElm)
    }
  }
}
</script>
