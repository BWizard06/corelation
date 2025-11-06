<template>
  <section class="relative w-full overflow-hidden sm:px-10 lg:px-14 py-16 sm:py-20 lg:py-24">
    <div class="absolute inset-0">
      <img
        :src="backgroundImage"
        alt=""
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-black/75" />
    </div>

    <div class="absolute inset-0 opacity-5" style="background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 50px 50px;" />

    <div class="relative mx-auto max-w-[1400px] px-6 sm:px-10 lg:px-16">
      <div
        class="relative mx-auto"
        style="perspective: 2000px; max-width: 1200px; min-height: 550px;"
        role="group"
        aria-label="Service-Karten"
      >
        <div class="invisible pointer-events-none">
          <div class="mx-auto w-full max-w-xl px-4">
            <services-service-card
              :title="items[0]?.title || ''"
              :theme="items[0]?.key || 'corporate'"
              :description="items[0]?.description"
              :items="items[0]?.items"
              :link="items[0]?.link"
            />
          </div>
        </div>

        <div class="absolute inset-0 flex items-center justify-center">
          <button
            v-for="(card, i) in items"
            :key="i"
            type="button"
            class="absolute left-1/2 top-0 w-full max-w-xl outline-none focus-visible:ring-4 focus-visible:ring-white/50 rounded-3xl px-4"
            :aria-current="positionOf(i) === 'center' ? 'true' : 'false'"
            :tabindex="positionOf(i) === 'center' ? -1 : 0"
            :style="cardStyle(i)"
            :class="[
              'transition-all duration-[800ms] ease-out',
              cursorClass(i)
            ]"
            @click="onCardClick(i)"
            @mouseenter="hoveredCard = positionOf(i) !== 'center' ? i : null"
            @mouseleave="hoveredCard = null"
          >
            <div 
              class="relative rounded-3xl transition-all duration-500"
              :class="positionOf(i) === 'center' ? '' : 'hover:scale-105'"
            >
              <div 
                v-if="positionOf(i) === 'center'"
                class="absolute -inset-1 bg-gradient-to-r from-white via-yellow-200 to-white opacity-20 blur-2xl rounded-3xl"
              />
              
              <services-service-card
                :title="card.title"
                :theme="card.key"
                :description="card.description"
                :items="card.items"
                :link="card.link"
                class="h-full relative z-10"
              />
            </div>
          </button>
        </div>
      </div>

      <div class="absolute top-[275px] left-4 right-4 flex justify-between pointer-events-none lg:hidden">
        <button
          type="button"
          class="pointer-events-auto h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 active:scale-95"
          @click="prevCard"
          aria-label="Vorherige Karte"
        >
          <phosphor-icon
            name="caret-left"
            class="w-6 h-6"
          />
        </button>
        
        <button
          type="button"
          class="pointer-events-auto h-12 w-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 hover:scale-110 active:scale-95"
          @click="nextCard"
          aria-label="Nächste Karte"
        >
          <phosphor-icon
            name="caret-right"
            class="w-6 h-6"
          />
        </button>
      </div>

      <div 
        v-motion
        :initial="progressBarAnimation.initial"
        :visibleOnce="progressBarAnimation.visibleOnce"
        class="mt-16 mx-auto max-w-md"
      >
        <div class="relative h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
          <div 
            class="absolute top-0 left-0 h-full bg-gradient-to-r from-white via-yellow-200 to-white rounded-full transition-all duration-500 shadow-lg shadow-white/50"
            :style="{ width: `${((active + 1) / items.length) * 100}%` }"
          />
        </div>
        
        <div class="mt-6 flex justify-between items-center px-2">
          <button
            v-for="(item, i) in items"
            :key="`label-${i}`"
            v-motion
            :initial="{ opacity: 0, y: 10 }"
            :visibleOnce="getLabelAnimation(i)"
            type="button"
            class="group flex flex-col items-center gap-2 transition-all duration-300"
            :class="i === active ? 'opacity-100' : 'opacity-50 hover:opacity-80'"
            @click="setActive(i)"
          >
            <div 
              class="h-3 w-3 rounded-full border-2 border-white transition-all duration-300"
              :class="i === active ? 'bg-white scale-125 shadow-lg shadow-white/50' : 'bg-transparent group-hover:bg-white/50'"
            />
            <span 
              class="text-sm font-medium text-white transition-all duration-300"
              :class="i === active ? 'opacity-100 scale-105' : 'opacity-70'"
            >
              {{ item.title }}
            </span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import backgroundImage from '@/assets/images/bubbles/campaigning.jpg'

type RawService = {
  title: string
  key: string
  description?: string
  link?: string
  items?: string[]
}

const props = defineProps<{
  items: RawService[]
}>()

const active = ref(0)
const hoveredCard = ref<number | null>(null)

// Animation Definitionen als refs
const progressBarAnimation = ref({
  initial: {
    opacity: 0,
    y: 20
  },
  visibleOnce: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 400,
      duration: 600,
      ease: 'easeOut'
    }
  }
})

// Funktion für gestaffelte Label-Animationen
const getLabelAnimation = (index: number) => {
  return {
    opacity: 1,
    y: 0,
    transition: {
      delay: 500 + (index * 100),
      duration: 500,
      ease: 'easeOut'
    }
  }
}

function setActive(i: number) {
  active.value = ((i % props.items.length) + props.items.length) % props.items.length
}

function nextCard() {
  setActive(active.value + 1)
}

function prevCard() {
  setActive(active.value - 1)
}

function positionOf(i: number): 'left' | 'center' | 'right' {
  if (!props.items.length) return 'center'
  if (i === active.value) return 'center'
  
  const left = (active.value - 1 + props.items.length) % props.items.length
  const right = (active.value + 1) % props.items.length
  
  return i === left ? 'left' : 'right'
}

function onCardClick(i: number) {
  const pos = positionOf(i)
  if (pos === 'left' || pos === 'right') {
    setActive(i)
  }
}

function cardStyle(i: number): Record<string, string> {
  const pos = positionOf(i)
  const isHovered = hoveredCard.value === i
  
  if (pos === 'center') {
    return {
      transform: 'translateX(-50%) translateZ(0px) scale(1) rotateY(0deg)',
      left: '50%',
      opacity: '1',
      filter: 'blur(0px)',
      zIndex: '30',
      pointerEvents: 'auto'
    }
  }
  
  if (pos === 'left') {
    const hoverScale = isHovered ? 0.92 : 0.88
    const hoverOpacity = isHovered ? 0.7 : 0.5
    return {
      transform: `translateX(-50%) translateX(-420px) translateZ(-200px) scale(${hoverScale}) rotateY(12deg) rotateZ(-1deg)`,
      left: '50%',
      opacity: String(hoverOpacity),
      filter: 'blur(0.5px)',
      zIndex: '20',
      pointerEvents: 'auto'
    }
  }
  
  // right
  const hoverScale = isHovered ? 0.92 : 0.88
  const hoverOpacity = isHovered ? 0.7 : 0.5
  return {
    transform: `translateX(-50%) translateX(420px) translateZ(-200px) scale(${hoverScale}) rotateY(-12deg) rotateZ(1deg)`,
    left: '50%',
    opacity: String(hoverOpacity),
    filter: 'blur(0.5px)',
    zIndex: '20',
    pointerEvents: 'auto'
  }
}

function cursorClass(i: number) {
  const pos = positionOf(i)
  return pos === 'center' ? 'cursor-default' : 'cursor-pointer'
}
</script>