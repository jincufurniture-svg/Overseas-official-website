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
          :to="localePath('/')"
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
          :to="localePath(item.href)"
          class="text-sm font-medium tracking-wide text-grey-dark hover:text-wood transition-colors duration-300"
        >
          {{ $t(`nav.${item.key}`) }}
        </NuxtLink>

        <!-- Language Switcher -->
        <div class="relative group ml-4">
          <button
            class="flex items-center text-sm font-medium text-grey-dark hover:text-wood transition-colors"
          >
            <span class="uppercase">{{ locale }}</span>
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
          <div
            class="absolute right-0 top-full mt-2 w-24 bg-white shadow-lg rounded-sm overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300"
          >
            <button
              v-for="l in availableLocales"
              :key="l.code"
              @click="setLocale(l.code)"
              class="block w-full text-left px-4 py-2 text-sm text-grey-dark hover:bg-beige hover:text-wood transition-colors"
              :class="{ 'font-bold text-wood': locale === l.code }"
            >
              {{ l.name }}
            </button>
          </div>
        </div>
      </nav>

      <!-- Mobile Menu Button -->
      <button
        class="md:hidden text-black focus:outline-none"
        @click="isMobileMenuOpen = !isMobileMenuOpen"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
    </div>

    <!-- Mobile Nav -->
    <div
      v-if="isMobileMenuOpen"
      class="md:hidden absolute top-full left-0 w-full bg-beige border-t border-grey-light/20 shadow-lg"
    >
      <div class="flex flex-col py-4 px-6 space-y-4">
        <NuxtLink
          v-for="item in navItems"
          :key="item.key"
          :to="localePath(item.href)"
          class="text-base font-medium text-grey-dark hover:text-wood transition-colors"
          @click="isMobileMenuOpen = false"
        >
          {{ $t(`nav.${item.key}`) }}
        </NuxtLink>
        <div class="border-t border-grey-light/20 pt-4 flex space-x-4">
          <button
            v-for="l in availableLocales"
            :key="l.code"
            @click="
              setLocale(l.code);
              isMobileMenuOpen = false;
            "
            class="text-sm font-medium transition-colors"
            :class="
              locale === l.code ? 'text-wood font-bold' : 'text-grey-dark'
            "
          >
            {{ l.name }}
          </button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from "vue";
import { useI18n } from "vue-i18n";

const { locale, setLocale, locales } = useI18n();
const localePath = useLocalePath();

const availableLocales = computed(() => {
  return locales.value.filter((i) => i.code);
});

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);

const navItems = [
  { key: "home", href: "/" },
  { key: "brand", href: "/#brand" },
  { key: "products", href: "/products" },
  { key: "craftsmanship", href: "/#craftsmanship" },
  { key: "contact", href: "/#contact" },
];

const handleScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>
