export default defineNuxtRouteMiddleware((to, from) => {
  const user = useSupabaseUser()

  if (!user.value && to.path !== '/admin/login') {
    return navigateTo('/admin/login')
  }
})
