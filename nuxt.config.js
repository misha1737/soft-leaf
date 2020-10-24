export default {
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'soft-leaf',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/scss/colors.scss','~/assets/scss/base.scss'
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
  ],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    '@nuxtjs/firebase',
    '@nuxtjs/style-resources',
  ],
  styleResources: {
    scss: ['./assets/scss/colors.scss','./assets/scss/base.scss']
  },
  firebase: {
      config: {
        apiKey: 'AIzaSyDWsufelpETP0UH1SfGDx_LIc2HgU8_nMk',
        authDomain: 'vuefirebase-65c7e.firebaseapp.com',
        databaseURL: 'https://vuefirebase-65c7e.firebaseio.com',
        projectId: 'vuefirebase-65c7e',
        storageBucket: 'vuefirebase-65c7e.appspot.com',
        messagingSenderId: '820675737205',
        appId: '1:820675737205:web:6c383a836505b625c6aa3c',
      },
      services: {
        auth: true // Just as example. Can be any other service.
      }
    },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
  }
}
