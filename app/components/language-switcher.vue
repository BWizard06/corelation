<template>
  <div
    class="flex items-center gap-1.5 text-sm font-medium"
    :class="variant === 'mobile' ? 'text-white/60' : 'text-light-grey'"
  >
    <template v-for="(loc, i) in availableLocales" :key="loc.code">
      <span v-if="i > 0" aria-hidden="true">/</span>
      <span
        v-if="loc.code === locale"
        class="text-red"
        :aria-current="true"
      >
        {{ loc.code.toUpperCase() }}
      </span>
      <NuxtLink
        v-else
        :to="switchLocalePath(loc.code)"
        class="transition-colors"
        :class="variant === 'mobile' ? 'text-white/80 hover:text-red' : 'text-dark-grey hover:text-black'"
        :aria-label="`Switch language to ${loc.name}`"
      >
        {{ loc.code.toUpperCase() }}
      </NuxtLink>
    </template>
  </div>
</template>

<script setup lang="ts">
withDefaults(
  defineProps<{ variant?: 'desktop' | 'mobile' }>(),
  { variant: 'desktop' }
)

const { locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()

const availableLocales = computed(() =>
  locales.value.map(l => (typeof l === 'string' ? { code: l, name: l } : l))
)
</script>
