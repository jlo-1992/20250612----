import { defineStore } from 'pinia'
import { ref } from 'vue'

const time = Number.parseInt(import.meta.env.VITE_TIME)
const timeBreak = Number.parseInt(import.meta.env.VITE_TIME_BREAK)

// 命名方式：use + 檔名 + store = defineStore('檔名', ()=>{})
export const useListStore = defineStore(
  'list',
  () => {
    // 未完成事項
    const items = ref([])
    // 已完成事項
    const finishedItems = ref([])
    // 目前進行事項
    const currentItem = ref('')
    // id，需要變成響應式，不然存 localStorage 後，每次重整新增又會從 id=1 開始建立
    const id = ref(1)

    // 倒數剩餘時間
    const timeleft = ref(time)
    // 判斷是否為休息時間
    const isBreak = ref(false)

    const addItem = value => {
      items.value.push({
        id: id.value++,
        text: value,
        edit: false,
        model: value,
      })
    }

    const editItem = id => {
      const i = items.value.findIndex(item => item.id === id)
      items.value[i].edit = true
    }

    const submitEdit = id => {
      const i = items.value.findIndex(item => item.id === id)
      items.value[i].text = items.value[i].model
      items.value[i].edit = false
    }

    const cancelEdit = id => {
      const i = items.value.findIndex(item => item.id === id)
      items.value[i].model = items.value[i].text
      items.value[i].edit = false
    }

    const delItem = id => {
      const i = items.value.findIndex(item => item.id === id)
      items.value.splice(i, 1)
    }

    const delFinishedItem = id => {
      const i = finishedItems.value.findIndex(item => item.id === id)
      finishedItems.value.splice(i, 1)
    }

    // .shift() 會回傳並刪除陣列的第一個項目
    const setCurrentItem = () => {
      currentItem.value = isBreak.value ? '休息時間' : items.value.shift().text
    }

    const countdown = () => {
      timeleft.value--
    }

    const setFinishItem = () => {
      if (!isBreak.value) {
        finishedItems.value.push({
          id: id.value++,
          text: currentItem.value,
        })
      }
      currentItem.value = ''

      // 如果還有未完成事項的話，就要先跑休息時間
      if (items.value.length > 0) {
        isBreak.value = !isBreak.value
      }

      // 決定是倒數休息時間或事項時間
      timeleft.value = isBreak.value ? timeBreak : time
    }

    // 記得組合式寫法，每項函式都必須 return
    return {
      items,
      finishedItems,
      currentItem,
      timeleft,
      id,
      addItem,
      editItem,
      submitEdit,
      cancelEdit,
      delItem,
      setCurrentItem,
      countdown,
      setFinishItem,
      delFinishedItem,
    }
  },
  {
    persist: {
      key: 'pomodoro-list',
    },
  }
)
