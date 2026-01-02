<template>
  <div class="max-w-4xl mx-auto">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-gray-800">{{ isEdit ? 'Edit Product' : 'Create Product' }}</h2>
      <el-button @click="router.push('/admin/products')">Back</el-button>
    </div>
    
    <el-form :model="form" label-position="top" class="bg-white shadow rounded-lg p-6" v-loading="saving || uploading">
      
      <!-- Basic Info -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <el-form-item label="Category">
          <el-select v-model="form.category_id" placeholder="Select category" class="w-full">
            <el-option
              v-for="cat in categories"
              :key="cat.id"
              :label="cat.name"
              :value="cat.id"
            />
          </el-select>
        </el-form-item>
      </div>

      <el-form-item label="Product Image" class="mb-8">
        <div class="flex items-start gap-4">
          <el-image 
            v-if="form.image_url" 
            :src="form.image_url" 
            class="w-32 h-32 rounded border object-cover"
            fit="cover"
          />
          <div class="flex-1">
             <input type="file" @change="handleImageUpload" accept="image/*" class="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200 transition-colors" />
             <div class="text-xs text-gray-500 mt-2">Recommended size: 800x800px. Max 2MB.</div>
          </div>
        </div>
      </el-form-item>

      <el-tabs type="border-card" class="mb-6">
        <el-tab-pane label="English (EN)">
          <el-form-item label="Name">
            <el-input v-model="form.en.name" />
          </el-form-item>
          <el-form-item label="Description">
            <el-input v-model="form.en.description" type="textarea" :rows="3" />
          </el-form-item>
          <div class="grid grid-cols-3 gap-4">
            <el-form-item label="Material">
              <el-input v-model="form.en.specs.material" />
            </el-form-item>
            <el-form-item label="Dimensions">
              <el-input v-model="form.en.specs.dimensions" />
            </el-form-item>
            <el-form-item label="Weight">
              <el-input v-model="form.en.specs.weight" />
            </el-form-item>
          </div>
        </el-tab-pane>
        
        <el-tab-pane label="Chinese (ZH)">
          <el-form-item label="Name">
            <el-input v-model="form.zh.name" />
          </el-form-item>
          <el-form-item label="Description">
            <el-input v-model="form.zh.description" type="textarea" :rows="3" />
          </el-form-item>
           <div class="grid grid-cols-3 gap-4">
            <el-form-item label="Material">
              <el-input v-model="form.zh.specs.material" />
            </el-form-item>
            <el-form-item label="Dimensions">
              <el-input v-model="form.zh.specs.dimensions" />
            </el-form-item>
            <el-form-item label="Weight">
              <el-input v-model="form.zh.specs.weight" />
            </el-form-item>
          </div>
        </el-tab-pane>
      </el-tabs>

      <div class="flex justify-end">
        <el-button @click="router.push('/admin/products')">Cancel</el-button>
        <el-button type="primary" class="bg-black border-black hover:bg-gray-800 hover:border-gray-800" @click="saveProduct" :loading="saving">
          Save Product
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const route = useRoute()
const router = useRouter()
const supabase = useSupabaseClient()

const isEdit = computed(() => route.params.key !== undefined && route.params.key !== 'create')
const categories = ref([])
const uploading = ref(false)
const saving = ref(false)
const productId = ref(null)

const form = ref({
  category_id: null,
  image_url: '',
  en: { name: '', description: '', specs: { material: '', dimensions: '', weight: '' } },
  zh: { name: '', description: '', specs: { material: '', dimensions: '', weight: '' } }
})

// Fetch categories
const fetchCategories = async () => {
  const { data } = await supabase.from('categories').select('id, name_en')
  if (data) categories.value = data.map(c => ({ id: c.id, name: c.name_en }))
}

const fetchProduct = async () => {
  try {
    const data = await $fetch(`/api/admin/products/detail`, {
      query: { id: route.params.key }
    })
    productId.value = data.id
    form.value = {
      category_id: data.category_id,
      image_url: data.image_url,
      en: data.en,
      zh: data.zh
    }
  } catch (e) {
    ElMessage.error('Failed to load product')
    router.push('/admin/products')
  }
}

const handleImageUpload = async (e) => {
  const file = e.target.files[0]
  if (!file) return

  uploading.value = true
  const formData = new FormData()
  formData.append('file', file)

  try {
    const { data, error } = await useFetch('/api/admin/files', {
      method: 'POST',
      body: formData
    })
    if (data.value) {
      form.value.image_url = data.value.url
      ElMessage.success('Image uploaded')
    }
  } catch (e) {
    ElMessage.error('Upload failed')
  } finally {
    uploading.value = false
  }
}

const saveProduct = async () => {
  saving.value = true
  try {
    const productData = {
      category_id: form.value.category_id,
      image_url: form.value.image_url,
      en: form.value.en,
      zh: form.value.zh
    }
    
    if (isEdit.value) {
      await $fetch(`/api/admin/products/${productId.value}`, {
        method: 'PUT',
        body: productData
      })
      ElMessage.success('Product updated')
    } else {
      await $fetch('/api/admin/products', {
        method: 'POST',
        body: productData
      })
      
      ElMessage.success('Product created')
    }

    router.push('/admin/products')
  } catch (e) {
    console.error(e)
    ElMessage.error('Error saving product: ' + e.message)
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  fetchCategories()
  if (isEdit.value) {
    fetchProduct()
  }
})
</script>
