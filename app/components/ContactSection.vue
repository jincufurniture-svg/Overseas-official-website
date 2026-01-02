<template>
  <section id="contact" class="py-24 bg-white">
    <div class="container">
      <div class="flex flex-col lg:flex-row gap-16">
        <!-- Contact Info -->
        <div class="w-full lg:w-1/3 space-y-8">
          <div class="space-y-4">
            <h2 class="text-3xl md:text-4xl font-heading font-bold text-black">{{ $t('contact.title') }}</h2>
            <p class="text-grey font-light">{{ $t('contact.subtitle') }}</p>
          </div>

          <div class="space-y-6 pt-4">
            <!-- Address -->
            <a 
              href="https://www.google.com/maps/search/?api=1&query=Intersection+of+Chuangfu+6th+Road+and+Chuangxing+11th+Road,+Lecong+Town,+Shunde+District,+Foshan+City,+Guangdong+Province,+China" 
              target="_blank" 
              rel="noopener noreferrer"
              class="flex items-start space-x-4 group"
            >
              <div class="mt-1 w-5 h-5 bg-wood rounded-full flex-shrink-0 group-hover:scale-110 transition-transform"></div>
              <div>
                <h4 class="font-heading font-semibold text-black group-hover:text-wood transition-colors">{{ $t('contact.info.address') }}</h4>
                <p class="text-sm text-grey mt-1 group-hover:text-black transition-colors">{{ $t('contact.info.address_val') }}</p>
              </div>
            </a>

            <!-- WhatsApp -->
            <a 
              href="https://wa.me/8618025998227" 
              target="_blank" 
              rel="noopener noreferrer"
              class="flex items-start space-x-4 group"
            >
              <div class="mt-1 w-5 h-5 bg-wood rounded-full flex-shrink-0 group-hover:scale-110 transition-transform"></div>
              <div>
                <h4 class="font-heading font-semibold text-black group-hover:text-wood transition-colors">{{ $t('contact.info.phone') }}</h4>
                <p class="text-sm text-grey mt-1 group-hover:text-black transition-colors">+86 180 2599 8227</p>
              </div>
            </a>

            <!-- Email -->
            <a 
              href="mailto:jincufurniture@gmail.com" 
              class="flex items-start space-x-4 group"
            >
              <div class="mt-1 w-5 h-5 bg-wood rounded-full flex-shrink-0 group-hover:scale-110 transition-transform"></div>
              <div>
                <h4 class="font-heading font-semibold text-black group-hover:text-wood transition-colors">{{ $t('contact.info.business') }}</h4>
                <p class="text-sm text-grey mt-1 group-hover:text-black transition-colors">jincufurniture@gmail.com</p>
              </div>
            </a>
          </div>
        </div>

        <!-- Form -->
        <div class="w-full lg:w-2/3 bg-beige p-8 md:p-12">
          <form @submit.prevent="submitForm" class="space-y-6">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div class="space-y-2">
                <label class="text-sm font-medium text-grey-dark">{{ $t('contact.form.name') }}</label>
                <input v-model="form.name" type="text" required class="w-full bg-white border border-transparent focus:border-wood px-4 py-3 outline-none transition-colors text-grey-dark" :placeholder="$t('contact.form.name_ph')">
              </div>
              <div class="space-y-2">
                <label class="text-sm font-medium text-grey-dark">{{ $t('contact.form.phone') }}</label>
                <input v-model="form.phone" type="tel" required class="w-full bg-white border border-transparent focus:border-wood px-4 py-3 outline-none transition-colors text-grey-dark" :placeholder="$t('contact.form.phone_ph')">
              </div>
            </div>
            <div class="space-y-2">
              <label class="text-sm font-medium text-grey-dark">{{ $t('contact.form.desc') }}</label>
              <textarea v-model="form.description" rows="4" class="w-full bg-white border border-transparent focus:border-wood px-4 py-3 outline-none transition-colors text-grey-dark" :placeholder="$t('contact.form.desc_ph')"></textarea>
            </div>
            <button type="submit" :disabled="loading" class="bg-black text-white px-8 py-3 text-sm tracking-widest hover:bg-wood transition-colors duration-300 w-full md:w-auto disabled:opacity-50">
              {{ loading ? 'Sending...' : $t('contact.form.submit') }}
            </button>
            <p v-if="success" class="text-green-600 text-sm mt-2">Message sent successfully!</p>
            <p v-if="error" class="text-red-600 text-sm mt-2">Error sending message. Please try again.</p>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const form = ref({
  name: '',
  phone: '',
  description: ''
})
const loading = ref(false)
const success = ref(false)
const error = ref(false)

const submitForm = async () => {
  loading.value = true
  success.value = false
  error.value = false

  try {
    await $fetch('/api/contacts', {
      method: 'POST',
      body: form.value
    })
    success.value = true
    form.value = { name: '', phone: '', description: '' }
  } catch (e) {
    error.value = true
  } finally {
    loading.value = false
  }
}
</script>
