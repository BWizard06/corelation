<template>
  <section class="relative overflow-hidden" :class="transparentBg ? '' : 'bg-red'">
    <!-- Logo mit Roll-In Animation - nur Desktop -->
    <div
      v-if="image"
      v-motion="logoMotion"
      class="pointer-events-none select-none absolute z-10 right-[-15%] 2xl:top-[-18%] h-[95%] xl:h-[120%] 2xl:h-[170%] hidden xl:block"
    >
      <img 
        :src="image" 
        alt=""
        class="h-full w-auto" 
        :class="transparentBg ? 'opacity-10' : ''"
      />
    </div>

    <!-- Content Container -->
    <div class="w-full px-6 sm:px-10 lg:px-14 py-16 sm:py-20 lg:py-24">
      <!-- Subtitle mit Linie -->
      <line-title
        v-if="subtitle"
        :subtitle="subtitle"
        :lineColorClass="lineColorClass"
        textColorClass="text-white"
        :delay="100"
      />

      <!-- Title -->
      <p 
        v-if="title"
        class="whitespace-pre-line font-semibold tracking-tight text-white text-3xl sm:text-5xl lg:text-7xl"
      >
        {{ title }}
      </p>

      <!-- Description -->
      <p 
        v-if="description"
        class="whitespace-pre-line mt-6 sm:mt-8 max-w-2xl leading-7 sm:leading-8 text-white text-lg sm:text-xl lg:text-2xl"
      >
        {{ description }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">

defineProps<{
  title: string
  subtitle?: string
  description?: string
  lineColorClass?: string
  image?: string
  transparentBg?: boolean
}>()

const logoMotion = ref({
  initial: { 
    x: 500, 
    rotate: -360, 
    opacity: 0 
  },
  enter: { 
    x: 0, 
    rotate: 0, 
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 50,
      damping: 15,
      mass: 1,
      delay: 200
    }
  }
})
</script>