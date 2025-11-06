<template>
  <section class="relative w-full px-6 sm:px-10 lg:px-14 py-12 sm:py-16 lg:py-20 bg-white overflow-hidden">
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        :class="[
          'absolute -top-20 -right-20 w-96 h-96 bg-red rounded-full blur-3xl transition-all duration-[3000ms] ease-out',
          startAnimation ? 'scale-150 opacity-[0.03]' : 'scale-0 opacity-0'
        ]"
      />
      <div 
        :class="[
          'absolute -bottom-20 -left-20 w-96 h-96 bg-red rounded-full blur-3xl transition-all duration-[3000ms] ease-out delay-500',
          startAnimation ? 'scale-150 opacity-[0.02]' : 'scale-0 opacity-0'
        ]"
      />
    </div>

    <div class="max-w-6xl mx-auto relative">
      <div class="mb-4">
        <h2 class="text-xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight">
          <span
            v-for="(word, index) in titleWords"
            :key="`title-${index}`"
            :class="[
              'inline-block mr-2 sm:mr-3 text-red bg-clip-text transition-all duration-1000 ease-out',
              startAnimation ? 'opacity-100 translate-y-0 rotate-x-0' : 'opacity-0 translate-y-[50px] -rotate-x-90'
            ]"
            :style="{ transitionDelay: startAnimation ? `${index * 200 + 300}ms` : '0ms' }"
          >
            {{ word }}
          </span>
        </h2>
      </div>

      <div class="space-y-3 sm:space-y-4">
        <p
          v-for="(line, index) in textLines"
          :key="`line-${index}`"
          :class="[
            'text-lg sm:text-xl lg:text-2xl xl:text-3xl font-medium text-gray-800 leading-relaxed transition-all duration-[1200ms] ease-out',
            startAnimation ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-[50px]'
          ]"
          :style="{ transitionDelay: startAnimation ? `${titleWords.length * 200 + index * 250 + 600}ms` : '0ms' }"
        >
          {{ line }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps<{
  subsection: {
    title: string
    text: string
  }
  startAnimation?: boolean
}>()

const titleWords = computed(() => props.subsection.title.split(' '))
const textLines = computed(() => {
  const sentences = props.subsection.text.match(/[^.!?]+[.!?]+/g) || [props.subsection.text]
  return sentences.map(s => s.trim())
})
</script>

<style scoped>
.rotate-x-0 {
  transform: rotateX(0deg) translateY(0);
}

.-rotate-x-90 {
  transform: rotateX(-90deg) translateY(50px);
  transform-style: preserve-3d;
}
</style>