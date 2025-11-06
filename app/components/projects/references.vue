<template>
    <section ref="logoSection" class="px-6 sm:px-10 lg:px-14 pb-16 sm:pb-20 lg:pb-24 bg-white">
      <line-title
        :subtitle="$t('reference.title')"
        lineColorClass="bg-red"
      />
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
  { key: 'immunitas', name: 'Corona Immunitas' }
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