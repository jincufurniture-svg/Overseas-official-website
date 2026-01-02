<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-800 tracking-tight">分类管理</h2>
        <p class="text-gray-500 text-sm mt-1">使用分类来组织产品</p>
      </div>
      <el-button type="primary" class="bg-black border-black hover:bg-gray-800 hover:border-gray-800" @click="openDialog()">
        <el-icon class="mr-2"><Plus /></el-icon>
        新增分类
      </el-button>
    </div>

    <el-card shadow="hover" class="border-0 ring-1 ring-gray-200 rounded-lg overflow-hidden" :body-style="{ padding: '0' }" v-loading="loading">
      <el-table :data="categories" empty-text="无数据" style="width: 100%" size="large" :header-cell-style="{ background: '#f9fafb', color: '#4b5563', fontWeight: '600' }">
        <el-table-column prop="name_en" label="英文名称" />
        <el-table-column prop="name_zh" label="中文名称" />
        
        <el-table-column label="操作" width="180" align="right">
          <template #default="scope">
            <el-button-group>
              <el-button size="small" :icon="Edit" @click="openDialog(scope.row)" />
              <el-button 
                size="small" 
                type="danger" 
                plain
                :icon="Delete"
                @click="handleDelete(scope.row)"
              />
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- Dialog -->
    <el-dialog
      v-model="dialogVisible"
      :title="isEdit ? '编辑分类' : '新增分类'"
      width="500px"
      destroy-on-close
    >
      <el-form :model="form" label-position="top" ref="formRef" :rules="rules">
        <el-form-item label="分类名称（英文）" prop="name_en">
          <el-input v-model="form.name_en" placeholder="例如：Office Chairs" />
        </el-form-item>
        <el-form-item label="分类名称（中文）" prop="name_zh">
          <el-input v-model="form.name_zh" placeholder="例如：办公椅" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" class="bg-black border-black hover:bg-gray-800" @click="saveCategory" :loading="saving">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { Plus, Edit, Delete } from '@element-plus/icons-vue'

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const supabase = useSupabaseClient()
const categories = ref([])
const loading = ref(true)
const dialogVisible = ref(false)
const saving = ref(false)
const isEdit = ref(false)
const formRef = ref(null)

const form = reactive({
  id: null,
  name_en: '',
  name_zh: ''
})

const rules = {
  name_en: [{ required: true, message: '请输入英文名称', trigger: 'blur' }],
  name_zh: [{ required: true, message: '请输入中文名称', trigger: 'blur' }]
}

const fetchCategories = async () => {
  loading.value = true
  const { data: cats } = await supabase.from('categories').select('*').order('sort_order')
  if (cats) {
    categories.value = cats
  }
  loading.value = false
}

const openDialog = (category = null) => {
  if (category) {
    isEdit.value = true
    form.id = category.id
    form.name_en = category.name_en
    form.name_zh = category.name_zh
  } else {
    isEdit.value = false
    form.id = null
    form.name_en = ''
    form.name_zh = ''
  }
  dialogVisible.value = true
}

const saveCategory = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid) => {
    if (valid) {
      saving.value = true
      
      try {
        if (isEdit.value) {
          const { error } = await supabase.from('categories')
            .update({ name_en: form.name_en, name_zh: form.name_zh })
            .eq('id', form.id)
          if (error) throw error
          ElMessage.success('分类已更新')
        } else {
          const insertData = {
            name_en: form.name_en,
            name_zh: form.name_zh
          }

          let { error } = await supabase.from('categories').insert(insertData)
          
          if (error) {
            throw error
          }
          ElMessage.success('分类已新增')
        }
        
        dialogVisible.value = false
        fetchCategories()
      } catch (e) {
        ElMessage.error(e.message)
      } finally {
        saving.value = false
      }
    }
  })
}

const handleDelete = (cat) => {
  ElMessageBox.confirm(
    '确定要删除该分类吗？此操作不可撤销。',
    '删除分类',
    {
      confirmButtonText: '删除',
      cancelButtonText: '取消',
      type: 'warning',
      icon: Delete
    }
  ).then(async () => {
    const { error: deleteError } = await supabase.from('categories').delete().eq('id', cat.id)
    
    if (deleteError) {
      ElMessage.error(deleteError.message)
    } else {
      ElMessage.success('分类已删除')
      fetchCategories()
    }
  })
}

onMounted(() => {
  fetchCategories()
})
</script>
