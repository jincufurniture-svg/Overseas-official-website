export default defineNuxtPlugin((nuxtApp) => {
  const a: any = nuxtApp
  if (!a.payload) a.payload = {}
  if (!a.payload.state) a.payload.state = {}
  nuxtApp.hooks.hook('app:rendered', () => {
    const b: any = nuxtApp
    if (!b.payload) b.payload = {}
    if (!b.payload.state) b.payload.state = {}
  })
})
