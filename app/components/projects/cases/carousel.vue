<!-- components/projects/cases/Carousel.vue -->
<template>
  <section class="px-6 sm:px-10 lg:px-14 py-12 sm:py-16">
    <div class="max-w-7xl mx-auto">
      
      <div 
        v-motion
        :initial="sliderAnimation.initial"
        :visibleOnce="sliderAnimation.visibleOnce"
        class="hidden md:flex items-center gap-6 lg:gap-8"
      >
        
        <button
          v-if="mediaFiles.length > 1"
          ref="leftArrow"
          @click="previousImage"
          @mouseenter="isLeftHovered = true"
          @mouseleave="isLeftHovered = false"
          class="flex-shrink-0 group relative z-10"
          aria-label="Previous image"
        >
          <div class="h-20 lg:h-24 w-12 lg:w-14 relative">
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-gray-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
            
            <div class="relative h-full w-full rounded-xl border border-gray-200 group-hover:border-gray-400 transition-all duration-200 bg-white/40 backdrop-blur-sm group-hover:shadow-lg flex items-center justify-center">
              <phosphor-icon
                name="caret-left"
                class="w-7 h-7 lg:w-8 lg:h-8 text-gray-500 group-hover:text-gray-700 transition-all duration-200 group-hover:scale-110"
                :weight="isLeftHovered ? 'fill' : 'regular'"
              />
            </div>
          </div>
        </button>

        <div class="flex-1 relative">
          <div class="relative aspect-video rounded-3xl overflow-hidden">
            <TransitionGroup
              :name="slideDirection"
              tag="div"
              class="relative w-full h-full"
            >
              <component
                :is="currentMedia?.link ? 'a' : 'div'"
                v-for="(media, index) in [currentMedia]"
                :key="currentIndex"
                :href="currentMedia?.link || undefined"
                :target="currentMedia?.link ? '_blank' : undefined"
                :rel="currentMedia?.link ? 'noopener noreferrer' : undefined"
                :class="[
                  'absolute inset-0 w-full h-full',
                  currentMedia?.link ? 'cursor-pointer group/link' : ''
                ]"
              >
                <img
                  v-if="media && !isVideo(media.file)"
                  :src="getMediaUrl(media.file)"
                  :alt="`${altPrefix} - ${currentIndex + 1}`"
                  class="w-full h-full object-contain bg-gradient-to-br from-gray-50 to-gray-100 transition-transform duration-300 group-hover/link:scale-[1.02]"
                />
                <video
                  v-else-if="media && isVideo(media.file)"
                  ref="videoPlayer"
                  :src="getMediaUrl(media.file)"
                  controls
                  class="w-full h-full bg-black"
                />
                
                <div 
                  v-if="currentMedia?.link"
                  class="absolute top-6 left-6 px-4 py-2 bg-black/60 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl opacity-0 group-hover/link:opacity-100 transition-opacity duration-300"
                >
                  <div class="flex items-center gap-2 text-white text-sm font-medium">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span>Open Link</span>
                  </div>
                </div>
              </component>
            </TransitionGroup>
          </div>
        </div>

        <button
          v-if="mediaFiles.length > 1"
          ref="rightArrow"
          @click="nextImage"
          @mouseenter="isRightHovered = true"
          @mouseleave="isRightHovered = false"
          class="flex-shrink-0 group relative z-10"
          aria-label="Next image"
        >
          <div class="h-20 lg:h-24 w-12 lg:w-14 relative">
            <div class="absolute inset-0 bg-gradient-to-l from-transparent via-gray-400/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-lg" />
            
            <div class="relative h-full w-full rounded-xl border border-gray-200 group-hover:border-gray-400 transition-all duration-200 bg-white/40 backdrop-blur-sm group-hover:shadow-lg flex items-center justify-center">
              <phosphor-icon
                name="caret-right"
                class="w-7 h-7 lg:w-8 lg:h-8 text-gray-500 group-hover:text-gray-700 transition-all duration-200 group-hover:scale-110"
                :weight="isRightHovered ? 'fill' : 'regular'"
              />
            </div>
          </div>
        </button>
      </div>

      <div 
        v-motion
        :initial="sliderAnimation.initial"
        :visibleOnce="sliderAnimation.visibleOnce"
        class="md:hidden relative"
      >
        <button
          v-if="mediaFiles.length > 1"
          @click="previousImage"
          class="absolute left-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-gray-900/40 backdrop-blur-md border border-white/30 shadow-lg flex items-center justify-center text-white hover:bg-gray-900/60 transition-all duration-300 hover:scale-110 active:scale-95 z-10"
          aria-label="Vorheriges Bild"
        >
          <phosphor-icon name="caret-left" class="w-6 h-6" />
        </button>

        <button
          v-if="mediaFiles.length > 1"
          @click="nextImage"
          class="absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full bg-gray-900/40 backdrop-blur-md border border-white/30 shadow-lg flex items-center justify-center text-white hover:bg-gray-900/60 transition-all duration-300 hover:scale-110 active:scale-95 z-10"
          aria-label="Nächstes Bild"
        >
          <phosphor-icon name="caret-right" class="w-6 h-6" />
        </button>

        <div 
          ref="mobileSlider"
          class="relative aspect-video bg-gradient-to-br from-gray-50 to-gray-100 rounded-3xl overflow-hidden shadow-xl touch-pan-x"
          @touchstart="handleTouchStart"
          @touchmove="handleTouchMove"
          @touchend="handleTouchEnd"
        >
          <TransitionGroup
            :name="slideDirection"
            tag="div"
            class="relative w-full h-full"
          >
            <component
              :is="currentMedia?.link ? 'a' : 'div'"
              v-for="(media, index) in [currentMedia]"
              :key="currentIndex"
              :href="currentMedia?.link || undefined"
              :target="currentMedia?.link ? '_blank' : undefined"
              :rel="currentMedia?.link ? 'noopener noreferrer' : undefined"
              :class="[
                'absolute inset-0 w-full h-full',
                currentMedia?.link ? 'cursor-pointer group/link' : ''
              ]"
            >
              <img
                v-if="media && !isVideo(media.file)"
                :src="getMediaUrl(media.file)"
                :alt="`${altPrefix} - ${currentIndex + 1}`"
                class="w-full h-full object-contain transition-transform duration-300 group-hover/link:scale-[1.02]"
              />
              <video
                v-else-if="media && isVideo(media.file)"
                :src="getMediaUrl(media.file)"
                controls
                class="w-full h-full bg-black"
              />
              
              <!-- Link Indicator for Mobile -->
              <div 
                v-if="currentMedia?.link"
                class="absolute top-3 left-3 px-3 py-1.5 bg-black/60 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl"
              >
                <div class="flex items-center gap-1.5 text-white text-xs font-medium">
                  <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Link</span>
                </div>
              </div>
            </component>
          </TransitionGroup>
        </div>

        <div class="flex justify-center gap-2 mt-6">
          <button
            v-for="(_, index) in mediaFiles"
            :key="index"
            @click="selectImage(index)"
            :class="[
              'h-2 rounded-full transition-all duration-300',
              currentIndex === index 
                ? 'w-10 bg-red shadow-lg shadow-red/30' 
                : 'w-2 bg-gray-300 hover:bg-gray-400 hover:w-4'
            ]"
            :aria-label="`Go to slide ${index + 1}`"
          />
        </div>
      </div>

      <div class="mt-10 relative" v-if="mediaFiles.length > 1">
        <div 
          ref="thumbnailContainer"
          class="flex gap-3 md:gap-4 overflow-x-auto py-4 px-2 scrollbar-hide scroll-smooth"
          @scroll="onThumbnailScroll"
        >
          <button
            v-for="(media, index) in mediaFiles"
            :key="index"
            v-motion
            :initial="thumbnailAnimation.initial"
            :visibleOnce="getThumbnailAnimation(index)"
            @click="selectImage(index)"
            :class="[
              'flex-shrink-0 rounded-2xl overflow-hidden transition-all duration-500 relative group',
              'w-24 h-24 sm:w-32 sm:h-32 md:w-36 md:h-36',
              currentIndex === index 
                ? 'ring-4 ring-red scale-105 shadow-2xl shadow-red/20' 
                : 'opacity-60 hover:opacity-100 hover:scale-105 shadow-lg hover:shadow-xl'
            ]"
            :aria-label="`View ${getMediaLabel(media)} ${index + 1}`"
          >
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
            
            <img
              v-if="!isVideo(media.file)"
              :src="getMediaUrl(media.file)"
              :alt="`Thumbnail ${index + 1}`"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            <div 
              v-else 
              class="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center relative"
            >
              <video
                :src="getMediaUrl(media.file)"
                class="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-300"
                muted
                preload="metadata"
              />
              
              <div class="absolute inset-0 flex items-center justify-center z-10">
                <div class="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                  <svg class="w-5 h-5 sm:w-6 sm:h-6 text-gray-900 ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </div>
              </div>
            </div>

            <div 
              v-if="getMediaLabel(media)"
              class="absolute top-2 right-2 px-2.5 py-1 bg-red/90 backdrop-blur-sm text-white text-[10px] sm:text-xs font-semibold rounded-lg shadow-lg z-20 border border-white/10"
            >
              {{ getMediaLabel(media) }}
            </div>

            <div 
              v-if="currentIndex === index"
              class="absolute bottom-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-white rounded-full shadow-lg z-20"
            />
          </button>
        </div>
        
        <div 
          v-if="showLeftFade"
          class="absolute left-0 top-0 bottom-0 w-16 sm:w-20 bg-gradient-to-r from-white via-white/50 to-transparent pointer-events-none z-10"
        />
        <div 
          v-if="showRightFade"
          class="absolute right-0 top-0 bottom-0 w-16 sm:w-20 bg-gradient-to-l from-white via-white/50 to-transparent pointer-events-none z-10"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface MediaItem {
  file: string
  label?: string
  link?: string
}

const props = defineProps<{
  mediaFiles: MediaItem[]
  getMediaUrl: (filename: string) => string
  altPrefix?: string
}>()

const currentIndex = ref(0)
const slideDirection = ref('slide-next')
const videoPlayer = ref<HTMLVideoElement | null>(null)
const thumbnailContainer = ref<HTMLDivElement | null>(null)
const mobileSlider = ref<HTMLDivElement | null>(null)
const showLeftFade = ref(false)
const showRightFade = ref(false)

const leftArrow = ref<HTMLElement | null>(null)
const rightArrow = ref<HTMLElement | null>(null)
const isLeftHovered = ref(false)
const isRightHovered = ref(false)

let touchStartX = 0
let touchEndX = 0

const sliderAnimation = ref({
  initial: {
    opacity: 0,
    scale: 0.98,
  },
  visibleOnce: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 800,
      ease: [0.16, 1, 0.3, 1],
      delay: 150,
    }
  }
})

const thumbnailAnimation = ref({
  initial: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  }
})

const getThumbnailAnimation = (index: number) => {
  return {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 600,
      ease: [0.16, 1, 0.3, 1],
      delay: 400 + (index * 60),
    }
  }
}

const isVideo = (filename: string) => {
  return filename.endsWith('.mp4') || filename.endsWith('.webm') || filename.endsWith('.mov')
}

const currentMedia = computed(() => {
  return props.mediaFiles[currentIndex.value] || null
})

const getMediaUrl = (filename: string) => {
  return props.getMediaUrl(filename)
}

const getMediaLabel = (media: MediaItem): string | null => {
  if (media.label) {
    return media.label
  }
  if (isVideo(media.file)) {
    return 'VIDEO'
  }
  return null
}

const nextImage = () => {
  slideDirection.value = 'slide-next'
  currentIndex.value = (currentIndex.value + 1) % props.mediaFiles.length
  scrollToActiveThumbnail()
}

const previousImage = () => {
  slideDirection.value = 'slide-prev'
  currentIndex.value = currentIndex.value === 0 
    ? props.mediaFiles.length - 1 
    : currentIndex.value - 1
  scrollToActiveThumbnail()
}

const selectImage = (index: number) => {
  slideDirection.value = index > currentIndex.value ? 'slide-next' : 'slide-prev'
  currentIndex.value = index
  scrollToActiveThumbnail()
}

const handleTouchStart = (e: TouchEvent) => {
  touchStartX = e?.touches[0]?.clientX ?? 0
}

const handleTouchMove = (e: TouchEvent) => {
  touchEndX = e?.touches[0]?.clientX ?? 0
}

const handleTouchEnd = () => {
  const swipeThreshold = 50
  const diff = touchStartX - touchEndX

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextImage()
    } else {
      previousImage()
    }
  }

  touchStartX = 0
  touchEndX = 0
}

const scrollToActiveThumbnail = () => {
  if (!thumbnailContainer.value) return
  
  const container = thumbnailContainer.value
  const thumbnails = container.children
  const activeThumbnail = thumbnails[currentIndex.value] as HTMLElement
  
  if (activeThumbnail) {
    const containerWidth = container.offsetWidth
    const thumbnailLeft = activeThumbnail.offsetLeft
    const thumbnailWidth = activeThumbnail.offsetWidth
    const scrollLeft = thumbnailLeft - (containerWidth / 2) + (thumbnailWidth / 2)
    
    container.scrollTo({
      left: scrollLeft,
      behavior: 'smooth'
    })
  }
}

const onThumbnailScroll = () => {
  if (!thumbnailContainer.value) return
  
  const container = thumbnailContainer.value
  showLeftFade.value = container.scrollLeft > 10
  showRightFade.value = container.scrollLeft < container.scrollWidth - container.offsetWidth - 10
}

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'ArrowLeft') {
    e.preventDefault()
    previousImage()
  } else if (e.key === 'ArrowRight') {
    e.preventDefault()
    nextImage()
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleKeydown)
  
  if (thumbnailContainer.value) {
    onThumbnailScroll()
  }
  
  setTimeout(scrollToActiveThumbnail, 100)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.scrollbar-hide::-webkit-scrollbar {
  display: none;
}
.scrollbar-hide {
  -ms-overflow-style: none;
  scrollbar-width: none;
}

video {
  background: #000;
}

.slide-next-enter-active,
.slide-next-leave-active,
.slide-prev-enter-active,
.slide-prev-leave-active {
  transition: all 0.5s ease-out;
}

.slide-next-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.slide-next-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-prev-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.slide-prev-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.slide-next-leave-active,
.slide-prev-leave-active {
  position: absolute;
}
</style>