/* eslint-disable max-len */
const tailwind = require('./tailwind.config')

const dev = process.env.NODE_ENV === 'development'
const cache = false

module.exports = {
  dev,

  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Target (https://go.nuxtjs.dev/config-target)
  target: 'static',

  // Nuxt.js router (https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-router)
  router: {
    mode: 'hash',
  },

  // Server settings (https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-server)
  server: {
    port: process.env.SERVER_PORT || 3000,
    host: process.env.SERVER_HOST || '127.0.0.1',
  },

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: process.env.npm_package_displayName || 'DreamTime',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    ],
    script: [
      {
        src: 'https://ads.dreamnet.tech/delivery/asyncjs.php',
        async: true,
      },
    ],
  },

  // Loading indicator. (https://nuxtjs.org/docs/2.x/configuration-glossary/configuration-loading-indicator)
  loadingIndicator: {
    name: 'cube-grid',
    color: tailwind.theme.extend.colors.primary.DEFAULT,
    background: tailwind.theme.extend.colors.background,
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [
    '~/assets/css/vendor.scss',
    '~/assets/css/app.scss',
  ],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '~/plugins/binds.js',
    '~/plugins/boot.js',
    '~/plugins/setup.js',
    '~/plugins/vue-slider.js',
    '~/plugins/vue-portal.js',
  ],

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // Doc: https://github.com/nuxt-community/nuxt-tailwindcss
    '@nuxtjs/tailwindcss',
    // Doc: https://github.com/nuxt-community/style-resources-module
    '@nuxtjs/style-resources',
    // https://github.com/nuxt-community/google-fonts-module
    '@nuxtjs/google-fonts',
    // https://github.com/nuxt-community/fontawesome-module
    '@nuxtjs/fontawesome',
    // https://marquez.co/docs/nuxt-optimized-images
    '@aceforth/nuxt-optimized-images',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [],

  tailwindcss: {
    viewer: false,
  },

  // https://github.com/nuxt-community/style-resources-module
  styleResources: {
    scss: '~/assets/css/utilities/all.scss',
  },

  // https://github.com/nuxt-community/google-fonts-module
  googleFonts: {
    families: {
      Rubik: [300, 400, 600, 700],
      Inter: [100, 200, 300, 400, 600, 700],
    },
    download: process.env.NODE_ENV === 'production',
  },

  // https://github.com/nuxt-community/fontawesome-module
  fontawesome: {
    icons: {
      solid: [
        'faExclamationTriangle',
        'faCheckCircle',
        'faInfoCircle',
        'faUsers',
        'faQuestionCircle',
        'faCaretLeft',
        'faCaretRight',
        'faUpload',
        'faImages',
        'faCog',
        'faCogs',
        'faMinus',
        'faTimes',
        'faMemory',
        'faMicrochip',
        'faDesktop',
        'faRunning',
        'faPaintBrush',
        'faFileUpload',
        'faSave',
        'faHatWizard',
        'faTerminal',
        'faStop',
        'faPlay',
        'faRetweet',
        'faHeart',
        'faClock',
        'faGlobe',
        'faFile',
        'faFolder',
        'faFolderOpen',
        'faTrashAlt',
        'faClipboardList',
        'faClipboardCheck',
        'faSignOutAlt',
        'faTools',
        'faToolbox',
        'faFlask',
        'faExpand',
        'faTimesCircle',
        'faRocket',
        'faThumbsUp',
        'faFireAlt',
        'faSync',
        'faDownload',
        'faLink',
        'faCloudShowersHeavy',
        'faWindowMaximize',
        'faWindowClose',
        'faSlidersH',
        'faShareAlt',
        'faBell',
        'faPaperPlane',
        'faBook',
        'faExternalLinkSquareAlt',
        'faCrop',
        'faMagic',
        'faCompressArrowsAlt',
        'faMask',
        'faCloudSunRain',
        'faCloudMoon',
        'faCode',
        'faStar',
        'faComment',
        'faMugHot',
        'faComments',
        'faCoffee',
        'faDonate',
        'faExclamationCircle',
        'faCubes',
        'faWrench',
        'faLeaf',
        'faPlusCircle',
      ],
      regular: [
        'faSquare',
      ],
      brands: [
        'faPatreon',
        'faInstagram',
        'faSteam',
        'faGithub',
        'faFacebook',
        'faTwitter',
        'faGitAlt',
        'faBitcoin',
        'faYoutube',
      ],
    },
  },

  // https://marquez.co/docs/nuxt-optimized-images
  optimizedImages: {
  },

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: [
    '~/components/Dialogs',
    '~/components/Form',
    '~/components/Help',
    '~/components/Layout',
    '~/components/Nudify',
    '~/components/Page',
    '~/components/Queue',
    '~/components/Settings',
    '~/components/UI',
    '~/components/Upload',
  ],

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {
    // Enable thread-loader in webpack building.
    parallel: true,

    // Enables the HardSourceWebpackPlugin for improved caching.
    hardSource: cache,

    // Enable cache of terser-webpack-plugin and cache-loader.
    cache,

    // Enables Common CSS Extraction using Vue Server Renderer guidelines.
    // extractCSS: false,

    //
    publicPath: './assets/',

    // Customize Babel configuration for JavaScript and Vue files.
    babel: {
      cacheDirectory: cache,

      plugins: [
        'lodash',
        '@babel/plugin-proposal-optional-chaining',
      ],

      presets({ isServer }) {
        return [
          [
            '@nuxt/babel-preset-app',
            {
              targets: isServer ? 'current node' : {},
              corejs: { version: 3 },
            },
          ],
        ]
      },
    },

    //
    terser: {
      extractComments: false, // default was LICENSES
    },

    //
    html: {
      minify: {
        minifyCSS: false,
        minifyJS: false,
      },
    },

    // You can extend webpack config here.
    extend(config, { isDev }) {
      //
      config.target = 'electron-renderer'

      // Source maps.
      config.devtool = 'source-map'

      // Don't throw warning when asset created is over 250kb
      config.performance.hints = false

      // Disable handling of requires with a single expression.
      config.module.exprContextCritical = false

      // Worker loader.
      config.module.rules.push({
        test: /\.worker\.js$/,
        use: {
          loader: 'worker-loader',
          options: {
            filename: () => (isDev ? '[name].[ext]' : 'workers/[contenthash:7].[ext]'),
          },
        },
        exclude: /(node_modules)/,
      })

      // Media loader.
      config.module.rules.push({
        test: /\.(ogg|mp3|wav|mpe?g)$/i,
        use: {
          loader: 'file-loader',
          options: {
            name: () => (isDev ? '[name].[ext]' : 'sounds/[contenthash:7].[ext]'),
          },
        },
        exclude: /(node_modules)/,
      })

      // YAML loader.
      config.module.rules.push({
        test: /\.ya?ml$/,
        use: ['js-yaml-loader'],
        exclude: /(node_modules)/,
      })
    },
  },
}
