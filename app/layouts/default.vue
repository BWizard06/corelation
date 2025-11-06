<template>
  <div class="min-h-screen flex flex-col max-w-[1512px] mx-auto overflow-visible">
    <nav 
      class="hidden md:block fixed inset-x-0 z-50 transition-all duration-300 ease-in-out"
      :class="{
        'w-fit max-w-[1200px] mt-3 px-10 py-3 mx-auto rounded-full backdrop-blur-md bg-white/85 shadow-lg border border-light-grey/30': !atTop,
        'max-w-[1512px] mx-auto px-14 py-3 bg-white': atTop
      }"
      :style="{ opacity: desktopVisible ? 1 : 0 }"
    >
      <div class="flex items-center justify-between">
        <NuxtLink to="/" aria-label="Home">
          <img 
            :src="atTop ? logoUrl : iconUrl" 
            alt="Corelation" 
            class="transition-all duration-300"
            :class="atTop ? 'h-16 w-auto' : 'h-8 w-auto'"
          />
        </NuxtLink>

        <ul class="flex items-center">
          <li :class="atTop ? 'ml-0' : 'ml-16'">
            <NuxtLink
              to="/services"
              class="transition-colors font-medium hover:text-black"
              :class="isActive('/services') ? 'text-red' : 'text-dark-grey'"
            >
              {{ $t('nav.services') }}
            </NuxtLink>
          </li>
          <li :class="atTop ? 'ml-10' : 'ml-8'">
            <NuxtLink
              to="/projects"
              class="transition-colors font-medium hover:text-black"
              :class="isActive('/projects') ? 'text-red' : 'text-dark-grey'"
            >
              {{ $t('nav.projects') }}
            </NuxtLink>
          </li>
          <li :class="atTop ? 'ml-10' : 'ml-8'">
            <NuxtLink
              to="/about"
              class="transition-colors font-medium hover:text-black"
              :class="isActive('/about') ? 'text-red' : 'text-dark-grey'"
            >
              {{ $t('nav.about') }}
            </NuxtLink>
          </li>
        </ul>
      </div>
    </nav>

    <nav 
      v-show="!mobileMenuOpen"
      class="md:hidden fixed inset-x-0 z-50 transition-all duration-300 ease-in-out"
      :class="{
        'mt-3 mx-3 px-6 py-3 rounded-full backdrop-blur-md bg-white/85 shadow-lg border border-light-grey/30': !atTop,
        'px-6 py-4 bg-white': atTop
      }"
      :style="{ opacity: mobileVisible ? 1 : 0 }"
    >
      <div class="flex items-center justify-between">
        <NuxtLink to="/" aria-label="Home">
          <img 
            :src="atTop ? logoUrl : iconUrl" 
            alt="Corelation" 
            class="transition-all duration-300"
            :class="atTop ? 'h-12 w-auto' : 'h-8 w-auto'"
          />
        </NuxtLink>

        <button 
          @click="mobileMenuOpen = true"
          class="p-2 text-dark-grey hover:text-black transition-colors"
          aria-label="Menu"
        >
          <phosphor-icon
            name="list"
            class="w-6 h-6"
          />
        </button>
      </div>
    </nav>

    <Transition
      enter-active-class="transition-opacity duration-300"
      leave-active-class="transition-opacity duration-300"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div 
        v-if="mobileMenuOpen"
        class="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
        @click="mobileMenuOpen = false"
      />
    </Transition>

    <Transition
      enter-active-class="transition-transform duration-300"
      leave-active-class="transition-transform duration-300"
      enter-from-class="translate-x-full"
      leave-to-class="translate-x-full"
    >
      <div 
        v-if="mobileMenuOpen"
        class="fixed top-0 right-0 bottom-0 w-64 bg-black shadow-xl z-[70]"
      >
        <div class="flex justify-end p-6">
          <button
            @click="mobileMenuOpen = false"
            class="p-2 text-white hover:text-red transition-colors"
            aria-label="Close Menu"
          >
            <phosphor-icon
              name="x"
              class="w-8 h-8"
            />
          </button>
        </div>

        <div class="flex flex-col px-6 space-y-6">
          <NuxtLink
            to="/services"
            class="text-lg font-medium transition-colors"
            :class="isActive('/services') ? 'text-red' : 'text-white hover:text-red'"
            @click="mobileMenuOpen = false"
          >
            {{ $t('nav.services') }}
          </NuxtLink>
          <NuxtLink
            to="/projects"
            class="text-lg font-medium transition-colors"
            :class="isActive('/projects') ? 'text-red' : 'text-white hover:text-red'"
            @click="mobileMenuOpen = false"
          >
            {{ $t('nav.projects') }}
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="text-lg font-medium transition-colors"
            :class="isActive('/about') ? 'text-red' : 'text-white hover:text-red'"
            @click="mobileMenuOpen = false"
          >
            {{ $t('nav.about') }}
          </NuxtLink>
        </div>
      </div>
    </Transition>

    <div class="h-20 md:h-[88px]"></div>

    <main class="flex-1 w-full">
      <slot />
    </main>

    <footer class="w-full bg-dark-grey text-white py-8 px-6 md:px-[200px]">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-sm">&copy; {{ new Date().getFullYear() }} CoRelation GmbH</p>
        <div class="flex flex-col md:flex-row gap-4 md:gap-6">
          <NuxtLink to="/imprint" class="text-sm hover:underline">{{ $t('footer.imprint') }}</NuxtLink>
          <NuxtLink to="/privacy" class="text-sm hover:underline">{{ $t('footer.privacy') }}</NuxtLink>
          <NuxtLink to="/about#contact" class="text-sm hover:underline">{{ $t('footer.contact') }}</NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useWindowScroll } from '@vueuse/core'
import logoUrl from '~/assets/images/logos/logo_positive.jpg'
import iconUrl from '~/assets/images/logos/icon_simple.png'

const route = useRoute()
const { y } = useWindowScroll()

const atTop = computed(() => y.value < 50)

const lastScrollY = ref(0)
const scrollDir = ref<'up' | 'down'>('up')

watch(y, val => {
  scrollDir.value = val > lastScrollY.value ? 'down' : 'up'
  lastScrollY.value = val
})

const desktopVisible = computed(() => atTop.value || scrollDir.value === 'up')

const mobileVisible = computed(() => atTop.value || scrollDir.value === 'up')

const mobileMenuOpen = ref(false)

const isActive = (base: string) => {
  const section = base.replace(/^\//, '')
  const re = new RegExp(`^/(?:[a-z]{2}(?:-[A-Za-z]{2})?/)?${section}(?:/|$)`, 'i')
  return re.test(route.path)
}

watch(() => route.path, () => {
  mobileMenuOpen.value = false
})
</script>