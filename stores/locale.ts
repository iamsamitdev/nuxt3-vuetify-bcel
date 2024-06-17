import { defineStore } from "pinia"

export const useLocaleStore = defineStore("locale", {

  // State
  state: () => {
    return {
      locale: "en",
    }
  },

  // Actions
  actions: {
    // Set the locale
    setLocale(locale: string) {
        this.locale = locale
    },
  },

})
