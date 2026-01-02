<template>
  <div>
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
      <div>
        <h2 class="text-2xl font-bold text-gray-800 tracking-tight">Products</h2>
        <p class="text-gray-500 text-sm mt-1">Manage your product catalog and inventory</p>
      </div>
      <div class="flex gap-3">
        <el-input
          placeholder="Search products..."
          prefix-icon="Search"
          class="w-64"
        />
        <el-button type="primary" class="bg-black border-black hover:bg-gray-800 hover:border-gray-800" @click="navigateTo('/admin/products/create')">
          <el-icon class="mr-2"><Plus /></el-icon>
          Add Product
        </el-button>
      </div>
    </div>

    <el-card shadow="hover" class="border-0 ring-1 ring-gray-200 rounded-lg overflow-hidden" :body-style="{ padding: '0' }" v-loading="loading">
      <el-table :data="products" style="width: 100%" size="large" :header-cell-style="{ background: '#f9fafb', color: '#4b5563', fontWeight: '600' }">
        <el-table-column label="Product Info" width="300">
          <template #default="scope">
            <div class="flex items-center gap-4 py-2">
              <el-image 
                :src="scope.row.image" 
                class="h-12 w-12 rounded-lg object-cover border border-gray-100 shadow-sm" 
                fit="cover"
                :preview-src-list="[scope.row.image]"
                preview-teleported
              />
              <div>
                <div class="font-medium text-gray-900">{{ scope.row.name }}</div>
                <!-- <div class="text-xs text-gray-500 truncate max-w-[180px]">{{ scope.row.key }}</div> -->
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="category" label="Category">
           <template #default="scope">
             <el-tag effect="plain" type="info" round size="small" class="uppercase text-xs tracking-wider border-0 bg-gray-100 text-gray-600">
               {{ scope.row.category }}
             </el-tag>
           </template>
        </el-table-column>
        <el-table-column label="Status" width="120">
           <template #default>
             <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
               Active
             </span>
           </template>
        </el-table-column>
        <el-table-column label="Actions" width="180" align="right">
          <template #default="scope">
            <el-button-group>
              <el-button size="small" :icon="Edit" @click="navigateTo(`/admin/products/${scope.row.id}`)" />
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
      <div class="p-4 border-t border-gray-100 flex justify-end">
         <el-pagination background layout="prev, pager, next" :total="products.length" />
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { Search, Plus, Edit, Delete } from '@element-plus/icons-vue'

definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const products = ref([])
const loading = ref(true)

const fetchProducts = async () => {
  loading.value = true
  const { data, error: fetchError } = await useFetch('/api/products', {
    query: { language: 'en' }
  })
  if (data.value) {
    products.value = data.value
  } else if (fetchError.value) {
    ElMessage.error('Failed to fetch products')
  }
  loading.value = false
}

const handleDelete = (product) => {
  ElMessageBox.confirm(
    'Are you sure you want to delete this product? This action cannot be undone.',
    'Delete Product',
    {
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      type: 'warning',
      icon: Delete
    }
  ).then(async () => {
    try {
      await $fetch(`/api/admin/products/${product.id}`, {
        method: 'DELETE'
      })
      ElMessage.success('Product deleted successfully')
      products.value = products.value.filter(p => p.id !== product.id)
    } catch (e) {
      ElMessage.error('Failed to delete product')
      fetchProducts()
    }
  })
}

onMounted(() => {
  fetchProducts()
})
</script>
