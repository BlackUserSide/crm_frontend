<script lang="ts" setup>
import { computed, onBeforeMount, ref } from "vue-demi";
import { useRouter } from "vue-router";
import { useUserSession } from "/@src/stores/userSession";
import { useFilter } from "/@src/stores/filter";
import { useMoment } from "/@src/composable/useMoment";

const currentRouteHandler = computed(() => {
  const currentRoute = router.currentRoute.value.fullPath.split("/");
  return currentRoute[2] ? currentRoute[2] : "";
});
const router = useRouter();
const filterStore = useFilter();
const getActiveTimeFilter = computed(() => {
  const router = currentRouteHandler.value ? currentRouteHandler.value : "app";

  if (filterStore.period_router !== router)
    filterStore.current_period = "today";

  return filterStore.current_period;
});
const activeTimeFilter = ref(getActiveTimeFilter);
function setTimeFilter(filter: any, period: string) {
  console.log(period, "period");

  filterStore.setPeriod(period);
  filterStore.setActiveFilter(filter, currentRouteHandler.value);
}
</script>

<template>
  <ul class="sidebar__list sidebar__list--period-filters">
    <li
      class="sidebar__item"
      :class="activeTimeFilter === 'today' && 'sidebar__item--active'"
      @click="setTimeFilter(useMoment('', 'today'), 'today')"
    >
      <svg>
        <use href="/src/assets/vue.svg#today"></use>
      </svg>

      <span>Today</span>
    </li>

    <li
      class="sidebar__item"
      :class="activeTimeFilter === 'yesterday' && 'sidebar__item--active'"
      @click="setTimeFilter(useMoment('', 'yesterday'), 'yesterday')"
    >
      <svg>
        <use href="/src/assets/vue.svg#yesterday"></use>
      </svg>

      <span>Yesterday</span>
    </li>

    <li
      class="sidebar__item"
      :class="activeTimeFilter === 'week' && 'sidebar__item--active'"
      @click="setTimeFilter(useMoment('', 'week'), 'week')"
    >
      <svg>
        <use href="/src/assets/vue.svg#week"></use>
      </svg>

      <span>Last Week</span>
    </li>

    <li
      class="sidebar__item"
      :class="activeTimeFilter === 'mounth' && 'sidebar__item--active'"
      @click="setTimeFilter(useMoment('', 'mounth'), 'mounth')"
    >
      <svg>
        <use href="/src/assets/vue.svg#month"></use>
      </svg>

      <span>Last Mounth</span>
    </li>
  </ul>
</template>
