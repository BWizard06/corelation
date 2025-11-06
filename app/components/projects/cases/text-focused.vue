<template>
  <div class="case-text-focused">
    
    <projects-cases-text-sections
      :sections="caseData.meta.sections"
    />

  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  caseData: any
  mediaFiles: Record<string, string>
}>()

const getMediaUrl = (filename: string) => {
  return props.mediaFiles[filename] || ''
}
</script>