<template>
  <section
    v-if="about"
    class="relative bg-center bg-cover bg-no-repeat py-14 sm:py-20 lg:py-24"
    :style="{ backgroundImage: `url(${heroImage})` }"
  >
    <!-- Abdunkeln ohne Klicks zu blockieren -->
    <div class="absolute inset-0 bg-white/90 pointer-events-none"></div>

    <div class="relative px-6 sm:px-10 lg:px-14">
      <line-title
        :subtitle="about.meta.subtitle"
        lineColorClass="bg-red"
      />

      <p class="whitespace-pre-line font-semibold tracking-tight text-red text-4xl sm:text-6xl lg:text-7xl">
        {{ about.title }}
      </p>

      <p v-if="about.description" class="whitespace-pre-line mt-8 max-w-4xl leading-8 text-dark-grey text-2xl">
        {{ about.description }}
      </p>
    </div>
  </section>
<section v-if="about" class="relative">
    
    <div class="px-6 sm:px-10 lg:px-14 py-16 sm:py-20 lg:py-24 space-y-24">
        
      <!-- Katja -->
      <article class="grid items-center gap-8 lg:gap-12 lg:grid-cols-12">
        <!-- Text: Desktop rechts (col-span-7), Mobile oben (order-1) -->
        <div 
          v-motion
          :initial="textRevealAnimation.initial"
          :visibleOnce="textRevealAnimation.visibleOnce"
          class="lg:col-span-7 lg:order-2 order-1"
        >
          <h3 class="text-3xl font-semibold tracking-tight">{{ about.meta.people.katja.name }}</h3>
          <p class="text-red mt-1">{{ about.meta.people.katja.role }}</p>
          <!-- Text nur auf Desktop anzeigen -->
          <p class="mt-6 leading-7 text-lg whitespace-pre-line hidden lg:block">
            {{ about.meta.people.katja.text }}
          </p>
        </div>

        <!-- Bild: Desktop links (col-span-5), Mobile in der Mitte (order-2) -->
        <div 
          v-motion
          :initial="imageRevealAnimation.initial"
          :visibleOnce="imageRevealAnimation.visibleOnce"
          class="lg:col-span-5 lg:order-1 order-2"
        >
          <img :src="katjaImg" alt="Foto von Katja Brändle"
               class="w-full rounded-2xl object-cover object-[50%_30%] aspect-[4/5] shadow-md" />
        </div>

        <!-- Text nach Bild: Nur auf Mobile (order-3) -->
        <div class="lg:hidden order-3">
          <p class="mt-6 leading-7 text-lg whitespace-pre-line">
            {{ about.meta.people.katja.text }}
          </p>
        </div>
      </article>

      <!-- Catrin (gespiegelt) -->
      <article class="grid items-center gap-8 lg:gap-12 lg:grid-cols-12">
        <!-- Text: Desktop links (col-span-7, order-1), Mobile oben (order-1) -->
        <div 
          v-motion
          :initial="textRevealAltAnimation.initial"
          :visibleOnce="textRevealAltAnimation.visibleOnce"
          class="lg:col-span-7 lg:order-1 order-1"
        >
          <h3 class="text-3xl font-semibold tracking-tight">{{ about.meta.people.catrin.name }}</h3>
          <p class="text-red mt-1">{{ about.meta.people.catrin.role }}</p>
          <!-- Text nur auf Desktop anzeigen -->
          <p class="mt-6 leading-7 text-lg whitespace-pre-line hidden lg:block">
            {{ about.meta.people.catrin.text }}
          </p>
        </div>

        <!-- Bild: Desktop rechts (col-span-5, order-2), Mobile in der Mitte (order-2) -->
        <div 
          v-motion
          :initial="imageRevealAltAnimation.initial"
          :visibleOnce="imageRevealAltAnimation.visibleOnce"
          class="lg:col-span-5 lg:order-2 order-2"
        >
          <img :src="catrinImg" alt="Foto von Catrin Rubenson"
               class="w-full rounded-2xl object-cover aspect-[4/5] shadow-md" />
        </div>

        <!-- Text nach Bild: Nur auf Mobile (order-3) -->
        <div class="lg:hidden order-3">
          <p class="mt-6 leading-7 text-lg whitespace-pre-line">
            {{ about.meta.people.catrin.text }}
          </p>
        </div>
      </article>
    </div>
  </section>
  <section v-if="about">
    <div class="bg-light-grey/30 flex flex-col gap-8 px-6 sm:px-10 lg:px-14">
      <div class="pt-16">
        <line-title
          :subtitle="about.meta.network.title"
          lineColorClass="bg-red"
        />
      </div>
      <p class="pb-16 leading-7 text-xl">
          {{ about.meta.network.text }}
      </p>
    </div>
  </section>
</template>

<script setup lang="ts">
import heroImage from '~/assets/images/about/hero.jpg'
import katjaImg from '~/assets/images/about/katja.png'
import catrinImg from '~/assets/images/about/catrin.png'

interface Person {
    name: string
    role: string
    text: string
}

interface About {
  title: string
  description: string
  meta: {
    subtitle: string
    people: {
        katja: Person
        catrin: Person
    }
    network: {
        title: string
        text: string
    }
  }
}

const { locale } = useI18n()
const { data: about } = await useAsyncData(
  'about',
  async () => {
    const doc = await queryCollection('content').path(`/${locale.value}/about`).first()
    if (!doc || !doc.meta) return null
    return doc as unknown as About
  },
  { watch: [() => locale.value] }
)

console.log(about)

// Bild Reveal für Katja - kommt von unten mit leichter Rotation
const imageRevealAnimation = ref({
  initial: { 
    y: 100,
    opacity: 0,
    rotate: 3,
    scale: 0.95
  },
  visibleOnce: { 
    y: 0,
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 40,
      damping: 15,
      mass: 1,
      delay: 100
    }
  }
})

// Text Reveal für Katja - kommt auch von unten, aber schneller
const textRevealAnimation = ref({
  initial: { 
    y: 60,
    opacity: 0
  },
  visibleOnce: { 
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 50,
      damping: 18,
      delay: 300
    }
  }
})

// Bild Reveal für Catrin - kommt von unten mit Rotation in andere Richtung
const imageRevealAltAnimation = ref({
  initial: { 
    y: 100,
    opacity: 0,
    rotate: -3,
    scale: 0.95
  },
  visibleOnce: { 
    y: 0,
    opacity: 1,
    rotate: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 40,
      damping: 15,
      mass: 1,
      delay: 100
    }
  }
})

// Text Reveal für Catrin
const textRevealAltAnimation = ref({
  initial: { 
    y: 60,
    opacity: 0
  },
  visibleOnce: { 
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 50,
      damping: 18,
      delay: 300
    }
  }
})
</script>