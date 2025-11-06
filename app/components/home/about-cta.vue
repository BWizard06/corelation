<template>
  <section class="relative w-full px-6 sm:px-10 lg:px-14 py-8 sm:py-10 lg:py-14 bg-white">
    <div class="max-w-5xl mx-auto">
      <NuxtLink
        to="/about#katja"
        v-motion
        :initial="{ opacity: 0, y: 30, scale: 0.95 }"
        :visibleOnce="{ 
          opacity: 1, 
          y: 0,
          scale: 1,
          transition: { duration: 800, ease: 'easeOut' }
        }"
        class="group relative flex items-center justify-between gap-4 sm:gap-6 p-5 sm:p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-light-grey/30 to-light-grey/10 border-2 border-light-grey/40 hover:border-red/30 transition-all duration-500 hover:shadow-xl shadow-md overflow-hidden"
      >
        <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div class="absolute -top-20 -right-20 w-60 h-60 bg-red/5 rounded-full blur-3xl" />
          <div class="absolute -bottom-20 -left-20 w-60 h-60 bg-red/5 rounded-full blur-3xl" />
        </div>
        <div class="relative flex-1 min-w-0">
          <div class="mb-1 sm:mb-1.5">
            <span 
              class="text-xs sm:text-sm font-bold uppercase tracking-wider text-red transition-colors duration-500 whitespace-nowrap"
            >
              {{ cta.label }}
            </span>
          </div>
          <p 
            class="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-bold mb-1 sm:mb-1.5 lg:mb-2 text-black transition-all duration-500 group-hover:translate-x-1 leading-tight"
          >
            {{ cta.title }}
          </p>
          <p 
            class="text-sm sm:text-base lg:text-lg font-bold text-dark-grey transition-all duration-500 group-hover:translate-x-1 leading-tight"
          >
            {{ cta.description }}
          </p>
        </div>

        <div class="relative flex-shrink-0">
          <div 
            class="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-full flex items-center justify-center bg-light-grey/50 border-2 border-light-grey/60 group-hover:border-red transition-all duration-500 group-hover:bg-red/5"
          >
            <phosphor-icon
              name="arrow-right"
              class="w-4 h-4 sm:w-5 sm:h-5 lg:w-7 lg:h-7 text-dark-grey transition-all duration-500 group-hover:text-red group-hover:translate-x-2 group-hover:scale-110"
            />
          </div>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  cta: {
    label: string
    title: string
    description: string
  }
}>()
</script>