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
        <h2 
          class="text-xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight text-red"
        >
          {{ subsection.title }}
        </h2>

      </div>

      <div class="space-y-3 sm:space-y-4">
        <p
          v-for="(line, index) in textLines"
          :key="`line-${index}`"
          class="text-lg sm:text-xl lg:text-2xl xl:text-3xl font-medium text-gray-800 leading-relaxed"
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

const textLines = computed(() => {
  const sentences = props.subsection.text.match(/[^.!?]+[.!?]+/g) || [props.subsection.text]
  return sentences.map(s => s.trim())
})
</script>