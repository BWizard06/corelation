<template>
  <div class="w-full h-full flex items-center justify-center flex-col gap-4">
    <div>
      <h1>{{ $t("hello") }}</h1>
    </div>

    <button v-for="locale in locales" @click="setLocale(locale.code)">
      {{ locale.name }}
    </button>
    <nuxt-link-locale to="/services/corporate">
      Corporate
    </nuxt-link-locale>
    <nuxt-link-locale to="/services/marketing">
      Marketing
    </nuxt-link-locale>
    <nuxt-link-locale to="/services/change">
      Change
    </nuxt-link-locale>
  </div>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()
console.log(locales)

</script>
