<template>
  <section v-if="privacy" class="relative w-full px-6 sm:px-10 lg:px-14 py-16 sm:py-20 lg:py-24">
    <div class="mb-8 sm:mb-10">
      <p class="text-2xl font-bold tracking-tight text-black leading-tight whitespace-pre-line">
        {{ privacy.title }}
      </p>
    </div>

    <div class="max-w-4xl space-y-10 sm:space-y-12">
      <div 
        v-for="(section, index) in privacy.meta.sections" 
        :key="index"
        class="space-y-4"
      >
        <h2 class="text-lg sm:text-xl font-bold text-black">
          {{ section.title }}
        </h2>
        <p 
          class="text-gray-700 leading-relaxed whitespace-pre-line"
          v-html="section.content"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Section {
  title: string
  content: string
}

interface Privacy {
  title: string
  meta: {
    sections: Section[]
  }
}

const { locale } = useI18n()
const { data: privacy } = await useAsyncData(
  'privacy',
  async () => {
    const doc = await queryCollection('content').path(`/${locale.value}/privacy`).first()
    if (!doc || !doc.meta) return null
    return doc as unknown as Privacy
  },
  { watch: [() => locale.value] }
)
</script>