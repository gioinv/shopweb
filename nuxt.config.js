import colors from 'vuetify/es5/util/colors'

export default {
  ssr: false,

  target: 'static',

  head: {
    titleTemplate: '%s - shopweb',
    title: 'shopweb',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  css: [
  ],

  plugins: [
    // '@/plugins/firePlugin'
  ],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify'
  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    '@nuxtjs/firebase'
    // '@nuxtjs/auth-next'
  ],
  firebase: {
    config: {
      apiKey: 'AIzaSyBEkVAZV71_i7_0u97Fgaj8ODquD_kLXBQ',
      authDomain: 'shopapp-308706.firebaseapp.com',
      projectId: 'shopapp-308706',
      storageBucket: 'shopapp-308706.appspot.com',
      messagingSenderId: '894386807325',
      appId: '1:894386807325:web:296658a0f2ab262bba5cf4',
      measurementId: 'G-PSRVKNEVZV'
    },
    services: {
      auth: true,
      firestore: true
    }
  },

  axios: {},

  pwa: {
    manifest: {
      lang: 'en'
    }
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: true,
      themes: {
        dark: {
          primary: colors.blue.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },

  build: {
  }
}
