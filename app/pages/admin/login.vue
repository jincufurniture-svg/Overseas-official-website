<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-900 relative overflow-hidden"
  >
    <!-- Decorative background elements -->
    <div
      class="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none"
    >
      <div
        class="absolute top-0 right-0 w-[500px] h-[500px] bg-wood rounded-full blur-[100px] transform translate-x-1/2 -translate-y-1/2"
      ></div>
      <div
        class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gray-700 rounded-full blur-[100px] transform -translate-x-1/2 translate-y-1/2"
      ></div>
    </div>

    <div class="w-full max-w-md p-6 relative z-10">
      <div class="text-center mb-10">
        <h1
          class="text-3xl font-heading font-bold text-white tracking-wider mb-2"
        >
          JINCU <span class="text-wood">ADMIN</span>
        </h1>
        <p class="text-gray-400">登录后台系统</p>
      </div>

      <el-card
        class="border-0 shadow-2xl bg-white/95 backdrop-blur-sm"
        :body-style="{ padding: '40px' }"
      >
        <el-form
          @submit.prevent="handleLogin"
          label-position="top"
          size="large"
        >
          <el-form-item label="邮箱">
            <el-input
              v-model="email"
              type="email"
              placeholder="请输入邮箱地址"
              required
              :prefix-icon="User"
            />
          </el-form-item>
          <el-form-item label="密码">
            <el-input
              v-model="password"
              type="password"
              placeholder="请输入密码"
              required
              show-password
              :prefix-icon="Lock"
            />
          </el-form-item>

          <div class="flex justify-between items-center mb-6 text-sm">
            <el-checkbox label="记住我" />
            <a
              href="#"
              class="text-wood hover:text-wood-dark hover:underline"
              @click="handleForgotPassword"
              >忘记密码？</a
            >
          </div>

          <el-button
            type="primary"
            native-type="submit"
            :loading="loading"
            class="w-full bg-black border-black hover:bg-gray-800 hover:border-gray-800 h-12 text-base font-medium tracking-wide mb-4"
          >
            登录
          </el-button>

          <el-alert
            v-if="error"
            :title="error"
            type="error"
            show-icon
            :closable="false"
            class="mt-6"
          />
        </el-form>
      </el-card>

      <div class="text-center mt-8 text-gray-500 text-sm">
        &copy; {{ new Date().getFullYear() }} Jincu 家具 版权所有
      </div>
    </div>
  </div>
</template>

<script setup>
import { User, Lock } from "@element-plus/icons-vue";

definePageMeta({
  layout: false,
});

const supabase = useSupabaseClient();
const router = useRouter();
 
const email = ref("");
const password = ref("");
const loading = ref(false);
const error = ref("");

const handleLogin = async () => {
  loading.value = true;
  error.value = "";

  const { error: authError } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value,
  });

  if (authError) {
    error.value = authError.message;
    ElMessage.error(authError.message);
    loading.value = false;
  } else {
    // Wait for session to be established before redirecting
    ElMessage.success("登录成功");
    router.push("/admin/products");
  }
};

const handleForgotPassword = (e) => {
  e.preventDefault();
  ElMessage({
    message: "请联系管理员修改密码",
    type: "info",
  });
};
</script>
