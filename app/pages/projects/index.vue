<template>
  <section v-if="projectDoc" class="px-6 sm:px-10 lg:px-14 py-16 sm:py-20 lg:py-24 flex flex-col">
    <line-title :subtitle="$t('common.projects')" lineColorClass="bg-red" />
    <p class="text-red text-4xl sm:text-6xl lg:text-7xl mb-4">{{ projectDoc.title}}</p>
    <p class="text-dark-grey text-2xl">{{ projectDoc.description }}</p>
  </section>

  <!-- Cards mit gestaffelter Animation -->
  <section class="px-6 sm:px-10 lg:px-14 pb-16 sm:pb-20 lg:pb-24">
    <div class="mx-auto max-w-screen-2xl">
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
  
  <!-- Logo Grid mit Wave-Animation -->
  <section ref="logoSection" class="px-6 sm:px-10 lg:px-14 pb-16 sm:pb-20 lg:pb-24 bg-white">
    <div class="mx-auto max-w-4xl">
      <ul class="grid grid-cols-1 md:grid-cols-3 gap-0">
        <li
          v-for="(item, index) in logos"
          :key="item.key"
          v-motion
          :initial="logoAnimation.initial"
          :visibleOnce="getLogoAnimation(index)"
          class="group bg-white border-t border-slate-200 md:border-l
                 first:border-t-0
                 md:[&:nth-child(-n+3)]:border-t-0
                 md:[&:nth-child(3n+1)]:border-l-0"
        >
          <div class="h-20 sm:h-24 md:h-28 w-full flex items-center justify-center px-40 py-10">
            <img
              :src="item.src"
              :alt="item.name"
              class="h-[44px] sm:h-[48px] md:h-[56px] w-auto max-w-[180px] object-contain
                     grayscale opacity-90 transition duration-200 ease-out
                     group-hover:grayscale-0 group-hover:opacity-100
                     select-none pointer-events-none"
              draggable="false"
            />
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import case1 from '~/assets/images/projects/overview/case_1.png'
import case2 from '~/assets/images/projects/overview/case_2.jpg'
import case3 from '~/assets/images/projects/overview/case_3.jpg'
import case4 from '~/assets/images/projects/overview/case_4.jpg'
import case5 from '~/assets/images/projects/overview/case_5.jpg'
import case6 from '~/assets/images/projects/overview/case_6.jpg'
import case7 from '~/assets/images/projects/overview/case_7.jpg'
import case8 from '~/assets/images/projects/overview/case_8.png'
import case9 from '~/assets/images/projects/overview/case_9.jpg'
import case10 from '~/assets/images/projects/overview/case_10.jpg'
import case11 from '~/assets/images/projects/overview/case_11.jpg'
import case12 from '~/assets/images/projects/overview/case_12.jpg'
import case13 from '~/assets/images/projects/overview/case_13.png'

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
      .path(`/${locale.value}/projects`)
      .first()
    return (doc ?? null) as unknown as ProjectDoc | null
  },
  { watch: [() => locale.value] }
)

// Map: key -> Bild-URL
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
  case_13: case13
}

const projects = computed(() =>
  projectDoc.value?.meta.projects?.map(p => ({
    ...p,
    image: projectImages[p.key] ?? '' // falls mal ein Bild fehlt
  })) ?? []
)

const files = import.meta.glob('~/assets/images/projects/overview/refs/*.{svg,png,jpg,jpeg}', {
  eager: true,
  query: '?url',
  import: 'default'
}) as Record<string, string>

const srcByKey: Record<string, string> = {}
for (const [path, url] of Object.entries(files)) {
  const filename = path.split('/').pop()!
  const key = filename.slice(0, filename.lastIndexOf('.'))        
  srcByKey[key] = url
}

const refsBase = [
  { key: 'energie360', name: 'Energie 360°' },
  { key: 'nexi', name: 'nexi' },
  { key: 'spross', name: 'Spross' },
  { key: 'six', name: 'SIX' },
  { key: 'payment-standards', name: 'Payment Standards CH' },
  { key: 'viseca', name: 'VISECA' },
  { key: 'swisscom', name: 'Swisscom' },
  { key: 'local', name: 'local.ch' },
  { key: 'pf', name: 'Pro Familia Schweiz' },
  { key: 'microsoft', name: 'Microsoft' },
  { key: 'ecolite', name: 'Ecolite AG' },
  { key: 'kanadevia-inova', name: 'Kanadevia INOVA' },
] as const

const logos = refsBase.map(r => ({ ...r, src: srcByKey[r.key] ?? '' }))

const logoSection = ref(null)

const logoAnimation = ref({
  initial: {
    opacity: 0,
    scale: 0.9
  }
})

const getLogoAnimation = (index: number) => {
  const isMobile = window.innerWidth < 768 
  
  if (isMobile) {
    const delay = index * 100
    
    return {
      opacity: 1,
      scale: 1,
      transition: {
        delay: delay,
        duration: 900,
        ease: 'easeOut'
      }
    }
  } else {
    const row = Math.floor(index / 3)
    const col = index % 3
    const delay = (row * 300) + (col * 180)
    
    return {
      opacity: 1,
      scale: 1,
      transition: {
        delay: delay,
        duration: 900,
        ease: 'easeOut'
      }
    }
  }
}
</script>