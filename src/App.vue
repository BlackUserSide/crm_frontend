<script lang="ts" setup></script>
<template>
  <RouterView v-slot="{ Component }">
    <Transition name="fade-slow" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>

<style lang="scss">
  @import "./styles/";
</style>
