<script setup lang="ts">
import { useRoute } from "vue-router";

const route = useRoute();
</script>

<template>
  <AppLayout>
    <RouterView v-slot="{ Component }">
      <Transition name="fade-fast" mode="out-in">
        <div><component :is="Component" :key="route.fullPath" /></div>
      </Transition>
    </RouterView>
  </AppLayout>
</template>
