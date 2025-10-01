<template>
  <services-hero-section
    v-if="corporate"
    :title="corporate.title"
    :subtitle="corporate.meta.subtitle"
    :description="corporate.description"
    :image="blackLogo"
    line-color-class="bg-black"
  />
  <services-competence-section
    v-if="corporate"
    :competences="corporate.meta.competences"
    :bubbles-image="bubblesImage"
    line-color-class="bg-black"
  />

  <services-reference-section
    :references="references"
    line-color-class="bg-black"
  />
</template>

<script setup lang="ts">
import blackLogo from '~/assets/images/logos/logo_black.png'
import sprossImage from '~/assets/images/services/spross.jpg'
import microsoftImage from '~/assets/images/services/microsoft_1.jpg'
import bubblesImage from '~/assets/images/bubbles/corporate.jpg'
import type Service from '~/utils/service'

const { locale } = useI18n()
const { data: corporate } = await useAsyncData(
  'corporate',
  async () => {
    const doc = await queryCollection('content').path(`/${locale.value}/services/corporate`).first()
    if (!doc || !doc.meta) return null
    return doc as unknown as Service
  },
  { watch: [() => locale.value] }
)

const references = ref([
  {
    title: "Spross Gartenbau",
    image: sprossImage,
    // TODO: Replace with real link
    link: "https://example.com/energie360-1"
  },
  {
    title: "Microsoft", 
    image: microsoftImage,
    link: "https://example.com/energie360-2"
  }
])
</script>