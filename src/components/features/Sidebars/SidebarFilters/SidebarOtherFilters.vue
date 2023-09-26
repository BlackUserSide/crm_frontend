<script lang="ts" setup>
import { computed, Ref, ref } from "vue-demi";
import { useRouter } from "vue-router";
import { useUserSession } from "/@src/stores/userSession";
import { useFilter } from "/@src/stores/filter";

const currentRouteHandler = computed(() => {
  const currentRoute = router.currentRoute.value.fullPath.split("/");

  return currentRoute[2] ? currentRoute[2] : "";
});

const activeRoute: Ref<string> = ref(currentRouteHandler);
const router = useRouter();
const userStore = useUserSession();
const getRole = computed(() => userStore.role);
const roleUser = ref(getRole);

const filterStore = useFilter();
const getActiveFilter = computed(() => filterStore.select_filter);
const activeFilter = ref(getActiveFilter);

function setFilter(filter: string) {
  filterStore.setActiveFilterWrap(filter, currentRouteHandler.value);
}
</script>

<template>
  <ul class="sidebar__list sidebar__list--other-filters">
    <li
      class="sidebar__item"
      :class="activeFilter?.includes('calendar') && 'sidebar__item--active'"
      @click="setFilter('calendar')"
    >
      <svg>
        <use href="/src/assets/vue.svg#calendar"></use>
      </svg>

      <span>Calendar</span>

      <div class="active-filter-wrapper">
        <!-- <DataPicker /> -->
      </div>
    </li>

    <li
      class="sidebar__item"
      :class="activeFilter?.includes('bayer') && 'sidebar__item--active'"
      v-if="roleUser !== 'user'"
      @click="setFilter('bayer')"
    >
      <svg>
        <use href="/src/assets/vue.svg#bayer"></use>
      </svg>

      <span>Buyer</span>
    </li>

    <li
      class="sidebar__item"
      :class="activeFilter?.includes('product') && 'sidebar__item--active'"
      v-if="
        activeRoute === '' ||
        activeRoute === 'income' ||
        activeRoute === 'conversation'
      "
      @click="setFilter('product')"
    >
      <svg>
        <use href="/src/assets/vue.svg#product"></use>
      </svg>

      <span>Product</span>
    </li>

    <li
      class="sidebar__item"
      :class="activeFilter?.includes('partner') && 'sidebar__item--active'"
      v-if="
        roleUser !== 'user' &&
        (activeRoute === '' ||
          activeRoute === 'income' ||
          activeRoute === 'conversation')
      "
      @click="setFilter('partner')"
    >
      <!-- <svg>
        <use href="/src/assets/vue.svg#product"></use>
      </svg> -->

      <span>Partner</span>
    </li>
    <li
      class="sidebar__item"
      :class="activeFilter?.includes('status') && 'sidebar__item--active'"
      v-if="activeRoute === ''"
      @click="setFilter('status')"
    >
      <svg>
        <use href="/src/assets/vue.svg#status"></use>
      </svg>

      <span>Status</span>
    </li>

    <li
      class="sidebar__item"
      :class="activeFilter?.includes('link') && 'sidebar__item--active'"
      v-if="activeRoute === '' || activeRoute === 'income'"
      @click="setFilter('link')"
    >
      <svg>
        <use href="/src/assets/vue.svg#link"></use>
      </svg>

      <span>Link</span>
    </li>
    <li
      class="sidebar__item"
      :class="activeFilter?.includes('sub_id') && 'sidebar__item--active'"
      v-if="activeRoute === '' || activeRoute === 'income'"
      @click="setFilter('sub_id')"
    >
      <!-- <svg>
        <use href="/src/assets/vue.svg#link"></use>
      </svg> -->

      <span>Sub ID</span>
    </li>
    <li
      class="sidebar__item"
      :class="activeFilter?.includes('utm_medium') && 'sidebar__item--active'"
      v-if="roleUser !== 'admin' && activeRoute === ''"
      @click="setFilter('utm_medium')"
    >
      <!-- <svg>
        <use href="/src/assets/vue.svg#link"></use>
      </svg> -->

      <span>Utm Medium</span>
    </li>
    <li
      class="sidebar__item"
      :class="activeFilter?.includes('utm_campaign') && 'sidebar__item--active'"
      v-if="roleUser !== 'admin' && activeRoute === ''"
      @click="setFilter('utm_campaign')"
    >
      <!-- <svg>
        <use href="/src/assets/vue.svg#link"></use>
      </svg> -->

      <span>Utm Campaign</span>
    </li>
  </ul>
</template>
