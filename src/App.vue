<template>
  <v-app :class="theme">
    <v-app-bar>
      <v-container class="d-flex align-center">
        <v-app-bar-title>
          <router-link style="text-decoration: none; color: white" to="/">
            FAKEY HAPPY TOMATO
          </router-link>
        </v-app-bar-title>
        <v-btn prepend-icon="mdi-home" to="/">THE GARDEN GATE</v-btn>
        <v-btn prepend-icon="mdi-format-list-bulleted" to="/list">TO-MA-DO LIST</v-btn>
        <v-btn prepend-icon="mdi-cog" to="/settings">SPICE SETTINGS</v-btn>
      </v-container>
    </v-app-bar>

    <v-main>
      <BgColorTog />
      <!--
      <SlotExample v-slot="apple">
        <h1>{{ apple }}</h1>
        <h1>{{ apple.num }}</h1>
        <h1>{{ apple.text }}</h1>
      </SlotExample>
      <SlotExample v-slot="{ num }">
        <h1>{{ num }}</h1>
      </SlotExample>
      -->
      <!--
      <CardA />
      <component :is="CardA" />
      <component :is="CardB" />
      <component :is="c" v-for="(c, i) in components" :key="i" />
      -->
      <!--
        slot = 插槽 = 自訂元件內的某部分 HTML
        v-slot="插槽提供的元件內的變數"
        https://zh-hk.vuejs.org/guide/components/slots.html#scoped-slots
        Component = 目前路由應該顯示的元件
        https://router.vuejs.org/zh/guide/advanced/router-view-slot.html#RouterView-%E6%8F%92%E6%A7%BD
      -->
      <router-view v-slot="{ Component }">
        <!--
          keep-alive 包住的元件不會被銷毀
          include 指定保留的元件
          https://zh-hk.vuejs.org/guide/built-ins/keep-alive.html#include-exclude
        -->
        <!--
          component 動態元件
          is 要使用的元件
        -->
        <keep-alive include="HomeView">
          <component :is="Component" />
        </keep-alive>
      </router-view>
    </v-main>
  </v-app>
</template>

<script setup>
// import CardA from '@/components/CardA.vue'
// import CardB from '@/components/CardB.vue'
// import SlotExample from '@/components/SlotExample.vue'
// const components = [CardA, CardB]

import { provide, ref } from 'vue'
import BgColorTog from './components/BgColorTog.vue'

const theme = ref('light')

provide('theme', theme)
provide('setTheme', val => (theme.value = val))
</script>

<style scoped>
.light {
  background-color: rgb(224, 224, 179);
  color: #000;
}

.dark {
  background-color: #000;
  color: #fff;
}
</style>
