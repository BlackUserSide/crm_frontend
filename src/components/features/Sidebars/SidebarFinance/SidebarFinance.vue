<script lang="ts" setup>
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
const getRole = computed(() => userStore.role);
const roleUser = ref(getRole);

function routerHandler(path: any) {
  console.log(path);

  router.push(`/app/${path}`);
}

onBeforeMount(() => {
  userStore.getDataUser();
});
</script>

<template>
  <ul
    class="sidebar__list sidebar__list--integration sidebar__list--accordion-content"
  >
    <li
      class="sidebar__item"
      :class="activeRoute === 'billing' && 'sidebar__item--active'"
      @click="routerHandler('billing')"
    >
      <svg>
        <use href="/src/assets/vue.svg#billing"></use>
      </svg>

      <span>Billing</span>
    </li>

    <li
      class="sidebar__item"
      :class="activeRoute === 'income' && 'sidebar__item--active'"
      @click="routerHandler('income')"
    >
      <span>Income</span>
    </li>
  </ul>
</template>
