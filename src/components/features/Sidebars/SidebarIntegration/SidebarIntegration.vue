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
      :class="activeRoute === 'partners' && 'sidebar__item--active'"
      v-if="roleUser !== 'user'"
      @click="routerHandler('partners')"
    >
      <svg>
        <use href="/src/assets/vue.svg#partner"></use>
      </svg>

      <span>Partners</span>
    </li>

    <li
      class="sidebar__item"
      :class="activeRoute === 'deals' && 'sidebar__item--active'"
      v-if="roleUser !== 'user'"
      @click="routerHandler('deals')"
    >
      <svg>
        <use href="/src/assets/vue.svg#deal"></use>
      </svg>

      <span>Deals</span>
    </li>

    <li
      class="sidebar__item"
      :class="activeRoute === 'offers' && 'sidebar__item--active'"
      v-if="roleUser !== 'user'"
      @click="routerHandler('offers')"
    >
      <svg>
        <use href="/src/assets/vue.svg#offer"></use>
      </svg>

      <span>Offers</span>
    </li>
  </ul>
</template>
