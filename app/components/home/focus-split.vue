<template>
  <section class="relative w-full px-6 sm:px-10 lg:px-14 py-10 ">

    <div class="mb-10 sm:mb-14 flex flex-col gap-1">
      <line-title
        :subtitle="title"
        lineColorClass="bg-red"
      />
      <p 
        v-motion
        :initial="{ opacity: 0, y: 20 }"
        :visibleOnce="{ 
          opacity: 1, 
          y: 0,
          transition: { delay: 200, duration: 600, ease: 'easeOut' }
        }"
        class="text-lg sm:text-xl text-dark-grey/80"
      >
        {{ subtitle }}
      </p>
    </div>

    <div class="flex flex-col lg:flex-row gap-6 lg:gap-8">
      <div class="lg:hidden">
        <div class="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button
            v-for="(item, index) in industriesWithMedia"
            :key="item.key"
            @click="setActive(index)"
            class="flex-shrink-0 px-4 py-2 rounded-full font-medium text-sm transition-all duration-300 whitespace-nowrap"
            :class="[
              activeIndex === index 
                ? 'bg-red text-white shadow-md' 
                : 'bg-light-grey/30 text-dark-grey hover:bg-light-grey/50'
            ]"
          >
            {{ item.title }}
          </button>
        </div>
      </div>

      <div 
        v-motion
        :initial="{ opacity: 0, x: -30 }"
        :visibleOnce="{ 
          opacity: 1, 
          x: 0,
          transition: { delay: 300, duration: 600, ease: 'easeOut' }
        }"
        class="lg:w-[60%] relative"
      >
        <div class="relative rounded-2xl overflow-hidden shadow-lg border border-black/5 bg-white">
          <div class="relative h-[300px] sm:h-[400px] lg:h-[450px] overflow-hidden bg-light-grey/10">
            <Transition name="fade" mode="out-in">
              <video 
                :key="activeIndex"
                :src="activeItem.video" 
                class="absolute inset-0 w-full h-full object-cover"
                autoplay
                loop
                muted
                playsinline
              />
            </Transition>
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
          </div>

          <div class="p-6 sm:p-8 lg:p-10">
            <Transition name="slide-fade" mode="out-in">
              <div :key="activeIndex">
                <p class="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-4">
                  {{ activeItem.title }}
                </p>
                <p class="text-base sm:text-lg text-dark-grey/80 leading-relaxed">
                  {{ activeItem.description }}
                </p>
              </div>
            </Transition>
          </div>
        </div>
      </div>

      <div 
        v-motion
        :initial="{ opacity: 0, x: 30 }"
        :visibleOnce="{ 
          opacity: 1, 
          x: 0,
          transition: { delay: 400, duration: 600, ease: 'easeOut' }
        }"
        class="hidden lg:flex lg:w-[40%] flex-col gap-3"
      >
        <button
          v-for="(item, index) in industriesWithMedia"
          :key="item.key"
          v-motion
          :initial="{ opacity: 0, x: 20 }"
          :visibleOnce="{ 
            opacity: 1, 
            x: 0,
            transition: { delay: 500 + (index * 80), duration: 500, ease: 'easeOut' }
          }"
          @click="setActive(index)"
          class="group relative flex items-center gap-4 p-4 rounded-xl transition-all duration-300 text-left"
          :class="[
            activeIndex === index 
              ? 'bg-red shadow-lg' 
              : 'bg-light-grey/30 hover:bg-light-grey/50 hover:shadow-md'
          ]"
        >
          <div class="relative flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden">
            <video 
              :src="item.video" 
              class="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              preload="metadata"
              muted
            />
            <div 
              class="absolute inset-0 transition-opacity duration-300"
              :class="activeIndex === index ? 'bg-red/20' : 'bg-black/10 group-hover:bg-black/5'"
            />
          </div>

          <div class="flex-1 min-w-0">
            <h4 
              class="font-semibold text-base sm:text-lg transition-colors duration-300"
              :class="activeIndex === index ? 'text-white' : 'text-black group-hover:text-red'"
            >
              {{ item.title }}
            </h4>
            <p 
              class="text-sm mt-0.5 line-clamp-1 transition-colors duration-300"
              :class="activeIndex === index ? 'text-white/80' : 'text-dark-grey/70'"
            >
              {{ item.description }}
            </p>
          </div>

          <phosphor-icon
            name="caret-right"
            class="w-5 h-5 flex-shrink-0 transition-all duration-300"
            :class="[
              activeIndex === index 
                ? 'text-white translate-x-1' 
                : 'text-dark-grey/50 group-hover:text-red group-hover:translate-x-1'
            ]"
          />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import strategyVideo from '@/assets/images/home/focus/strategy.mp4'
import swissVideo from '@/assets/images/home/focus/swiss.mp4'
import communicationVideo from '@/assets/images/home/focus/communication.mp4'
import b2bVideo from '@/assets/images/home/focus/b2b.mp4'

type Focus = {
  title: string
  key: string
  description: string
}

const props = defineProps<{
  title: string
  subtitle: string
  items: Focus[]
}>()

console.log(props.title)

const videoMap: Record<string, string> = {
  strategy: strategyVideo,
  swiss: swissVideo,
  communication: communicationVideo,
  b2b: b2bVideo
}

const industriesWithMedia = computed(() => 
  props.items.map(industry => ({
    ...industry,
    video: videoMap[industry.key] || strategyVideo
  }))
)

const activeIndex = ref(0)

const activeItem = computed(() => {
  const item = industriesWithMedia.value[activeIndex.value]
  if (!item) {
    return industriesWithMedia.value[0] || {
      title: '',
      key: '',
      description: '',
      video: strategyVideo
    }
  }
  return item
})

function setActive(index: number) {
  activeIndex.value = index
}
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}

.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

.fade-enter-active {
  transition: opacity 0.4s ease-out;
}

.fade-leave-active {
  transition: opacity 0.3s ease-in;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.2s ease-in;
}

.slide-fade-enter-from {
  transform: translateY(10px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>