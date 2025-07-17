<template>
  <v-btn class="button" :style="buttonStyle" @click="toggleColor">
    {{ currentTheme === 'light' ? 'dark' : 'light' }}
  </v-btn>
</template>

<script setup>
import { computed, inject } from 'vue'

const currentTheme = inject('theme')
const setTheme = inject('setTheme')

const buttonStyle = computed(() => {
  return currentTheme.value === 'light'
    ? {
        backgroundColor: '#333',
        color: 'rgb(224, 224, 179)',
      }
    : {
        backgroundColor: 'rgb(224, 224, 179)',
        color: '#333',
      }
})

function toggleColor() {
  setTheme(currentTheme.value === 'light' ? 'dark' : 'light')
}
</script>

<style scoped>
button {
  position: fixed;
  top: 5.5rem;
  right: 1rem;
  z-index: 999;
  padding: 10px 25px;
  border-radius: 16px;
}
</style>
