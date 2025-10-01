<template>
    <div 
        v-motion
        :initial="titleAnimation.initial"
        :visibleOnce="titleAnimation.visibleOnce"
        class="flex items-center gap-3 mb-6"
    >
        <span class="h-[2px] w-10" :class="lineColorClass || 'bg-dark-grey'"></span>
        <p :class="`${textColorClass} uppercase tracking-wide text-sm`">
          {{ subtitle }}
        </p>
    </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
    subtitle: string
    lineColorClass?: string
    delay?: number
    textColorClass?: string
}>(), {
    textColorClass: 'text-dark-grey',
})

const titleAnimation = ref({
  initial: { 
    opacity: 0,
    x: -20
  },
  visibleOnce: { 
    opacity: 1,
    x: 0,
    transition: {
      delay: props.delay || 0,
      duration: 600,
      ease: 'easeOut'
    }
  }
})
</script>