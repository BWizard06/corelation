<template>
  <article class="group relative overflow-hidden rounded-2xl border border-black/5 bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
    <div 
      v-motion
      :initial="{ scaleX: 0 }"
      :visibleOnce="{ 
        scaleX: 1,
        transition: {
          delay: 300,
          duration: 600,
          ease: 'easeOut'
        }
      }"
      :class="['absolute inset-x-0 top-0 h-1 bg-gradient-to-r origin-left', palette.bg]" 
      aria-hidden="true" 
    />

    <div 
      :class="['absolute inset-x-0 top-0 h-24 opacity-5 blur-2xl', palette.bg]" 
      aria-hidden="true" 
    />

    <div class="relative p-6 sm:p-8 lg:p-10">
      <h3 
        v-motion
        :initial="headingAnimation.initial"
        :visibleOnce="headingAnimation.visibleOnce"
        class="text-center font-semibold tracking-tight text-2xl sm:text-3xl lg:text-4xl text-black leading-tight"
      >
        {{ title }}
      </h3>

      <p 
        v-if="description"
        v-motion
        :initial="descriptionAnimation.initial"
        :visibleOnce="descriptionAnimation.visibleOnce"
        class="mt-4 text-center text-base sm:text-lg lg:text-xl leading-relaxed text-black/75"
      >
        {{ description }}
      </p>

      <ul 
        v-if="items?.length" 
        class="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-3"
      >
        <li 
          v-for="(item, idx) in items" 
          :key="idx"
          v-motion
          :initial="itemAnimation.initial"
          :visibleOnce="getItemAnimation(idx)"
          class="flex items-start gap-3 group/item"
        >
          <span
            :class="[
              'mt-1 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full ring-1 ring-current/15',
              'transition-all duration-300 group-hover/item:scale-110 group-hover/item:ring-2',
              palette.text
            ]"
            aria-hidden="true"
          >
            <svg 
              class="h-3.5 w-3.5 transition-transform duration-300 group-hover/item:scale-110" 
              viewBox="0 0 16 16" 
              fill="currentColor"
            >
              <path d="M6.173 12.065a1 1 0 0 1-1.414 0L1.646 8.952a1 1 0 1 1 1.414-1.414l2.12 2.12 6.76-6.759a1 1 0 0 1 1.414 1.414L6.173 12.065Z"/>
            </svg>
          </span>
          <span class="text-black/85 text-left leading-relaxed ">{{ item }}</span>
        </li>
      </ul>

      <NuxtLink
        v-if="link"
        v-motion
        :initial="linkAnimation.initial"
        :visibleOnce="linkAnimation.visibleOnce"
        :to="link"
        class="mt-10 inline-flex items-center gap-2 font-medium hover:gap-3 transition-all duration-300 underline-offset-4 focus:outline-none focus:ring-2 focus:ring-offset-2 group/link"
        :class="[palette.text, palette.ring]"
        :aria-label="`${title} – mehr erfahren`"
      >
        <span class="relative">
          {{ $t('common.more') }}
          <span 
            :class="['absolute bottom-0 left-0 h-px w-0 group-hover/link:w-full transition-all duration-300', palette.bg]"
          />
        </span>
        <span 
          class="transition-transform duration-300 group-hover/link:translate-x-1" 
          aria-hidden="true"
        >
          →
        </span>
      </NuxtLink>
    </div>

    <div 
      class="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset" 
      :class="palette.ringSoft" 
      aria-hidden="true" 
    />
  </article>
</template>

<script setup lang="ts">
type ThemeKey = 'corporate' | 'marketing' | 'change'

const props = withDefaults(defineProps<{
  title: string
  description?: string
  items?: string[]
  link?: string
  theme: ThemeKey
}>(), {
})

const PALETTE: Record<ThemeKey, { 
  bg: string
  text: string
  ring: string
  ringSoft: string
  gradient: string
}> = {
  corporate: { 
    bg: 'bg-red',
    text: 'text-red',
    ring: 'ring-red',
    ringSoft: 'ring-red/10',
    gradient: 'from-red via-red-600 to-red'
  },
  marketing: { 
    bg: 'bg-light-green',
    text: 'text-light-green',
    ring: 'ring-light-green',
    ringSoft: 'ring-light-green/10',
    gradient: 'from-light-green via-green-700 to-light-green'
  },
  change: { 
    bg: 'bg-light-brown',
    text: 'text-light-brown',
    ring: 'ring-light-brown',
    ringSoft: 'ring-light-brown/10',
    gradient: 'from-light-brown via-amber-700 to-light-brown'
  }
}

const palette = computed(() => PALETTE[props.theme!] ?? PALETTE.corporate)

const headingAnimation = ref({
  initial: {
    opacity: 0,
    y: 20
  },
  visibleOnce: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 100,
      duration: 600,
      ease: 'easeOut'
    }
  }
})

const descriptionAnimation = ref({
  initial: {
    opacity: 0,
    y: 20
  },
  visibleOnce: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 250,
      duration: 600,
      ease: 'easeOut'
    }
  }
})

const itemAnimation = ref({
  initial: {
    opacity: 0,
    x: -10
  }
})

const getItemAnimation = (index: number) => {
  return {
    opacity: 1,
    x: 0,
    transition: {
      delay: 400 + (index * 60),
      duration: 500,
      ease: 'easeOut'
    }
  }
}

const linkAnimation = ref({
  initial: {
    opacity: 0,
    y: 10
  },
  visibleOnce: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 800,
      duration: 600,
      ease: 'easeOut'
    }
  }
})
</script>