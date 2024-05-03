<script setup lang="ts">

// import store counter
import { useCounterStore } from '@/stores/counter'

// create counter object
const counter = useCounterStore()

</script>

<template>
    <div>
        <v-card class="mx-auto"
            width="400">
            <v-card-title>
                Cart
            </v-card-title>
            <v-card-text>
                <p>Cart Item {{ counter.count }} </p>
            </v-card-text>
        </v-card>
    </div>
</template>

<style scoped></style>