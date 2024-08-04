<template>
  <router-view v-slot="{ Component }">
    <component :is="Component" v-if="!$route.meta.keepAlive" />
    <keep-alive>
      <component :is="Component" v-if="$route.meta.keepAlive" />
    </keep-alive>
  </router-view>
</template>

<style lang="scss">
@import "@/styles/main";
</style>
