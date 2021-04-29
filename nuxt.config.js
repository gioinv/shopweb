import colors from 'vuetify/es5/util/colors'
const environment = process.env.NODE_ENV || 'local'
const envSet = require(`./configs/env.${environment}.js`)

export default {
  env: envSet,
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
    '@/assets/main.scss'
  ],

  plugins: [
    // '@/plugins/sticky'
    { src: '~/plugins/vuex-persist', ssr: false },
    '@/plugins/validation',
    '@/mixins/Inject'

  ],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/vuetify'

  ],

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/pwa',
    ['nuxt-i18n',
      {
        locales: [
          {
            code: 'en',
            name: 'English',
            file: 'en.json'
          },
          {
            code: 'vi',
            name: 'Vietnam',
            file: 'vi.json'
          }
        ],
        lazy: true,
        langDir: 'locales',
        defaultLocale: 'vi'
      }
    ]
  ],

  axios: {},

  pwa: {
    manifest: {
      lang: 'en'
    }
  },
  router: {
    // middleware: 'SyncVersion'
  },

  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      themes: {
        light: {
          primary: '#333',
          accent: colors.grey.darken3,
          secondary: '#F7941D',
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
