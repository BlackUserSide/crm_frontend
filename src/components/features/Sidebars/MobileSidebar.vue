<script lang="ts" setup>
import { log } from "console";
import { Ref, ref, computed } from "vue-demi";
import { useRouter } from "vue-router";
const activeLayout: Ref<string> | Ref<null> = ref(null);
const router = useRouter();
const currentRouteHandler = computed(() => {
  const currentRoute = router.currentRoute.value.fullPath.split("/");
  return currentRoute[2] ? currentRoute[2] : "";
});
const activeRoute: Ref<string> = ref(currentRouteHandler);

function handlerActive(trigger: string) {
  if (activeLayout.value === trigger) {
    activeLayout.value = null;
    return;
  }
  activeLayout.value = trigger;
}
function routerHandler(path: any) {
  activeLayout.value = null;
  router.push(`/app/${path}`);
}
</script>

<template>
  <div>
    <div class="mobile-tabs">
      <nav class="mobile-tabs__body">
        <div 
        class="mobile-tabs__tab"
        :class="activeLayout === 'navbar' && 'mobile-tabs__tab--active'"
        @click="handlerActive('navbar')"
        >
          <div class="mobile-tabs__tab-body">
            <svg class="mobile-tabs__tab-pill">
              <use href="/src/assets/vue.svg#tab-pill"></use>
            </svg>

            <svg class="mobile-tabs__tab-icon">
              <use href="/src/assets/vue.svg#navigation"></use>
            </svg>

            <span>Navigation</span>
          </div>
        </div>

        <div 
          class="mobile-tabs__tab" 
          :class="activeRoute === '' && 'mobile-tabs__tab--active'"
          @click="routerHandler('')"
        >
          <div class="mobile-tabs__tab-body">
            <svg class="mobile-tabs__tab-pill">
              <use href="/src/assets/vue.svg#tab-pill"></use>
            </svg>

            <svg class="mobile-tabs__tab-icon">
              <use href="/src/assets/vue.svg#dashboard"></use>
            </svg>

            <span>Dashboard</span>
          </div>
        </div>

        <div 
          class="mobile-tabs__tab" 
          :class="activeLayout === 'filter' && 'mobile-tabs__tab--active'"
          @click="handlerActive('filter')"
        >
          <div class="mobile-tabs__tab-body">
            <svg class="mobile-tabs__tab-pill">
              <use href="/src/assets/vue.svg#tab-pill"></use>
            </svg>

            <svg class="mobile-tabs__tab-icon">
              <use href="/src/assets/vue.svg#filter"></use>
            </svg>

            <span>Filter</span>
          </div>
        </div>

        <div 
        class="mobile-tabs__tab" 
        :class="activeRoute === 'conversation' && 'mobile-tabs__tab--active'"
        @click="routerHandler('conversation')"
        >
          <div class="mobile-tabs__tab-body">
            <svg class="mobile-tabs__tab-pill">
              <use href="/src/assets/vue.svg#tab-pill"></use>
            </svg>
            
            <svg class="mobile-tabs__tab-icon">
              <use href="/src/assets/vue.svg#conversation"></use>
            </svg>

            <span>Conversation</span>
          </div>
        </div>

        <div 
          class="mobile-tabs__tab" 
          :class="activeRoute === 'billing' && 'mobile-tabs__tab--active'"
          @click="routerHandler('billing')"
        >
          <div class="mobile-tabs__tab-body">
            <svg class="mobile-tabs__tab-pill">
              <use href="/src/assets/vue.svg#tab-pill"></use>
            </svg>

            <svg class="mobile-tabs__tab-icon">
              <use href="/src/assets/vue.svg#billing"></use>
            </svg>

            <span>Billing</span>
          </div>
        </div>
      </nav>
    </div>

    <div
      class="mobile-sidebar"
      :class="activeLayout && 'mobile-sidebar--active'"
    >
      <UserProfile />
      <SidebarNavigation
        v-if="activeLayout === 'navbar'"
        @return="routerHandler"
      />
      <div v-if="activeLayout === 'filter'">
        <SidebarPeriodFilters />
        <SidebarOtherFilters />
      </div>
    </div>
  </div>
</template>
