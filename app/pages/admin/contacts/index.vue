<template>
  <div>
    <h2 class="text-2xl font-bold text-gray-800 mb-6">Contact Submissions</h2>

    <el-card shadow="never" :body-style="{ padding: '0' }" v-loading="loading">
      <el-table :data="contacts" style="width: 100%" size="large">
        <el-table-column label="Date" width="120" sortable prop="created_at">
          <template #default="scope">
            {{ new Date(scope.row.created_at).toLocaleDateString() }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="Name" width="150" />
        <el-table-column prop="phone" label="Phone" width="150" />
        <el-table-column prop="description" label="Description" show-overflow-tooltip />
        <el-table-column label="Status" width="120">
          <template #default="scope">
            <el-tag :type="statusType(scope.row.status)">
              {{ scope.row.status }}
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

onMounted(() => {
  fetchContacts()
})
</script>
