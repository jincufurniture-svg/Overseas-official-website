<template>
  <footer class="bg-black text-white/60 py-12 border-t border-white/10">
    <div class="container flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
      <div class="text-sm font-light">
        &copy; {{ new Date().getFullYear() }} {{ $t('footer.rights') }}
      </div>
      <div class="flex space-x-6 text-sm">
        <a href="#" class="hover:text-wood transition-colors">{{ $t('footer.privacy') }}</a>
        <a href="#" class="hover:text-wood transition-colors">{{ $t('footer.terms') }}</a>
        <NuxtLink to="/#contact" class="hover:text-wood transition-colors">{{ $t('footer.contact') }}</NuxtLink>
      </div>
    </div>
  </footer>
</template>

<script setup>
</script>
