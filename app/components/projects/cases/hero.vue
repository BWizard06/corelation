<template>
  <section class="relative overflow-hidden bg-white">
    <div 
      v-if="heroImageUrl"
      class="absolute inset-0 z-0"
    >
      <img
        :src="heroImageUrl"
        :alt="title"
        class="w-full h-full object-cover opacity-30"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-white/30 via-white/20 to-white/10"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-white/20 via-transparent to-white/80"></div>
    </div>

    <div class="absolute top-0 right-0 w-96 h-96 bg-red/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 z-0"></div>
    <div class="absolute bottom-0 left-0 w-64 h-64 bg-red/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2 z-0"></div>

    <div class="relative z-10 px-6 sm:px-10 lg:px-14 py-16 sm:py-24 lg:py-32">
      <div class="max-w-7xl mx-auto">
        <div class="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          <div class="lg:col-span-7">
            <line-title :subtitle="company" lineColorClass="bg-red" />
            
            <h1 class="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-dark-grey leading-tight mb-6">
              {{ title }}
            </h1>
          </div>

          <div class="lg:col-span-5 flex items-center justify-center lg:justify-end lg:mt-8">
            <div class="relative">
              <div class="relative bg-white rounded-3xl shadow-2xl p-8 sm:p-10 lg:p-12 border border-gray-100">
                <img
                  :src="logoUrl"
                  :alt="`${company}`"
                  class="w-full h-auto max-w-[200px] sm:max-w-[240px] object-contain"
                />
                
                <div class="absolute -top-3 -right-3 w-20 h-20 bg-red rounded-2xl -z-10 opacity-10"></div>
                <div class="absolute -bottom-3 -left-3 w-24 h-24 bg-red/5 rounded-2xl -z-10"></div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- Bottom wave divider -->
    <div class="absolute bottom-0 left-0 right-0 z-0">
      <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-full h-auto">
        <path d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="#F9FAFB" fill-opacity="0.5"/>
      </svg>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  company: string
  title: string
  logoFilename: string
  caseId: string
}>()

const logoFiles = import.meta.glob('/images/projects/overview/refs/*', {
  eager: true,
  query: '?url',
  import: 'default'
}) as Record<string, string>

const logoUrl = computed(() => {
  for (const [path, url] of Object.entries(logoFiles)) {
    if (path.includes(props.logoFilename)) {
      return url
    }
  }
  return ''
})

const overviewImages = import.meta.glob('/images/projects/overview/*', {
  eager: true,
  query: '?url',
  import: 'default'
}) as Record<string, string>

const heroImageUrl = computed(() => {
  const caseKey = props.caseId.replace('case-', 'case_')
  
  const possibleExtensions = ['jpg', 'jpeg', 'png', 'webp']
  
  for (const ext of possibleExtensions) {
    const filename = `${caseKey}.${ext}`
    
    for (const [path, url] of Object.entries(overviewImages)) {
      if (path.includes(`/${filename}`)) {
        return url
      }
    }
  }
  
  return null
})
</script>