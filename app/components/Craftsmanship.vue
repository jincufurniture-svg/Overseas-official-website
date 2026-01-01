<template>
  <section id="craftsmanship" class="py-24 bg-beige">
    <div class="container">
      <div class="text-center mb-20 space-y-4">
        <h2 class="text-3xl md:text-4xl font-heading font-bold text-black">{{ $t('craftsmanship.title') }}</h2>
        <p class="text-grey font-light">{{ $t('craftsmanship.subtitle') }}</p>
      </div>

      <div class="relative">
        <!-- Connecting Line (Desktop) -->
        <div class="hidden md:block absolute top-12 left-0 w-full h-px bg-wood/30 z-0"></div>

        <div class="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div v-for="(step, index) in steps" :key="index" class="relative z-10 flex flex-col items-center text-center group">
            <!-- Icon Circle -->
            <div class="w-24 h-24 rounded-full bg-white border border-wood/20 flex items-center justify-center mb-8 shadow-sm group-hover:border-wood group-hover:shadow-md transition-all duration-300">
              <span class="text-3xl text-wood font-heading font-bold">{{ index + 1 }}</span>
            </div>
            
            <h3 class="text-xl font-heading font-semibold text-black mb-3">{{ $t(`craftsmanship.steps.${step.key}.title`) }}</h3>
            <p class="text-sm text-grey leading-relaxed px-4">{{ $t(`craftsmanship.steps.${step.key}.desc`) }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const steps = [
  { key: 'selection' },
  { key: 'drying' },
  { key: 'polishing' },
  { key: 'coating' }
]
</script>
