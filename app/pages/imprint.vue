<template>
  <section v-if="imprint" class="relative w-full px-6 sm:px-10 lg:px-14 py-16 sm:py-20 lg:py-24">
    <div class="mb-8 sm:mb-10">
      <p class="text-2xl font-bold tracking-tight text-black leading-tight whitespace-pre-line">
        {{ imprint.title }}

      </p>
      <p class="mt-6 leading-7 text-xl whitespace-pre-line">
        {{ imprint.description }}
      </p>  
    </div>
    <div class="flex flex-col gap-6">
      <p class="leading-7 text-lg whitespace-pre-line">
        {{ imprint.meta.address }}
      </p>
      <div class="flex flex-col gap-1">
        <div>
          <span class="text-lg">E-Mail: </span>
          <a href="mailto:info@corelation.ch" class="text-lg underline text-blue-400">info@corelation.ch</a>
        </div>
        <div>
          <span class="text-lg">Phone: </span>
          <a href="tel:+41798324347" class="text-lg underline text-blue-400">+41 79 832 43 47</a>
        </div>
      </div>
      <p class="leading-7 text-lg whitespace-pre-line">
        {{ imprint.meta.details }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Imprint {
  title: string
  description: string
  meta: {
    address: string
    details: string
  }
}

const { locale } = useI18n()
const { data: imprint } = await useAsyncData(
  'imprint',
  async () => {
    const doc = await queryCollection('content').path(`/${locale.value}/imprint`).first()
    if (!doc || !doc.meta) return null
    return doc as unknown as Imprint
  },
  { watch: [() => locale.value] }
)

</script>