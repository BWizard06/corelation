<template>
  <services-hero-section
    v-if="change"
    :title="change.title"
    :subtitle="change.meta.subtitle"
    :description="change.description"
    :image="midGreyLogo"
    line-color-class="bg-mid-grey"
  />
  <services-competence-section
    v-if="change"
    :competences="change.meta.competences"
    :bubbles-image="bubblesImage"
    line-color-class="bg-mid-grey"
  />

  <services-reference-section
    :references="references"
    line-color-class="bg-mid-grey"
  />
</template>

<script setup lang="ts">
import midGreyLogo from '~/assets/images/logos/logo_mid_grey.png'
import sprossImage from '~/assets/images/services/spross.jpg'
import microsoftImage from '~/assets/images/services/microsoft_1.jpg'
import bubblesImage from '~/assets/images/bubbles/change.jpg'
import type Service from '~/utils/service'

const { locale } = useI18n()
const { data: change } = await useAsyncData(
  'change',
  async () => {
    const doc = await queryCollection('content').path(`/${locale.value}/services/change`).first()
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