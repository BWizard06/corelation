<template>
  <services-hero-section
    v-if="campaigning"
    :title="campaigning.title"
    :subtitle="campaigning.meta.subtitle"
    :description="campaigning.description"
    :image="darkGreyLogo"
    line-color-class="bg-dark-grey"
  />
  <services-competence-section
    v-if="campaigning"
    :competences="campaigning.meta.competences"
    :bubbles-image="bubblesImage"
    line-color-class="bg-dark-grey"
  />

  <services-reference-section
    :references="references"
    line-color-class="bg-dark-grey"
  />
</template>

<script setup lang="ts">
import darkGreyLogo from '/images/logos/logo_dark_grey.png'
import energie1 from '/images/services/energie_1.jpg'
import energie2 from '/images/services/energie_2.jpg'
import bubblesImage from '/images/bubbles/campaigning.jpg'
import type Service from '@/utils/service'

useSeoMeta({
  robots: 'noindex, nofollow',
})

const { locale } = useI18n()
const { data: campaigning } = await useAsyncData(
  'marketing',
  async () => {
    const doc = await queryCollection('content').path(`/${locale.value}/services/marketing`).first()
    if (!doc || !doc.meta) return null
    return doc as unknown as Service
  },
  { watch: [() => locale.value] }
)

const references = ref([
  {
    title: "Energie 360°",
    image: energie1,
    link: "https://example.com/energie360-1"
  },
  {
    title: "Energie 360°", 
    image: energie2,
    link: "https://example.com/energie360-2"
  }
])
</script>