<template>
  <section id="brand" class="py-24 bg-beige">
    <div class="container">
      <div class="flex flex-col md:flex-row items-center gap-12 md:gap-20">
        <!-- Image -->
        <div class="w-full md:w-1/2">
          <div class="aspect-[4/3] bg-grey-light overflow-hidden relative">
            <img src="@/assets/images/brand-story.jpg" alt="Brand Story" class="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
          </div>
        </div>

        <!-- Content -->
        <div class="w-full md:w-1/2 space-y-8">
          <h2 class="text-3xl md:text-4xl font-heading font-bold text-black relative inline-block">
            {{ $t('brand.title') }}
            <span class="absolute -bottom-4 left-0 w-12 h-1 bg-wood"></span>
          </h2>
          
          <div class="space-y-6 text-grey-dark font-light leading-relaxed">
            <p>{{ $t('brand.desc1') }}</p>
            <p>{{ $t('brand.desc2') }}</p>
          </div>

          <div class="grid grid-cols-2 gap-6 pt-4">
            <div class="space-y-2">
              <h3 class="text-xl font-heading font-semibold text-wood-dark">20+</h3>
              <p class="text-sm text-grey">{{ $t('brand.stats.years') }}</p>
            </div>
            <div class="space-y-2">
              <h3 class="text-xl font-heading font-semibold text-wood-dark">30,000</h3>
              <p class="text-sm text-grey">{{ $t('brand.stats.base_area') }}</p>
            </div>
            <div class="space-y-2">
              <h3 class="text-xl font-heading font-semibold text-wood-dark">3,000+</h3>
              <p class="text-sm text-grey">{{ $t('brand.stats.clients') }}</p>
            </div>
            <div class="space-y-2">
              <h3 class="text-xl font-heading font-semibold text-wood-dark">80%</h3>
              <p class="text-sm text-grey">{{ $t('brand.stats.repurchase') }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
