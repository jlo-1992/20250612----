<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1 class="text-center">TOMATOES IN WAITING</h1>
      </v-col>
      <v-col cols="12">
        <!--
          ref = 模板引用
          https://zh-hk.vuejs.org/guide/essentials/template-refs.html#ref-on-component

          v-model = 使用者輸入資料綁定
          :rules = 驗證規則的 function 的陣列

          https://vuetifyjs.com/zh-Hans/api/v-text-field/
        -->
        <!-- clearable 產生清除輸入的按鈕，:rules 引入驗證項目，label 顯示在輸入欄位上的名稱，@click:append 點擊 append-icon 會觸發的函式 -->
        <v-text-field
          ref="inputTextField"
          v-model="input"
          append-icon="mdi-plus"
          clearable
          label="PLANT A NEW TOMATO"
          :rules="[rules.required, rules.length]"
          @click:append="onInputSubmit"
          @keydown.enter="onInputSubmit"
        />
        <v-table>
          <thead>
            <tr>
              <th>THE TOMATO QUEUE</th>
              <th>TOMATO TUNER</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="list.items.length === 0">
              <td colspan="2">You've squashed all your tasks. Good Job!</td>
            </tr>
            <tr v-for="(item, i) in list.items" :key="item.id">
              <td>
                <!-- autofocus 點選編輯之後會自動 focus 在編輯欄位 -->
                <v-text-field
                  v-show="item.edit"
                  ref="editTextField"
                  v-model="item.model"
                  autofocus
                  :rules="[rules.required, rules.length]"
                />
                <span v-show="!item.edit">{{ item.text }}</span>
              </td>
              <td>
                <template v-if="item.edit">
                  <v-btn icon="mdi-check" @click="onEditSubmit(item.id, i)" />
                  <v-btn icon="mdi-undo" @click="list.cancelEdit(item.id)" />
                </template>
                <template v-else>
                  <v-btn icon="mdi-pencil" @click="list.editItem(item.id)" />
                  <v-btn icon="mdi-delete" @click="list.delItem(item.id)" />
                </template>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
      <v-col cols="12">
        <h1 class="text-center">ALL KETCHUP-ED!</h1>
      </v-col>
      <v-col cols="12">
        <v-table>
          <thead>
            <tr>
              <th>THE TOMATO QUEUE</th>
              <th>TOMATO TUNER</th>
            </tr>
          </thead>
          <tbody>
            <tr v-if="list.finishedItems.length === 0">
              <td colspan="2">Empty plate! Finish something to fill it!</td>
            </tr>
            <tr v-for="item in list.finishedItems" :key="item.id">
              <td>{{ item.text }}</td>
              <td><v-btn icon="mdi-delete" @click="list.delFinishedItem(item.id)" /></td>
            </tr>
          </tbody>
        </v-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, useTemplateRef } from 'vue'
import { useListStore } from '@/stores/list'

const list = useListStore()

// 使用者新增輸入欄位資料綁定
const input = ref('')

// 取得輸入欄位的模板引用
// Vue 3.5 以前寫法
// const inputTextField = ref(null)
// Vue 3.5 寫法
// https://vuejs.org/api/composition-api-helpers.html#usetemplateref
// 在要取得的標籤內加入 ref="自訂名稱"屬性，再用 const 自訂名稱 = useTemplateRef('自訂名稱') 引入
const inputTextField = useTemplateRef('inputTextField')

// 取得修改欄位的模板引用
const editTextField = useTemplateRef('editTextField')

// 驗證規則
const rules = {
  // 自訂名稱: function
  required: value => {
    return Boolean(value) || 'NO SKIPPING-tomatoes need details!'
  },
  length: value => {
    return value.length >= 3 || 'Need at least 3 juicy bites!'
  },
}

// 新增輸入欄位送出
const onInputSubmit = () => {
  // 取得輸入欄位的 exposed 的驗證狀態
  // https://zh-hk.vuejs.org/api/sfc-script-setup.html#defineexpose
  // https://vuetifyjs.com/zh-Hans/api/v-text-field/#exposed-isValid
  if (!inputTextField.value.isValid) return
  list.addItem(input.value)
  // reset() 清空輸入欄位
  inputTextField.value.reset()
}

// 修改輸入欄位送出
const onEditSubmit = (id, i) => {
  // 不符合驗證規則，則無法送出
  if (!editTextField.value[i].isValid) return
  list.submitEdit(id)
}
</script>
