<template>
  <section
    id="home"
    class="relative h-80vh w-full overflow-hidden lg:px-60 lg:pb-8 lg:pt-12 px-0 pb-0 pt-4"
  >
    <swiper
      :modules="modules"
      :slides-per-view="1"  
      :loop="true"
      :autoplay="{
        delay: 3000,
        disableOnInteraction: false,
      }"
      :navigation="true"
      :pagination="{ clickable: true }"
      class="h-full w-full"
    >
      <swiper-slide v-for="(item, index) in carouselItems" :key="index">
        <div class="w-full h-full relative">
          <img
            :src="item.image"
            :alt="item.alt"
            class="w-full h-full object-cover"
          />
        </div>
      </swiper-slide>
    </swiper>
  </section>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import image1 from "@/assets/images/banner/1.jpg";
import image2 from "@/assets/images/banner/2.jpg";
import image3 from "@/assets/images/banner/3.jpg";

const modules = [Autoplay, Navigation, Pagination];

const carouselItems = [
  { image: image1, alt: "Home Banner 1" },
  { image: image2, alt: "Home Banner 2" },
  { image: image3, alt: "Home Banner 3" },
];
</script>

<style scoped>
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: white;
}
:deep(.swiper-pagination-bullet-active) {
  background: white;
}
</style>
