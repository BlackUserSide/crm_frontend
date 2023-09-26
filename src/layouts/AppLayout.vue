<script lang="ts" setup>
import { computed, ref } from "vue-demi";
import { useFilter } from "../stores/filter";

const filterStore = useFilter();
const getActiveFilter = computed(() => filterStore.activeFilter);
const activeFilter = ref(getActiveFilter);
</script>

<template>
  <main class="page-template">
    <div class="page-template__body">
      <DesktopSidebar />
      <MobileSidebar />
      <div class="page-template__content">
        <slot></slot>
      </div>
      <MainFilter v-if="activeFilter" />
    </div>
  </main>
</template>