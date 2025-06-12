import { fileURLToPath, URL } from 'node:url'
import Vue from '@vitejs/plugin-vue'
import Fonts from 'unplugin-fonts/vite'
import { defineConfig } from 'vite'
// 加上這行，文件：https://vite-pwa-org.netlify.app/guide/#configuring-vite-plugin-pwa
import { VitePWA } from 'vite-plugin-pwa'
// 加上這行，文件：https://www.npmjs.com/package/vite-plugin-radar
import { VitePluginRadar } from 'vite-plugin-radar'
import VueDevTools from 'vite-plugin-vue-devtools'
import Vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

// https://vitejs.dev/config/
export default defineConfig({
  // 必須加 base:'./' 才能打包，在終端機輸入：npm run build 執行打包
  base: './',
  plugins: [
    VitePluginRadar({
      // Google Analytics tag injection
      // 在終端機輸入：npm i -D vite-plugin-radar 安裝 google 分析
      analytics: {
        id: 'G-V4DM60DJCK',
      },
    }),
    // 加上這行，適用於 Andrid 跟 windows
    VitePWA({
      // 要加上 devOptions 這段程式碼，開發模式才會顯示 menifest 跟 service worker
      devOptions: {
        enabled: true,
      },
      registerType: 'autoUpdate',
      //
      workbox: {
        // 清除過期的快取
        cleanupOutdatedCaches: true,
        // 快取檔案的路徑，['**/*'] 代表所有檔案
        globPatterns: ['**/*'],
        // 忽略網址參數，[/.*/] 代表所有參數都忽略，把不同參數當作相同的檔案
        // a.jpg = a.jpg?fbclid=1234
        ignoreURLParametersMatching: [/.*/],
      },
      // 加上這行，網站設定
      manifest: {
        // 貼上 favicon 提供的 JSON 檔
        name: 'Pomodoro',
        short_name: 'Pomodoro',
        icons: [
          {
            src: './web-app-manifest-144x144.png',
            sizes: '144x144',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: './web-app-manifest-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'maskable',
          },

          {
            src: './web-app-manifest-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
        theme_color: '#ffacac',
        background_color: '#ffa1a1',
        // 顯示模式，https://web.dev/articles/add-manifest?hl=zh-tw#display
        display: 'standalone',
        // 自行加上這兩行
        // 開始網址
        start_url: './',
        // 應用程式範圍，超出範圍會開啟瀏覽器
        scope: './',
      },
    }),
    VueDevTools(),
    Vue({
      template: { transformAssetUrls },
    }),
    // https://github.com/vuetifyjs/vuetify-loader/tree/master/packages/vite-plugin#readme
    Vuetify({
      autoImport: true,
      styles: {
        configFile: 'src/styles/settings.scss',
      },
    }),
    Fonts({
      google: {
        families: [
          {
            name: 'Roboto',
            styles: 'wght@100;300;400;500;700;900',
          },
        ],
      },
    }),
  ],
  optimizeDeps: {
    exclude: [
      'vuetify',
      'vue-router',
      'unplugin-vue-router/runtime',
      'unplugin-vue-router/data-loaders',
      'unplugin-vue-router/data-loaders/basic',
    ],
  },
  define: { 'process.env': {} },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url)),
    },
    extensions: ['.js', '.json', '.jsx', '.mjs', '.ts', '.tsx', '.vue'],
  },
  server: {
    port: 3000,
  },
  css: {
    preprocessorOptions: {
      sass: {
        api: 'modern-compiler',
      },
      scss: {
        api: 'modern-compiler',
      },
    },
  },
})
