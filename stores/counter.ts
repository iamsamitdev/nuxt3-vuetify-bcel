// stores/counter.ts
import { defineStore } from "pinia"

export const useCounterStore = defineStore('counter', {

    // State
    state:() => {
        return {
            count: 0
        }
    },

    persist: true,

    // Actions
    actions: {
        // Increment the count
        increment() {
            this.count++
        },
        // Decrement the count
        decrement() {
            this.count--
        }
    }

})