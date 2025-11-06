<template>
  <div class="relative">
    <Transition name="fade-out">
      <div
        v-if="showAnimation"
        class="fixed inset-0 z-[9999] bg-red flex items-center justify-center overflow-hidden"
        aria-hidden="true"
      >
        <div class="relative pointer-events-none will-change-transform">
          <img
            :src="iconSimple"
            alt="Intro Logo"
            class="w-[60vw] sm:w-[40vw] lg:w-[30vw] max-w-[450px] h-auto intro-spin-zoom"
            @animationend="onIntroEnd"
          />
        </div>
      </div>
    </Transition>

    <section 
      class="relative overflow-hidden bg-red transition-[min-height] duration-300"
    >
      <div
        class="absolute inset-0 opacity-[0.03]"
        style="background-image: radial-gradient(circle, white 1px, transparent 1px); background-size: 40px 40px;"
      />

      <div class="w-full px-6 sm:px-10 lg:px-14 py-16 sm:py-20 lg:py-24 xl:py-28">
        <div class="max-w-7xl mx-auto">

          <div
            v-if="!showAnimation"
            class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8 lg:gap-12 xl:gap-16"
          >
            <div class="flex-1">
              <div class="mb-3 sm:mb-4 lg:mb-5">
                <div class="flex items-baseline gap-3 sm:gap-4 lg:gap-6">
                  <h1
                    v-motion
                    :initial="{ x: -100, opacity: 0 }"
                    :enter="{
                      x: 0,
                      opacity: 1,
                      transition: { delay: 200, duration: 1000, ease: 'easeOut' }
                    }"
                    class="font-black text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-none"
                  >
                    {{ firstPart[0] }}
                  </h1>
                  <h1
                    v-motion
                    :initial="{ x: -100, opacity: 0, scale: 0.8 }"
                    :enter="{
                      x: 0,
                      opacity: 1,
                      scale: 1,
                      transition: { delay: 400, duration: 1000, ease: 'easeOut' }
                    }"
                    class="font-black text-white text-5xl sm:text-6xl lg:text-7xl xl:text-8xl leading-none"
                  >
                    {{ firstPart[1] }}
                  </h1>
                </div>
              </div>

              <div>
                <div class="flex items-baseline gap-3 sm:gap-4 lg:gap-6">
                  <h1
                    v-motion
                    :initial="{ x: -100, opacity: 0 }"
                    :enter="{
                      x: 0,
                      opacity: 1,
                      transition: { delay: 700, duration: 1000, ease: 'easeOut' }
                    }"
                    class="font-black text-white text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-none"
                  >
                    {{ secondPart[0] }}
                  </h1>
                  <h1
                    v-motion
                    :initial="{ x: -100, opacity: 0, scale: 0.8 }"
                    :enter="{
                      x: 0,
                      opacity: 1,
                      scale: 1,
                      transition: { delay: 900, duration: 1000, ease: 'easeOut' }
                    }"
                    class="font-black text-white text-6xl sm:text-7xl lg:text-8xl xl:text-9xl leading-none"
                  >
                    {{ secondPart[1] }}
                  </h1>
                </div>
              </div>

              <div class="mt-6 sm:mt-8 lg:mt-10">
                <div
                  v-motion
                  :initial="{ scaleX: 0, opacity: 0 }"
                  :enter="{
                    scaleX: 1,
                    opacity: 1,
                    transition: { delay: 1400, duration: 800, ease: 'easeOut' }
                  }"
                  class="h-1 bg-white/90 origin-left w-32 sm:w-40 lg:w-48 rounded-full"
                />
              </div>
            </div>

            <div class="flex-shrink-0 lg:w-[35%] xl:w-[40%] flex items-center justify-center lg:justify-end">
              <div
                v-motion
                :initial="{ scale: 0.2, opacity: 0, rotate: -180 }"
                :enter="{
                  scale: 1,
                  opacity: 1,
                  rotate: 0,
                  transition: {
                    delay: 1100,
                    duration: 1500,
                    ease: [0.34, 1.56, 0.64, 1]
                  }
                }"
                class="relative w-48 sm:w-56 lg:w-64 xl:w-80"
              >
                <div
                  v-motion
                  :initial="{ scale: 1 }"
                  :enter="{
                    scale: [1, 1.05, 1],
                    transition: {
                      delay: 2600,
                      duration: 2000,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }
                  }"
                  class="relative"
                >
                  <img
                    :src="iconSimple"
                    alt="Logo"
                    class="w-full h-auto drop-shadow-2xl"
                  />
                  <div class="absolute inset-0 bg-white/5 rounded-full blur-2xl -z-10" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import iconSimple from '/images/logos/icon_white.png'

const props = defineProps<{
  title: string
  subsection: { title: string; text: string }
}>()

const emit = defineEmits<{
  (e: 'intro-finished'): void
  (e: 'hero-finished'): void
}>()

const showAnimation = ref(true)

const titleWords = computed(() => {
  return props.title.trim().replace(/\.$/, '').split(' ')
})

const firstPart = computed(() => {
  return [titleWords.value[0] || '', titleWords.value[1] || '']
})

const secondPart = computed(() => {
  return [titleWords.value[2] || '', titleWords.value[3] || '']
})

function onIntroEnd() {
  showAnimation.value = false
  emit('intro-finished')

  setTimeout(() => {
    emit('hero-finished')
  }, 2800)
}
</script>

<style scoped>
.fade-out-enter-active,
.fade-out-leave-active {
  transition: opacity 0.7s ease;
}
.fade-out-enter-from,
.fade-out-leave-to {
  opacity: 0;
}

@keyframes introSpinZoom {
  0% {
    opacity: 0;
    transform: rotate(0deg) scale(0.4);
  }
  60% {
    opacity: 1;
    transform: rotate(720deg) scale(1);
  }
  100% {
    opacity: 0;
    transform: rotate(0deg) scale(0.6);
  }
}

.intro-spin-zoom {
  animation: introSpinZoom 2.5s ease-in-out forwards;
  transform-origin: center center;
  will-change: transform, opacity;
}
</style>
