import { defineStore } from "pinia";

export const useAppStore = defineStore("app", {
  state: () => ({
    locale: "en",
  }),
  actions: {
    setLocale(locale: string) {
      console.log("setLocale", locale);
      this.locale = locale;
      if (process.client) {
        localStorage.setItem("locale", locale);
        const nuxtApp = useNuxtApp();
        const i18n = nuxtApp.$i18n;
        if (i18n) {
          i18n.setLocale(locale as "en" | "zh");
          const cookie = useCookie("i18n_redirected");
          cookie.value = locale;
        }
      }
    },
    initLocale() {
      if (process.client) {
        const stored = localStorage.getItem("locale");
        if (stored && ["en", "zh"].includes(stored)) {
          this.setLocale(stored);
        } else {
          this.setLocale("en");
        }
      }
    },
  },
});
