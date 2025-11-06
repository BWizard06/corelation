<template>
    <services-hero-section
      v-if="services"
      :title="services.title"
      :subtitle="services.meta.subtitle"
      :description="services.description"
      :image="iconSimple"
      line-color-class="bg-red"
      transparentBg 
    />
    
    <services-cards-stack 
      v-if="services"
      :items="services.meta.services" 
    />

    <services-industries-grid-big
      v-if="services"
      :title="services.meta.industries.title"
      :description="services.meta.industries.description"
      :items="services.meta.industries.items"
    />
</template>

<script setup lang="ts">
import iconSimple from '@/assets/images/logos/icon_simple.png'

useSeoMeta({
  robots: 'noindex, nofollow',
})

const { locale } = useI18n()

interface IndexPage {
  title: string
  meta: {
    subtitle: string
    services: Array<{
      title: string
      key: string
      description: string
      link: string
      items: string[]
    }>
    industries: {
      title: string
      description: string
      items: Array<{
        title: string
        key: string
        description: string
      }>
    }
  }
  description: string
}


const { data: services } = await useAsyncData(
  'services',
  async () => {
    const doc = await queryCollection('content').path(`/${locale.value}/services/services`).first()
    if (!doc || !doc.meta) return null
    return doc as unknown as IndexPage
  },
  { watch: [() => locale.value] }
)

</script>
