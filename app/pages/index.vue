<template>
  <home-hero-section
    v-if="home"
    :title="home.title"
    :subsection="home.meta.subsection"
    @hero-finished="onHeroFinished"
  />
  <home-sub-section
    v-if="home"
    :subsection="home.meta.subsection"
    :startAnimation="heroFinished"
  />
  <home-focus-split
    v-if="home"
    :title="home.meta.focus.title"
    :subtitle="home.meta.focus.subtitle"
    :items="home.meta.focus.items"
  />
  <home-occupation
    v-if="home"
    :occupation="home.meta.occupation"
  />
  <home-about-cta
    v-if="home"
    :cta="home.meta.aboutCta"
  />
  <projects-references />
</template>

<script setup lang="ts">
import Occupation from '~/components/home/occupation.vue'


interface Home {
  title: string
  meta: {
    subsection: {
      title: string
      text: string
    }
    aboutCta: {
      label: string
      title: string
      description: string
    }
    focus: {
      title: string
      subtitle: string
      items: Array<{
        title: string
        key: string
        description: string
      }>
    }
    occupation: {
      title: string
      subtitle: string
      paragraphs: string[]
    }
  }
}
const { locale } = useI18n()
const { data: home } = await useAsyncData(
  'home',
  async () => {
    const doc = await queryCollection('content').path(`/${locale.value}/home`).first()
    if (!doc || !doc.meta) return null
    return doc as unknown as Home
  },
  { watch: [() => locale.value] }
)

const heroFinished = ref(false)

function onHeroFinished() {
  heroFinished.value = true
}
</script>