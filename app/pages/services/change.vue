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
import midGreyLogo from '@/assets/images/logos/logo_mid_grey.png'
import sprossImage from '@/assets/images/services/spross.jpg'
import sixImage from '@/assets/images/services/six.png'
import bubblesImage from '@/assets/images/bubbles/change.jpg'
import type Service from '@/utils/service'

useSeoMeta({
  robots: 'noindex, nofollow',
})

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
    link: "/projects/6"
  },
  {
    title: "Six Interbank Clearing", 
    image: sixImage,
    link: "/projects/3"
  }
])
</script>