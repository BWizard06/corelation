<template>
  <div v-if="caseData">
    <projects-cases-hero
      :company="caseData.meta.company"
      :title="caseData.title"
      :logo-filename="caseData.meta.logo"
      :media-files="mediaFiles"
      :case-id="route.params.slug as string"
    />

    <!-- Dynamic Content (Text + Media) -->
    <component
      :is="currentLayoutComponent"
      :case-data="caseData"
      :media-files="mediaFiles"
    />
    
    <projects-cases-services
      v-if="caseData.meta.services?.length"
      :services="caseData.meta.services"
    />

    <section class="px-6 sm:px-10 lg:px-14 py-12 sm:py-16">
      <div class="max-w-7xl mx-auto">
        <NuxtLinkLocale
          to="/projects"
          v-motion
          :initial="backButtonAnimation.initial"
          :visibleOnce="backButtonAnimation.visibleOnce"
          class="group inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-gray-50 text-gray-700 font-medium transition-all duration-300 hover:bg-red/5 hover:text-red hover:gap-3 active:scale-95"
        >
          <phosphor-icon
            name="arrow-left"
            class="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
          />
          <span class="border-b border-transparent group-hover:border-red transition-all duration-300">
            {{ $t('projects.back') }}
          </span>
        </NuxtLinkLocale>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { Component } from 'vue'

const route = useRoute()
const { locale } = useI18n()

useSeoMeta({
  robots: 'noindex, nofollow',
})

const MediaGallery = resolveComponent('projects-cases-media-gallery') as Component
const TextFocused = resolveComponent('projects-cases-text-focused') as Component

interface MediaItem {
  file: string
  label?: string
  link?: string
}

interface CaseData {
  title: string
  description: string
  meta: {
    company: string
    type: string
    logo: string
    sections: {
      description: {
        title: string
        text: string
      }
      challenge: {
        title: string
        text: string
      }
      result: {
        title: string
        text: string
      }
    }
    media?: {
      after_description?: (string | MediaItem)[]
      after_challenge?: (string | MediaItem)[]
      after_result?: (string | MediaItem)[]
      featured?: string
    }
    services?: string[]
  }
}

const { data: caseData } = await useAsyncData(
  `case-${route.params.slug}`,
  async () => {
    const doc = await queryCollection('content')
      .path(`/${locale.value}/projects/cases/${route.params.slug}`) 
      .first()
    return (doc ?? null) as unknown as CaseData | null
  }
)

const mediaFiles = computed(() => {
  if (!caseData.value) return {}
  
  const files = import.meta.glob('~/assets/images/projects/cases/*/*', {
    eager: true,
    query: '?url',
    import: 'default'
  }) as Record<string, string>
  
  const slug = route.params.slug
  const caseFiles: Record<string, string> = {}
  
  for (const [path, url] of Object.entries(files)) {
    if (path.includes(`/cases/${slug}/`)) {
      const filename = path.split('/').pop()!
      caseFiles[filename] = url
    }
  }
  
  return caseFiles
})

const currentLayoutComponent = computed(() => {
  const type = caseData.value?.meta.type
  return type === 'media-rich' ? MediaGallery : TextFocused
})

const backButtonAnimation = ref({
  initial: {
    opacity: 0,
    x: -20,
  },
  visibleOnce: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 600,
      ease: 'easeOut',
      delay: 200,
    }
  }
})
</script>