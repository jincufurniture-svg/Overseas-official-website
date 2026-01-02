<template>
  <header
    class="fixed top-0 left-0 w-full z-50 transition-all duration-300"
    :class="[
      isScrolled
        ? 'bg-beige/95 backdrop-blur-sm shadow-sm py-4'
        : 'bg-transparent py-6',
    ]"
  >
    <div class="container flex justify-between items-center">
      <!-- Logo -->
      <div class="flex items-center">
        <img
          src="@/assets/images/logo.png"
          alt="JINCU Logo"
          class="h-12 w-auto mr-4"
        />
        <NuxtLink
          to="/"
          class="text-2xl font-heading font-bold tracking-widest text-black"
        >
          JINCU
        </NuxtLink>
      </div>

      <!-- Desktop Nav -->
      <nav class="hidden md:flex space-x-8 items-center">
        <NuxtLink
          v-for="item in navItems"
          :key="item.key"
          :to="item.href"
          class="text-sm font-medium tracking-wide text-grey-dark hover:text-wood transition-colors duration-300"
        >
          {{ $t(`nav.${item.key}`) }}
        </NuxtLink>

        <!-- Language Switcher -->
        <div class="relative group ml-4">
          <button
            class="flex items-center text-sm font-medium text-grey-dark hover:text-wood transition-colors"
          >
            <span class="uppercase">{{ appStore.locale }}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          
          <!-- Dropdown -->
          <div class="absolute right-0 mt-2 w-24 bg-white shadow-lg rounded-md overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top-right z-50">
            <button
              v-for="lang in ['en', 'zh']"
              :key="lang"
              @click="switchLanguage(lang)"
              class="block w-full text-left px-4 py-2 text-sm text-grey-dark hover:bg-beige hover:text-wood transition-colors"
              :class="{ 'font-bold text-wood': appStore.locale === lang }"
            >
              {{ lang === 'en' ? 'English' : '中文' }}
            </button>
          </div>
        </div>
      </nav>

      <!-- Mobile Menu Button -->
      <button
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="md:hidden text-black focus:outline-none"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            v-if="!isMobileMenuOpen"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
          <path
            v-else
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="isMobileMenuOpen"
      class="md:hidden absolute top-full left-0 w-full bg-white shadow-lg py-4 px-6 flex flex-col space-y-4"
    >
      <NuxtLink
        v-for="item in navItems"
        :key="item.key"
        :to="item.href"
        class="text-base font-medium text-grey-dark hover:text-wood"
        @click="isMobileMenuOpen = false"
      >
        {{ $t(`nav.${item.key}`) }}
      </NuxtLink>
      
      <div class="border-t border-gray-100 pt-4 flex space-x-4">
        <button 
           @click="switchLanguage('en')"
           class="text-sm font-medium"
           :class="appStore.locale === 'en' ? 'text-wood' : 'text-grey-dark'"
        >
          English
        </button>
        <button 
           @click="switchLanguage('zh')"
           class="text-sm font-medium"
           :class="appStore.locale === 'zh' ? 'text-wood' : 'text-grey-dark'"
        >
          中文
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const appStore = useAppStore()

const navItems = [
  { key: 'home', href: '/' },
  { key: 'products', href: '/products' },
  { key: 'brand', href: '/#brand' },
  { key: 'contact', href: '/#contact' },
]

const isScrolled = ref(false)
const isMobileMenuOpen = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50
}

const switchLanguage = (lang) => {
  appStore.setLocale(lang)
  isMobileMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
