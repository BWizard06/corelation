<template>
  <section class="relative w-full px-6 sm:px-10 lg:px-14 py-16 sm:py-20 lg:py-24 bg-white">
    <div class="mb-10 sm:mb-14">
      <h2 
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ 
          opacity: 1, 
          y: 0,
          transition: { delay: 100, duration: 600, ease: 'easeOut' }
        }"
        class="text-3xl sm:text-4xl lg:text-5xl font-bold text-red mb-4"
      >
        {{ title }}
      </h2>
      <p 
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ 
          opacity: 1, 
          y: 0,
          transition: { delay: 200, duration: 600, ease: 'easeOut' }
        }"
        class="text-lg sm:text-xl text-dark-grey/80 max-w-4xl"
      >
        {{ description }}
      </p>
    </div>

    <div class="space-y-5">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div
          v-for="(industry, index) in industriesWithImages.slice(0, 4)"
          :key="industry.key"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visibleOnce="{ 
            opacity: 1, 
            y: 0,
            transition: { delay: 300 + (index * 80), duration: 600, ease: 'easeOut' }
          }"
        >
          <div class="group relative h-[400px] sm:h-[450px] lg:h-[500px] rounded-xl overflow-hidden cursor-pointer">
            <img 
              :src="industry.image" 
              :alt="industry.title"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              draggable="false"
            />
            
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 transition-opacity duration-500 group-hover:from-black/80 group-hover:via-black/50" />
            
            <div class="absolute bottom-6 left-6 right-6">
              <h3 class="text-2xl sm:text-3xl font-bold text-white transition-transform duration-500 group-hover:-translate-y-2">
                {{ industry.title }}
              </h3>
            </div>

            <div class="absolute inset-6 pointer-events-none flex items-start justify-start lg:items-center lg:justify-center">
              <div
                class="bg-white/25 backdrop-blur-xl border border-white/40 rounded-xl p-6 shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 will-change-[backdrop-filter,opacity]"
              >
                <p class="text-white sm:text-base leading-relaxed font-medium drop-shadow-lg">
                  {{ industry.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div
          v-for="(industry, index) in industriesWithImages.slice(4, 6)"
          :key="industry.key"
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :visibleOnce="{ 
            opacity: 1, 
            y: 0,
            transition: { delay: 600 + (index * 80), duration: 600, ease: 'easeOut' }
          }"
        >
          <div class="group relative h-[300px] sm:h-[350px] rounded-xl overflow-hidden cursor-pointer">
            <img 
              :src="industry.image" 
              :alt="industry.title"
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              draggable="false"
            />
            
            <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20 transition-opacity duration-500 group-hover:from-black/80 group-hover:via-black/60" />
            
            <div class="absolute bottom-6 left-6 right-6">
              <h3 class="text-2xl sm:text-3xl font-bold text-white transition-transform duration-500 group-hover:-translate-y-2">
                {{ industry.title }}
              </h3>
            </div>

            <div class="absolute inset-6 pointer-events-none flex items-start justify-start lg:items-center lg:justify-center">
              <div
                class="bg-white/20 backdrop-blur-lg border border-white/30 rounded-xl p-6 shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 will-change-[backdrop-filter,opacity]"
              >
                <p class="text-white sm:text-base leading-relaxed drop-shadow-lg">
                  {{ industry.description }}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import companyImg from '/images/services/industries/company2.jpg'
import financeImg from '/images/services/industries/finance2.jpg'
import habitatImg from '/images/services/industries/habitat2.jpg'
import energyImg from '/images/services/industries/energy2.jpg'
import digitizationImg from '/images/services/industries/digitization2.jpg'
import mobilityImg from '/images/services/industries/mobility2.jpg'

type Industry = {
  title: string
  key: string
  description: string
}

const props = defineProps<{
  title: string
  description: string
  items: Industry[]
}>()

const imageMap: Record<string, string> = {
  company: companyImg,
  finance: financeImg,
  habitat: habitatImg,
  energy: energyImg,
  digitization: digitizationImg,
  mobility: mobilityImg
}

const industriesWithImages = computed(() => 
  props.items.map(industry => ({
    ...industry,
    image: imageMap[industry.key] || companyImg
  }))
)
</script>