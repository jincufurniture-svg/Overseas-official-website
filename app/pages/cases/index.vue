<template>
  <div>
    <section class="pt-24 pb-16">
      <div class="container text-center">
        <h1 class="text-4xl md:text-5xl font-heading font-bold text-black mb-4">{{ $t('home.cases.title') }}</h1>
        <p class="text-grey font-light max-w-2xl mx-auto">{{ $t('home.cases.subtitle') }}</p>
      </div>
    </section>

    <section class="py-16 bg-white">
      <div class="container">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(item, index) in cases" 
            :key="item.id"
            class="group cursor-pointer block"
            @click="openImage(item, index)"
          >
            <div class="bg-beige overflow-hidden relative aspect-[4/5] mb-4">
              <img 
                :src="item.image_url" 
                class="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                :ref="el => imageRefs[index] = el"
                loading="lazy"
              />
              <div class="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Fullscreen Overlay -->
      <div 
        v-if="activeImage" 
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/90 transition-opacity duration-300"
        :class="{ 'opacity-0': !overlayVisible, 'opacity-100': overlayVisible }"
        @click="closeImage"
      >
        <img 
          v-if="activeImage"
          :src="activeImage.image_url" 
          class="max-w-full max-h-screen object-contain transition-all duration-500 ease-out origin-center"
          :style="imageStyle"
          @click.stop
        />
        <button class="absolute top-4 right-4 text-white text-4xl hover:text-gray-300" @click="closeImage">&times;</button>
      </div>
    </section>
  </div>
</template>

<script setup>
const { t } = useI18n()
const cases = ref([])
const imageRefs = ref({})
const activeImage = ref(null)
const overlayVisible = ref(false)
const imageStyle = ref({})

// Fetch cases
const { data } = await useFetch('/api/cases')
if (data.value) {
  cases.value = data.value
}

const openImage = async (item, index) => {
  const el = imageRefs.value[index]
  if (!el) return

  const rect = el.getBoundingClientRect()
  
  // Initial state (match the thumbnail position)
  activeImage.value = item
  
  // Calculate the target size (fit within screen)
  const windowWidth = window.innerWidth
  const windowHeight = window.innerHeight
  const targetScale = Math.min((windowWidth * 0.9) / rect.width, (windowHeight * 0.9) / rect.height)
  
  const targetWidth = rect.width * targetScale
  const targetHeight = rect.height * targetScale
  
  const targetX = (windowWidth - targetWidth) / 2
  const targetY = (windowHeight - targetHeight) / 2

  // Start animation from thumbnail position
  imageStyle.value = {
    position: 'fixed',
    top: `${rect.top}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    transform: 'none'
  }

  // Force reflow
  await nextTick()
  
  // Animate to center
  // We use a timeout to allow the v-if to render and the browser to paint the initial state
  requestAnimationFrame(() => {
    overlayVisible.value = true
    imageStyle.value = {
      position: 'fixed',
      top: `${targetY}px`,
      left: `${targetX}px`,
      width: `${targetWidth}px`,
      height: `${targetHeight}px`,
      transform: 'none'
    }
  })
}

const closeImage = () => {
  overlayVisible.value = false
  setTimeout(() => {
    activeImage.value = null
  }, 300)
}
</script>
