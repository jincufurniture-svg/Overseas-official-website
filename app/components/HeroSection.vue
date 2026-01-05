<template>
  <section
    id="home"
    class="relative h-screen w-full flex items-center justify-center overflow-hidden"
  >
    <!-- Background Image Placeholder -->

    <div class="absolute inset-0 z-1">
      <div
        class="w-full h-full flex items-center justify-center absolute top-0 left-0"
      >
        <img class="w-full relative bottom-40 md:w-2/3 md:bottom-0" src="@/assets/images/index.jpeg" alt="index" />
      </div>
      <div
        class="w-full h-full bg-[#ad977b] flex items-center justify-center text-[#2c2c2c] text-7xl font-bold bg-cover bg-center"
      >
        <!-- High-End Wood Texture -->
      </div>
    </div>

    <!-- Content -->
    <div class="relative z-10 container text-center">
      <h1
        class="text-4xl md:text-6xl font-heading font-bold text-white mb-6 tracking-wider opacity-0 animate-fade-in-up"
      >
        {{ $t("hero.title") }}
      </h1>
      <p
        class="text-lg md:text-xl font-light text-white/90 tracking-wide opacity-0 animate-fade-in-up animation-delay-300"
      >
        {{ $t("hero.subtitle") }}
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
