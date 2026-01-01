<template>
  <section id="home" class="relative h-screen w-full flex items-center justify-center overflow-hidden">
    <!-- Background Image Placeholder -->
    <div class="absolute inset-0 z-0">
      <div class="w-full h-full bg-grey-light flex items-center justify-center text-grey-dark text-opacity-50 text-xl font-bold bg-cover bg-center"
           style="background-image: url('https://placehold.co/1920x1080/D4B996/333333?text=High-End+Wood+Texture');">
      </div>
      <!-- Overlay -->
      <div class="absolute inset-0 bg-black/20"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 container text-center">
      <h1 class="text-4xl md:text-6xl font-heading font-bold text-white mb-6 tracking-wider opacity-0 animate-fade-in-up">
        {{ $t('hero.title') }}
      </h1>
      <p class="text-lg md:text-xl font-light text-white/90 tracking-wide opacity-0 animate-fade-in-up animation-delay-300">
        {{ $t('hero.subtitle') }}
      </p>
    </div>
  </section>
</template>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 1s ease-out forwards;
}

.animation-delay-300 {
  animation-delay: 300ms;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
