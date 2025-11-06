<template>
  <section
    v-if="about"
    class="relative bg-center bg-cover bg-no-repeat py-14 sm:py-20 lg:py-24"
    :style="{ backgroundImage: `url(${heroImage})` }"
  >
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
        
      <article class="grid items-center gap-8 lg:gap-12 lg:grid-cols-12" id="katja">
        <div 
          v-motion
          :initial="textRevealAnimation.initial"
          :visibleOnce="textRevealAnimation.visibleOnce"
          class="lg:col-span-7 lg:order-2 order-1"
        >
          <p class="text-3xl font-semibold tracking-tight">{{ about.meta.people.katja.name }}</p>
          <p class="text-red mt-1">{{ about.meta.people.katja.role }}</p>
          <!-- Text nur auf Desktop anzeigen -->
          <p class="mt-6 leading-7 text-lg whitespace-pre-line hidden lg:block">
            {{ about.meta.people.katja.text }}
          </p>
          <div class="mt-4 hidden lg:block">
            <div class="flex gap-4">
              <a href="mailto:info@corelation.ch">
                <phosphor-icon name="envelope" class="text-blue-400 w-7 h-7" />
              </a>
              <a href="tel:+41798324347" class="text-lg underline text-blue-400">
                <phosphor-icon name="phone" class="text-blue-400 w-7 h-7" />
              </a>
            </div>
          </div>
        </div>

        <div 
          v-motion
          :initial="imageRevealAnimation.initial"
          :visibleOnce="imageRevealAnimation.visibleOnce"
          class="lg:col-span-5 lg:order-1 order-2"
        >
          <img :src="katjaImg" alt="Foto von Katja Brändle"
               class="w-full rounded-2xl object-cover object-[50%_30%] aspect-[4/5] shadow-md" />
        </div>

        <div class="lg:hidden order-3">
          <p class="mt-6 leading-7 text-lg whitespace-pre-line">
            {{ about.meta.people.katja.text }}
          </p>
          <div class="flex gap-4 mt-4">
            <a href="mailto:info@corelation.ch">
              <phosphor-icon name="envelope" class="text-blue-400 w-7 h-7" />
            </a>
            <a href="tel:+41798324347" class="text-lg underline text-blue-400">
              <phosphor-icon name="phone" class="text-blue-400 w-7 h-7" />
            </a>
          </div>
        </div>
      </article>

      <article class="grid items-center gap-8 lg:gap-12 lg:grid-cols-12">
        <div 
          v-motion
          :initial="textRevealAltAnimation.initial"
          :visibleOnce="textRevealAltAnimation.visibleOnce"
          class="lg:col-span-7 lg:order-1 order-1"
        >
          <p class="text-3xl font-semibold tracking-tight">{{ about.meta.people.catrin.name }}</p>
          <p class="text-red mt-1">{{ about.meta.people.catrin.role }}</p>
          <!-- Text nur auf Desktop anzeigen -->
          <p class="mt-6 leading-7 text-lg whitespace-pre-line hidden lg:block">
            {{ about.meta.people.catrin.text }}
          </p>
        </div>

        <div 
          v-motion
          :initial="imageRevealAltAnimation.initial"
          :visibleOnce="imageRevealAltAnimation.visibleOnce"
          class="lg:col-span-5 lg:order-2 order-2"
        >
          <img :src="catrinImg" alt="Foto von Catrin Rubenson"
               class="w-full rounded-2xl object-cover aspect-[4/5] shadow-md" />
        </div>

        <div class="lg:hidden order-3">
          <p class="mt-6 leading-7 text-lg whitespace-pre-line">
            {{ about.meta.people.catrin.text }}
          </p>
        </div>
      </article>

      <article class="grid items-center gap-8 lg:gap-12 lg:grid-cols-12">
        <div 
          v-motion
          :initial="textRevealAnimation.initial"
          :visibleOnce="textRevealAnimation.visibleOnce"
          class="lg:col-span-7 lg:order-2 order-1"
        >
          <h3 class="text-3xl font-semibold tracking-tight">{{ about.meta.people.ben.name }}</h3>
          <p class="text-red mt-1">{{ about.meta.people.ben.role }}</p>
          <!-- Text nur auf Desktop anzeigen -->
          <p class="mt-6 leading-7 text-lg whitespace-pre-line hidden lg:block">
            {{ about.meta.people.ben.text }}
          </p>
        </div>

        <div 
          v-motion
          :initial="imageRevealAnimation.initial"
          :visibleOnce="imageRevealAnimation.visibleOnce"
          class="lg:col-span-5 lg:order-1 order-2"
        >
          <img :src="benImg" alt="Foto von Ben Brändle"
               class="w-full rounded-2xl object-cover object-[50%_30%] aspect-[4/5] shadow-md" />
        </div>

        <div class="lg:hidden order-3">
          <p class="mt-6 leading-7 text-lg whitespace-pre-line">
            {{ about.meta.people.ben.text }}
          </p>
        </div>
      </article>
    </div>
  </section>
  <section v-if="about">
    <div class="bg-light-grey/30 flex flex-col gap-4 px-6 sm:px-10 lg:px-14">
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
  <section v-if="about" id="contact">
    <div class="flex flex-col gap-4 px-6 sm:px-10 lg:px-14">
      <div class="pt-16">
        <line-title
          :subtitle="about.meta.contact.title"
          lineColorClass="bg-red"
        />
      </div>
      <p class="leading-7 text-lg whitespace-pre-line">
          {{ about.meta.contact.address }}
      </p>
      <div class="flex flex-col gap-1 pb-16">
        <div>
          <a href="mailto:info@corelation.ch" class="text-lg underline text-blue-400">E-Mail</a>
        </div>
        <div>
          <a href="tel:+41798324347" class="text-lg underline text-blue-400">Telefon</a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import heroImage from '@/assets/images/about/hero.jpg'
import katjaImg from '@/assets/images/about/katja.png'
import catrinImg from '@/assets/images/about/catrin.png'
import benImg from '@/assets/images/about/ben.jpg'

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
      ben: Person
    }
    network: {
      title: string
      text: string
    }
    contact: {
      title: string
      address: string
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