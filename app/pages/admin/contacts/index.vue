<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-800 mb-6">留言管理</h2>

    <el-card shadow="never" :body-style="{ padding: '0' }" v-loading="loading">
      <el-table :data="contacts" empty-text="无数据" style="width: 100%" size="large">
        <el-table-column label="日期" width="120" sortable prop="created_at">
          <template #default="scope">
            {{ new Date(scope.row.created_at).toLocaleDateString() }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="150" />
        <el-table-column prop="phone" label="电话" width="150" />
        <el-table-column prop="description" label="描述" show-overflow-tooltip />
        <el-table-column label="状态" width="120">
          <template #default="scope">
            <el-tag :type="statusType(scope.row.status)">
              {{ statusText(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})

const supabase = useSupabaseClient()
const contacts = ref([])
const loading = ref(true)

const fetchContacts = async () => {
  loading.value = true
  const { data } = await supabase.from('contacts').select('*').order('created_at', { ascending: false })
  if (data) contacts.value = data
  loading.value = false
}

const statusType = (status) => {
  switch (status) {
    case 'pending': return 'warning'
    case 'contacted': return 'info'
    case 'resolved': return 'success'
    default: return 'info'
  }
}

const statusText = (status) => {
  switch (status) {
    case 'pending': return '待处理'
    case 'contacted': return '已联系'
    case 'resolved': return '已解决'
    default: return '未知'
  }
}

onMounted(() => {
  fetchContacts()
})
</script>
