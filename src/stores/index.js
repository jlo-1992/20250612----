// Utilities
import { createPinia } from 'pinia'
// 要先在終端機輸入：npm i pinia-plugin-persistedstate
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// https://www.npmjs.com/package/pinia-plugin-persistedstate

// 引入後，這三行都需要修改
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

export default pinia
