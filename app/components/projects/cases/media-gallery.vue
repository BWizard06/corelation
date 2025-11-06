<template>
  <div class="case-media-gallery">
    <projects-cases-text-section 
      :title="caseData.meta.sections.description.title"
      :text="caseData.meta.sections.description.text"
    />

    <projects-cases-carousel
      v-if="allMediaFiles.length > 0"
      :media-files="allMediaFiles"
      :get-media-url="getMediaUrl"
      :title="carouselTitle"
      :alt-prefix="caseData.title"
    />

    <projects-cases-text-section 
      :title="caseData.meta.sections.challenge.title"
      :text="caseData.meta.sections.challenge.text"
    />

    <projects-cases-text-section 
      :title="caseData.meta.sections.result.title"
      :text="caseData.meta.sections.result.text"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface MediaItem {
  file: string
  label?: string
}

const props = defineProps<{
  caseData: any
  mediaFiles: Record<string, string>
}>()

const getMediaUrl = (filename: string) => {
  return props.mediaFiles[filename] || ''
}

// Normalisiert Media Items (unterstützt altes + neues Format)
const normalizeMediaItem = (item: string | MediaItem): MediaItem => {
  if (typeof item === 'string') {
    return { file: item }
  }
  return item
}

// Alle Media Files sammeln mit Labels
const allMediaFiles = computed(() => {
  const files: MediaItem[] = []
  const media = props.caseData.meta.media
  
  if (media?.after_description) {
    files.push(...media.after_description.map(normalizeMediaItem))
  }
  if (media?.after_challenge) {
    files.push(...media.after_challenge.map(normalizeMediaItem))
  }
  if (media?.after_result) {
    files.push(...media.after_result.map(normalizeMediaItem))
  }
  
  return files
})

const carouselTitle = computed(() => {
  return props.caseData.meta.carouselTitle || 'Projektbilder'
})
</script>