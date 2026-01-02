export default defineNuxtPlugin((nuxtApp) => {
  const store = useAppStore()
  
  if (process.client) {
    store.initLocale()
  } else {
    // SSR handling: try to read from cookie
    const cookie = useCookie('i18n_redirected')
    if (cookie.value && ['en', 'zh'].includes(cookie.value)) {
      store.locale = cookie.value
    }
  }
})
