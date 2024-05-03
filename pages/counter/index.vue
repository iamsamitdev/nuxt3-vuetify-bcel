<script setup lang="ts">
    // import store counter
    import { useCounterStore } from '@/stores/counter'

    import CartItem from '@/components/cart/cartItem.vue';

    // create counter object
    const counter = useCounterStore()

    const { setLocale } = useI18n()

</script>

<template>
    <div>
    
    <v-card class="mx-auto" width="400">
      <button @click="setLocale('en')">EN</button> / 
      <button @click="setLocale('th')">TH</button>
      <p>{{ $t('hello') }}</p>
    </v-card>

      <!-- Cart -->
      <CartItem />

      <v-card class="mx-auto" width="400">
        <v-card-title>
          Counter
        </v-card-title>
        <v-card-text>
          <p>Count: {{ counter.count }}</p>
        </v-card-text>
        <v-card-actions>
          <v-btn variant="text" color="teal-accent-4" @click="counter.increment()">
              Count Up
          </v-btn>
          <v-btn variant="text" color="red-accent-4" @click="counter.decrement()">
              Count Down
          </v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </template>
  
  <style scoped>
  
  </style>
  