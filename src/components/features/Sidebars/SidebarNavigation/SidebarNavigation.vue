<script lang="ts" setup>
import { watch } from "fs";
import { computed, onBeforeMount, Ref, ref } from "vue-demi";
import { useRouter } from "vue-router";
import { useUserSession } from "/@src/stores/userSession";
const currentRouteHandler = computed(() => {
  const currentRoute = router.currentRoute.value.fullPath.split("/");
  return currentRoute[2] ? currentRoute[2] : "";
});
const activeRoute: Ref<string> = ref(currentRouteHandler);
const router = useRouter();
const userStore = useUserSession();
const isFinanceAccordion = ref(false);
const isIntegrationAccordion = ref(false);
const getRole = computed(() => userStore.role);
const roleUser = ref(getRole);
function routerHandler(path: any) {
  router.replace(`/app/${path}`);
}

function financeAccordionHandler() {
  if (isFinanceAccordion.value) {
    isFinanceAccordion.value = false;
    return;
  }

  isFinanceAccordion.value = true;
}

function integrationAccordionHandler() {
  if (isIntegrationAccordion.value) {
    isIntegrationAccordion.value = false;
    return;
  }

  isIntegrationAccordion.value = true;
}

onBeforeMount(() => {
  userStore.getDataUser();
});
function logOut() {
  userStore.logOutUser();
}
</script>

<template>
  <ul class="sidebar__list sidebar__list--navigation">
    <li
      class="sidebar__item"
      :class="activeRoute === '' && 'sidebar__item--active'"
      @click="routerHandler('')"
    >
      <svg>
        <use href="/src/assets/vue.svg#dashboard"></use>
      </svg>

      <span>Dashboard</span>
    </li>

    <li
      class="sidebar__item"
      :class="activeRoute === 'conversation' && 'sidebar__item--active'"
      @click="routerHandler('conversation')"
    >
      <svg>
        <use href="/src/assets/vue.svg#conversation"></use>
      </svg>

      <span>Conversation</span>
    </li>

    <li
      v-if="roleUser === 'admin'"
      class="sidebar__item"
      :class="activeRoute === 'domain' && 'sidebar__item--active'"
      @click="routerHandler('domain')"
    >
      <svg>
        <use href="/src/assets/vue.svg#domain"></use>
      </svg>

      <span>{{ "Domain" }}</span>
    </li>
    <li
      v-if="roleUser !== 'admin'"
      class="sidebar__item"
      :class="activeRoute === 'stream' && 'sidebar__item--active'"
      @click="routerHandler('stream')"
    >
      <svg>
        <use href="/src/assets/vue.svg#domain"></use>
      </svg>

      <span>{{ "Stream" }}</span>
    </li>

    <li
      class="sidebar__item--accordion"
      :class="isFinanceAccordion && 'desktop-sidebar__block--accordion-active'"
    >
      <span class="span" @click="financeAccordionHandler">Finance</span>

      <SidebarFinance v-if="isFinanceAccordion" />
    </li>
    <li
      v-if="roleUser !== 'user'"
      class="sidebar__item--accordion"
      :class="
        isIntegrationAccordion && 'desktop-sidebar__block--accordion-active'
      "
    >
      <span class="span" @click="integrationAccordionHandler">Integration</span>

      <SidebarIntegration v-if="isIntegrationAccordion" />
    </li>
    <!-- <li
       :class="activeRoute === 'billing' && 'sidebar__item--active'"
      @click="routerHandler('billing')"




      class="sidebar__item"
      :class="activeRoute === 'income' && 'sidebar__item--active'"
      @click="routerHandler('income')"
    >
      <span>Income</span>
    </li>
    <li class="sidebar__item" @click="routerHandler('settings')">
      <svg>
        <use href="/src/assets/vue.svg#settings"></use>
      </svg>

      <span>Settings</span>
    </li> -->

    <li class="sidebar__item" @click="logOut">
      <svg>
        <use href="/src/assets/vue.svg#logout"></use>
      </svg>

      <span>Logout</span>
    </li>
  </ul>
</template>

=
