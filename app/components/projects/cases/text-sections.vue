<template>
  <section>
    <projects-cases-text-section 
      :title="sections.description.title"
      :text="sections.description.text"
    />

    <projects-cases-text-section 
      :title="sections.challenge.title"
      :text="sections.challenge.text"
    />

    <projects-cases-text-section 
      :title="sections.result.title"
      :text="sections.result.text"
    />
  </section>
</template>

<script setup lang="ts">
interface Section {
  title: string
  text: string
}

interface Sections {
  description: Section
  challenge: Section
  result: Section
}

defineProps<{
  sections: Sections
}>()
</script>