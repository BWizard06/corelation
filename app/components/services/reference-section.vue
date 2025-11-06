<template>
  <section class="px-6 sm:px-10 lg:px-14 py-16 sm:py-20 lg:py-24 bg-light-grey/30">
    <line-title
      :subtitle="$t('reference.title')"
      :lineColorClass="lineColorClass"
    />

    <div class="flex flex-col lg:flex-row gap-6 lg:justify-between max-w-6xl mx-auto">
      <services-reference-card
        v-for="(reference, index) in references"
        :key="index"
        :title="reference.title"
        :image="reference.image"
        :link="reference.link"
        :animationDelay="200 + (index * 150)"
      />  
    </div>
  </section>
</template>

<script setup lang="ts">
interface Reference {
  title: string
  image: string
  link: string
}

defineProps<{
  references: Reference[]
  lineColorClass?: string
}>()
</script>