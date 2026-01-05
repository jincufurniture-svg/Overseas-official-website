<template>
  <el-container class="min-h-screen bg-gray-50 font-sans">
    <el-aside
      width="260px"
      class="bg-gray-900 border-r border-gray-800 flex flex-col relative transition-all duration-300"
    >
      <div
        class="h-16 flex items-center justify-center border-b border-gray-800 bg-gray-900"
      >
        <h1 class="text-xl font-heading font-bold text-white tracking-wider">
          JINCU <span class="text-wood">ADMIN</span>
        </h1>
      </div>

      <el-menu
        :default-active="activeMenu"
        class="border-r-0 flex-1 bg-gray-900 text-gray-300"
        text-color="#9ca3af"
        active-text-color="#C19A6B"
        background-color="#111827"
        router
      >
        <div
          class="px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
        >
          管理
        </div>

        <el-menu-item index="/admin/cases">
          <el-icon><Picture /></el-icon>
          <span>案例管理</span>
        </el-menu-item>
        <!-- <el-menu-item index="/admin/products">
          <el-icon><Box /></el-icon>
          <span>产品管理</span>
        </el-menu-item>
        <el-menu-item index="/admin/categories">
          <el-icon><Files /></el-icon>
          <span>分类管理</span>
        </el-menu-item> -->
        <el-menu-item index="/admin/contacts">
          <el-icon><Message /></el-icon>
          <span>留言管理</span>
        </el-menu-item>
      </el-menu>

      <div class="p-4 border-t border-gray-800 bg-gray-900">
        <div class="flex items-center gap-3 mb-4 px-2">
          <div
            class="w-8 h-8 rounded-full bg-wood flex items-center justify-center text-white font-bold"
          >
            A
          </div>
          <div class="text-sm">
            <div class="text-white font-medium">管理员</div>
          </div>
        </div>
        <el-button
          type="danger"
          class="w-full justify-center bg-transparent border-gray-700 hover:bg-gray-800 text-gray-400 hover:text-white"
          @click="logout"
        >
          退出登录
        </el-button>
      </div>
    </el-aside>

    <el-container>
      <el-header
        class="bg-white h-16 border-b flex items-center justify-between px-6 sticky top-0 z-10 shadow-sm"
      >
        <div class="flex items-center gap-2 text-sm text-gray-500">
          <span class="text-gray-400">后台</span>
          <span class="text-gray-300">/</span>
          <span class="text-gray-800 font-medium capitalize">{{
            route.name?.toString().split("-").pop() || "仪表盘"
          }}</span>
        </div>
      </el-header>

      <el-main class="bg-gray-50 p-6">
        <div class="max-w-7xl mx-auto">
          <slot />
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import {
  Box,
  Files,
  Message,
  Picture,
  SwitchButton,
  Bell,
} from "@element-plus/icons-vue";

const supabase = useSupabaseClient();
const router = useRouter();
const route = useRoute();
const appStore = useAppStore();

const activeMenu = computed(() => {
  // Handle sub-routes highlighting the parent menu
  if (route.path.startsWith("/admin/cases")) return "/admin/cases";
  return route.path;
});

const logout = async () => {
  await supabase.auth.signOut();
  router.push("/admin/login");
};

onMounted(() => {
  appStore.setLocale("zh");
});
</script>

<style scoped>
.el-aside, .el-container {
  height: 100vh;
}

.el-menu {
  border-right: 0;
}

.el-menu-item {
  margin: 4px 12px;
  border-radius: 6px;
  height: 48px;
}
.el-menu-item.is-active {
  background-color: rgba(193, 154, 107, 0.1) !important;
  color: var(--el-color-primary);
  font-weight: 600;
}
.el-menu-item:hover {
  background-color: rgba(255, 255, 255, 0.05) !important;
}
</style>
