<template>
  <div>
    <div class="flex justify-between items-center mb-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-800 tracking-tight">Categories</h2>
        <p class="text-gray-500 text-sm mt-1">Organize your products with categories</p>
      </div>
      <el-button type="primary" class="bg-black border-black hover:bg-gray-800 hover:border-gray-800" @click="openDialog()">
        <el-icon class="mr-2"><Plus /></el-icon>
        Add Category
      </el-button>
    </div>

    <el-card shadow="hover" class="border-0 ring-1 ring-gray-200 rounded-lg overflow-hidden" :body-style="{ padding: '0' }" v-loading="loading">
      <el-table :data="categories" style="width: 100%" size="large" :header-cell-style="{ background: '#f9fafb', color: '#4b5563', fontWeight: '600' }">
        <el-table-column prop="name_en" label="Name (EN)" />
        <el-table-column prop="name_zh" label="Name (ZH)" />
        
        <el-table-column label="Actions" width="180" align="right">
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
      :title="isEdit ? 'Edit Category' : 'Add Category'"
      width="500px"
      destroy-on-close
    >
      <el-form :model="form" label-position="top" ref="formRef" :rules="rules">
        <el-form-item label="Category Name (EN)" prop="name_en">
          <el-input v-model="form.name_en" placeholder="e.g. Office Chairs" />
        </el-form-item>
        <el-form-item label="Category Name (ZH)" prop="name_zh">
          <el-input v-model="form.name_zh" placeholder="e.g. 办公椅" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" class="bg-black border-black hover:bg-gray-800" @click="saveCategory" :loading="saving">
            Confirm
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
  name_en: [{ required: true, message: 'Please enter English name', trigger: 'blur' }],
  name_zh: [{ required: true, message: 'Please enter Chinese name', trigger: 'blur' }]
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
          ElMessage.success('Category updated')
        } else {
          const insertData = {
            name_en: form.name_en,
            name_zh: form.name_zh
          }

          let { error } = await supabase.from('categories').insert(insertData)
          
          if (error) {
            throw error
          }
          ElMessage.success('Category added')
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
    'Are you sure you want to delete this category? This action cannot be undone.',
    'Delete Category',
    {
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      type: 'warning',
      icon: Delete
    }
  ).then(async () => {
    const { error: deleteError } = await supabase.from('categories').delete().eq('id', cat.id)
    
    if (deleteError) {
      ElMessage.error(deleteError.message)
    } else {
      ElMessage.success('Category deleted successfully')
      fetchCategories()
    }
  })
}

onMounted(() => {
  fetchCategories()
})
</script>
