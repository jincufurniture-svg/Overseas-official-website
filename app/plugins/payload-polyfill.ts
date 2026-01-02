export default defineNuxtPlugin((nuxtApp) => {
  if (import.meta.server) {
    const anyApp = nuxtApp as any
    if (!anyApp.payload) {
      anyApp.payload = { state: {} }
    } else if (!anyApp.payload.state) {
      anyApp.payload.state = {}
    }
  }
})
