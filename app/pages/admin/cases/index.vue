<template>
  <div>
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-800 tracking-tight">案例管理</h2>
        <p class="text-gray-500 text-sm mt-1">上传案例图片并拖拽排序</p>
      </div>
      <div class="flex gap-3">
        <el-upload
          :show-file-list="false"
          :before-upload="beforeUpload"
          :http-request="handleUpload"
          accept="image/*"
        >
          <el-button type="primary" class="bg-black border-black hover:bg-gray-800 hover:border-gray-800" :loading="uploading">
            <el-icon class="mr-2"><Plus /></el-icon>
            上传图片
          </el-button>
        </el-upload>
      </div>
    </div>

    <el-card shadow="hover" class="border-0 ring-1 ring-gray-200 rounded-lg overflow-hidden" :body-style="{ padding: '0' }" v-loading="loading">
      <el-table 
        ref="tableRef"
        :data="cases" 
        row-key="id"
        empty-text="暂无案例图片" 
        style="width: 100%" 
        size="large" 
        :header-cell-style="{ background: '#f9fafb', color: '#4b5563', fontWeight: '600' }"
      >
        <el-table-column width="60">
          <template #default>
            <div class="sort-handle cursor-move text-gray-400 hover:text-gray-600">
              <el-icon><Rank /></el-icon>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="图片预览">
          <template #default="scope">
            <el-image 
              :src="scope.row.image_url" 
              class="h-24 w-32 rounded-lg object-cover border border-gray-100 shadow-sm" 
              fit="cover"
              :preview-src-list="[scope.row.image_url]"
              preview-teleported
            />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="120" align="right">
          <template #default="scope">
            <el-button 
              size="small" 
              type="danger" 
              plain
              :icon="Delete"
              @click="handleDelete(scope.row)"
            />
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { Plus, Delete, Rank } from '@element-plus/icons-vue'
import Sortable from 'sortablejs'

definePageMeta({
  layout: 'admin',
  middleware: 'auth',
  name: '案例管理',
})

const cases = ref([])
const loading = ref(true)
const uploading = ref(false)
const tableRef = ref(null)

const fetchCases = async () => {
  loading.value = true
  try {
    const data = await $fetch('/api/admin/cases')
    cases.value = Array.isArray(data) ? data : []
    initSortable()
  } catch (e) {
    ElMessage.error('获取案例列表失败')
  }
  loading.value = false
}

const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  const isLt30M = file.size / 1024 / 1024 < 30

  if (!isImage) {
    ElMessage.error('只能上传图片文件!')
  }
  if (!isLt30M) {
    ElMessage.error('图片大小不能超过 30MB!')
  }
  return isImage && isLt30M
}

const handleUpload = async (options) => {
  uploading.value = true
  const formData = new FormData()
  formData.append('file', options.file)

  try {
    // 1. Upload file to storage
    const { url } = await $fetch('/api/admin/files', {
      method: 'POST',
      body: formData
    })

    // 2. Create case record
    const newCase = await $fetch('/api/admin/cases', {
      method: 'POST',
      body: { image_url: url }
    })

    ElMessage.success('上传成功')
    cases.value.push(newCase)
    // Re-init sortable to include new row if needed, but Vue reactivity should handle DOM
  } catch (e) {
    ElMessage.error('上传失败')
    console.error(e)
  }
  uploading.value = false
}

const handleDelete = (item) => {
  ElMessageBox.confirm(
    '确定要删除该图片吗？',
    '删除图片',
    {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning',
      icon: Delete
    }
  ).then(async () => {
    try {
      await $fetch(`/api/admin/cases/${item.id}`, {
        method: 'DELETE'
      })
      ElMessage.success('已删除')
      cases.value = cases.value.filter(c => c.id !== item.id)
    } catch (e) {
      ElMessage.error('删除失败')
    }
  })
}

const initSortable = () => {
  nextTick(() => {
    if (!tableRef.value) return
    const el = tableRef.value.$el.querySelector('.el-table__body-wrapper tbody')
    if (!el) return

    Sortable.create(el, {
      handle: '.sort-handle',
      animation: 150,
      onEnd: async (evt) => {
        const { oldIndex, newIndex } = evt
        if (oldIndex === newIndex) return

        // Move item in array
        const item = cases.value.splice(oldIndex, 1)[0]
        cases.value.splice(newIndex, 0, item)

        // Save new order
        try {
          await $fetch('/api/admin/cases/sort', {
            method: 'POST',
            body: { items: cases.value }
          })
          ElMessage.success('排序已更新')
        } catch (e) {
          ElMessage.error('保存排序失败')
        }
      }
    })
  })
}

onMounted(() => {
  fetchCases()
})
</script>

<style scoped>
.sort-handle {
  cursor: grab;
}
.sort-handle:active {
  cursor: grabbing;
}
</style>
