<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden">
    <!-- Decorative background elements -->
    <div class="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
       <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-wood rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2"></div>
       <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gray-700 rounded-full blur-[100px] transform -translate-x-1/2 translate-y-1/2"></div>
    </div>

    <div class="w-full max-w-md p-6 relative z-10">
      <div class="text-center mb-10">
        <h1 class="text-3xl font-heading font-bold text-white tracking-wider mb-2">
          JINCU <span class="text-wood">ADMIN</span>
        </h1>
        <p class="text-gray-400">Sign in to manage your inventory</p>
      </div>

      <el-card class="border-0 shadow-2xl bg-white/95 backdrop-blur-sm" :body-style="{ padding: '40px' }">
        <el-form @submit.prevent="handleLogin" label-position="top" size="large">
          <el-form-item label="Email">
            <el-input 
              v-model="email" 
              type="email" 
              placeholder="name@company.com" 
              required 
              :prefix-icon="User"
            />
          </el-form-item>
          <el-form-item label="Password">
            <el-input 
              v-model="password" 
              type="password" 
              placeholder="••••••••" 
              required 
              show-password 
              :prefix-icon="Lock"
            />
          </el-form-item>
          
          <div class="flex justify-between items-center mb-6 text-sm">
             <el-checkbox label="Remember me" />
             <a href="#" class="text-wood hover:text-wood-dark hover:underline">Forgot password?</a>
          </div>

          <el-button type="primary" native-type="submit" :loading="loading" class="w-full bg-black border-black hover:bg-gray-800 hover:border-gray-800 h-12 text-base font-medium tracking-wide">
            Sign In
          </el-button>
          
          <el-alert v-if="error" :title="error" type="error" show-icon :closable="false" class="mt-6" />
        </el-form>
      </el-card>
      
      <div class="text-center mt-8 text-gray-500 text-sm">
        &copy; {{ new Date().getFullYear() }} Jincu Furniture. All rights reserved.
      </div>
    </div>
  </div>
</template>

<script setup>
import { User, Lock } from '@element-plus/icons-vue'

definePageMeta({
  layout: false
})

const supabase = useSupabaseClient()
const router = useRouter()

const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

const handleLogin = async () => {
  loading.value = true
  error.value = ''
  
  const { error: authError } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  if (authError) {
    error.value = authError.message
    ElMessage.error(authError.message)
  } else {
    // Wait for session to be established before redirecting
    const user = useSupabaseUser()
    watch(user, (newUser) => {
      if (newUser) {
        ElMessage.success('Login successful')
        router.push('/admin/products')
      }
    }, { immediate: true })
  }
  loading.value = false
}
</script>
