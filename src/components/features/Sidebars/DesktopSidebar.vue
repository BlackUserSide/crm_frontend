<script lang="ts" setup>
import { computed, Ref, ref } from "vue-demi";
import { useRouter } from "vue-router";

const currentRouteHandler = computed(() => {
  const currentRoute = router.currentRoute.value.fullPath.split("/");

  return currentRoute[2] ? currentRoute[2] : "";
});

const activeRoute: Ref<string> = ref(currentRouteHandler);
const router = useRouter();
</script>

<template>
  <div class="desktop-sidebar">
    <div class="desktop-sidebar__body">
      <UserProfile />

      <div class="desktop-sidebar__block">
        <h3 class="desktop-sidebar__block-title">Navigation</h3>
        <SidebarNavigation />
      </div>

      <div
        class="desktop-sidebar__block"
        v-if="activeRoute === '' || activeRoute === 'conversation'"
      >
        <h3 class="desktop-sidebar__block-title">Period Filter</h3>

        <SidebarPeriodFilters />
      </div>

      <div class="desktop-sidebar__block">
        <h3 class="desktop-sidebar__block-title">Other Filters</h3>

        <SidebarOtherFilters />
      </div>
    </div>
  </div>
</template>
