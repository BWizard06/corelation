<template>
  <section class="px-6 sm:px-10 lg:px-14 pt-14 lg:pt-20 pb-14 lg:pb-36 ">
     <line-title
      :subtitle="$t('common.competence')"
      class="mb-6"
      :lineColorClass="lineColorClass"
      :delay="GLOBAL_DELAY"
    />
    <div class="max-w-6xl mx-auto">
      <div class="hidden lg:block">
        <div class="flex flex-col gap-6 mb-20">
          <div class="flex justify-center gap-3">
            <button
              v-for="(competence, index) in firstRowCompetences"
              :key="index"
              v-motion
              :initial="pillAnimation.initial"
              :visibleOnce="getPillAnimation(index)"
              @click="handleCompetenceClick(index)"
              class="px-6 py-2.5 rounded-full font-medium transition-all duration-200 text-lg border"
              :class="selectedIndex === index 
                ? 'bg-red text-white border-transparent' 
                : 'bg-white border-light-grey hover:border-dark-grey hover:scale-105'"
            >
              {{ competence.title }}
            </button>
          </div>
          
          <div v-if="secondRowCompetences.length > 0" class="flex justify-center gap-3">
            <button
              v-for="(competence, index) in secondRowCompetences"
              :key="index + firstRowCompetences.length"
              v-motion
              :initial="pillAnimation.initial"
              :visibleOnce="getPillAnimationSecondRow(index)"
              @click="handleCompetenceClick(index + firstRowCompetences.length)"
              class="px-6 py-2.5 rounded-full font-medium transition-all duration-200 text-lg"
              :class="selectedIndex === (index + firstRowCompetences.length)
                ? 'bg-red text-white' 
                : 'bg-white border border-light-grey hover:border-dark-grey hover:scale-105'"
            >
              {{ competence.title }}
            </button>
          </div>
        </div>

        <div 
          v-motion
          :initial="cardAnimation.initial"
          :visibleOnce="cardAnimation.visibleOnce"
          class="relative rounded-2xl overflow-hidden h-[400px] flex flex-col justify-end px-8 pb-8"
        >
          <img 
            :src="bubblesImage" 
            alt=""
            class="absolute inset-0 w-full h-full object-cover opacity-90 transition-transform duration-700"
            :style="{ transform: `scale(1.1) translateY(${parallaxOffset}px)` }"
          />
          
          <Transition
            mode="out-in"
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 translate-y-4"
            enter-to-class="opacity-100 translate-y-0"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 translate-y-0"
            leave-to-class="opacity-0 -translate-y-2"
          >
            <div :key="selectedIndex" class="relative z-10 bg-white/90 backdrop-blur-lg rounded-2xl p-8">
              <p class="text-red text-2xl font-semibold mb-4">
                {{ selectedCompetence?.title }}
              </p>
              <p class="leading-relaxed text-xl">
                {{ selectedCompetence?.description }}
              </p>
            </div>
          </Transition>
        </div>
      </div>

      <div class="lg:hidden space-y-3">
        <div
          v-for="(competence, index) in props.competences"
          :key="index"
          v-motion
          :initial="accordionAnimation.initial"
          :visibleOnce="getAccordionAnimation(index)"
          class="bg-white rounded-xl border transition-all duration-300 overflow-hidden"
          :class="isAccordionOpen(index) ? 'border-red shadow-md' : 'border-light-grey'"
        >
          <button
            @click="toggleAccordion(index)"
            class="w-full flex items-center justify-between p-4 text-left"
          >
            <span 
              class="text-lg transition-colors duration-200"
              :class="isAccordionOpen(index) ? 'text-red' : 'text-dark-grey'"
            >
              {{ competence.title }}
            </span>
            <phosphor-icon
              name="caret-down"
              class="w-5 h-5 transition-all duration-300"
              :class="[
                isAccordionOpen(index) ? 'text-red rotate-180' : 'text-dark-grey rotate-0'
              ]"
            />
          </button>

          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="max-h-0 opacity-0"
            enter-to-class="max-h-96 opacity-100"
            leave-active-class="transition-all duration-300 ease-in"
            leave-from-class="max-h-96 opacity-100"
            leave-to-class="max-h-0 opacity-0"
          >
            <div v-if="isAccordionOpen(index)" class="overflow-hidden">
              <div class="px-5 pb-5 pt-2">
                <p class="leading-relaxed text-base text-dark-grey">
                  {{ competence.description }}
                </p>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Competence {
  title: string
  description: string
}

const props = defineProps<{
  competences: Competence[]
  bubblesImage?: string
  lineColorClass?: string
}>()

const selectedIndex = ref(0)
const parallaxOffset = ref(0)

const openAccordions = ref<Set<number>>(new Set([])) 

const GLOBAL_DELAY = 1000

const selectedCompetence = computed(() => 
  props.competences?.[selectedIndex.value]
)

const handleCompetenceClick = (index: number) => {
  parallaxOffset.value = -10
  setTimeout(() => {
    parallaxOffset.value = 0
  }, 100)
  
  selectedIndex.value = index
}

const toggleAccordion = (index: number) => {
  if (openAccordions.value.has(index)) {
    openAccordions.value.delete(index)
  } else {
    openAccordions.value.add(index)
  }
  openAccordions.value = new Set(openAccordions.value)
}

const isAccordionOpen = (index: number) => {
  return openAccordions.value.has(index)
}

const firstRowCompetences = computed(() => {
  const total = props.competences?.length || 0
  
  if (total <= 4) {
    return props.competences || []
  } else if (total === 5) {
    return props.competences?.slice(0, 3) || []
  } else if (total === 6) {
    return props.competences?.slice(0, 3) || [] 
  } else if (total === 7) {
    return props.competences?.slice(0, 4) || [] 
  } else if (total === 8) {
    return props.competences?.slice(0, 5) || [] 
  } else if (total === 9) {
    return props.competences?.slice(0, 5) || [] 
  } else {
    const firstRowCount = Math.ceil(total / 2)
    return props.competences?.slice(0, firstRowCount) || []
  }
})

const secondRowCompetences = computed(() => {
  const total = props.competences?.length || 0
  const firstRowCount = firstRowCompetences.value.length
  
  if (total <= 4) {
    return []
  }
  
  return props.competences?.slice(firstRowCount) || []
})

const pillAnimation = ref({
  initial: { 
    opacity: 0, 
    y: 20, 
    scale: 0.95 
  }
})

const getPillAnimation = (index: number) => {
  return {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: GLOBAL_DELAY + (index * 50),
      duration: 400,
      ease: 'easeOut'
    }
  }
}

const getPillAnimationSecondRow = (index: number) => {
  return {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: GLOBAL_DELAY + ((firstRowCompetences.value.length + index) * 50),
      duration: 400,
      ease: 'easeOut'
    }
  }
}

const cardAnimation = ref({
  initial: { 
    opacity: 0,
    y: 30,
    scale: 0.98
  },
  visibleOnce: { 
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 300,
      duration: 700,
      ease: 'easeOut'
    }
  }
})

const accordionAnimation = ref({
  initial: { 
    opacity: 0, 
    y: 20
  }
})

const getAccordionAnimation = (index: number) => {
  return {
    opacity: 1,
    y: 0,
    transition: {
      delay: GLOBAL_DELAY + (index * 80),
      duration: 400,
      ease: 'easeOut'
    }
  }
}
</script>