<template>
  <section v-if="projectDoc" class="px-6 sm:px-10 lg:px-14 py-16 sm:py-20 lg:py-24 flex flex-col">
    <line-title :subtitle="$t('common.projects')" lineColorClass="bg-red" />
    <p class="text-red font-semibold text-4xl sm:text-6xl lg:text-7xl mb-4 tracking-tight">{{ projectDoc.title}}</p>
    <p class="text-dark-grey text-2xl">{{ projectDoc.description }}</p>
  </section>

  <section class="px-6 sm:px-10 lg:px-14 pb-16 sm:pb-20 lg:pb-24">
    <div class="mx-auto">
      <div class="grid gap-10 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2">
        <projects-card
          v-for="p in projects"
          :key="p.key"
          :company="p.company"
          :title="p.title"
          :image="p.image"
          :to="p.link"
          class="max-w-[600px]"
        />
      </div>
    </div>
  </section>
  
  <projects-references />
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import case1 from '@/assets/images/projects/overview/1.jpg'
import case2 from '@/assets/images/projects/overview/2.jpg'
import case3 from '@/assets/images/projects/overview/3.png'
import case4 from '@/assets/images/projects/overview/4.jpg'
import case5 from '@/assets/images/projects/overview/5.jpg'
import case6 from '@/assets/images/projects/overview/6.jpg'
import case7 from '@/assets/images/projects/overview/7.jpg'
import case8 from '@/assets/images/projects/overview/8.png'
import case9 from '@/assets/images/projects/overview/9.jpg'
import case10 from '@/assets/images/projects/overview/10.jpg'
import case11 from '@/assets/images/projects/overview/11.jpg'
import case12 from '@/assets/images/projects/overview/12.jpg'
import case13 from '@/assets/images/projects/overview/13.png'
import case14 from '@/assets/images/projects/overview/14.jpg'

useSeoMeta({
  robots: 'noindex, nofollow',
})

interface Project { key: string; company: string; title: string; link?: string }
interface ProjectDoc { 
  title: string
  description: string
  meta: {
    subtitle: string
    projects: Project[] 
  }
}

const { locale } = useI18n()

const { data: projectDoc } = await useAsyncData<ProjectDoc | null>(
  'projects',
  async () => {
    const doc = await queryCollection('content')
      .path(`/${locale.value}/projects/overview`)
      .first()
    return (doc ?? null) as unknown as ProjectDoc | null
  },
  { watch: [() => locale.value] }
)

const projectImages: Record<string, string> = {
  case_1: case1,
  case_2: case2,
  case_3: case3,
  case_4: case4,
  case_5: case5,
  case_6: case6,
  case_7: case7,
  case_8: case8,
  case_9: case9,
  case_10: case10,
  case_11: case11,
  case_12: case12,
  case_13: case13,
  case_14: case14
}

const projects = computed(() =>
  projectDoc.value?.meta.projects?.map(p => ({
    ...p,
    image: projectImages[p.key] ?? ''
  })) ?? []
)
</script>