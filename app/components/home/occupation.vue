<template>
  <section class="relative w-full px-6 sm:px-10 lg:px-14 py-12 sm:py-16 lg:py-20 bg-white overflow-hidden">
    <div class="max-w-7xl mx-auto">
      
      <line-title
        :subtitle="occupation.subtitle"
        lineColorClass="bg-red"
      />

      <h2 
        v-motion
        :initial="{ opacity: 0, y: 30 }"
        :visibleOnce="{ 
          opacity: 1, 
          y: 0,
          transition: { delay: 200, duration: 800, ease: 'easeOut' }
        }"
        class="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 mb-10 sm:mb-12 lg:mb-16"
      >
        {{ occupation.title }}
      </h2>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div
          v-for="(paragraph, index) in occupation.paragraphs"
          :key="`paragraph-${index}`"
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :visibleOnce="{ 
            opacity: 1, 
            y: 0,
            transition: { delay: 400 + index * 200, duration: 800, ease: 'easeOut' }
          }"
        >
          <div class="group relative rounded-2xl overflow-hidden shadow-lg border border-red/10 hover:border-red/20 bg-white h-full hover:shadow-xl transition-all duration-500">
            
            <div class="absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity duration-700 pointer-events-none">
              <div class="absolute -top-20 -right-20 w-64 h-64 bg-red/12 rounded-full blur-3xl" />
              <div class="absolute -bottom-20 -left-20 w-64 h-64 bg-red/12 rounded-full blur-3xl" />
            </div>

            <div class="relative p-6 sm:p-8 lg:p-10">
              <p class="text-base sm:text-lg lg:text-xl text-dark-grey/80 leading-relaxed">
                {{ paragraph }}
              </p>
            </div>

            <div class="absolute inset-0 bg-gradient-to-br from-white/50 via-transparent to-red/5 pointer-events-none" />
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  occupation: {
    title: string
    subtitle: string
    paragraphs: string[]
  }
}>()
</script>