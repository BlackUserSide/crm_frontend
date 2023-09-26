<script lang="ts" setup>
import { ref, watch } from "vue-demi";
import { useFilter } from "/@src/stores/filter";

const filterStore = useFilter();
const selectModal = ref("");
const active_filter = ref(filterStore.select_filter?.includes("calendar"));
if (active_filter.value) {
  selectModal.value = filterStore.active_periud;
}
watch(selectModal, () => {
  console.log(selectModal.value, "range data");

  filterStore.setData(selectModal.value);
  filterStore.active_periud = selectModal.value;
  filterStore.clearFilter();
  filterStore.select_filter?.push("calendar");
});
</script>

<template>
  <h3 class="filter-block__title">
    <svg>
      <use href="/src/assets/vue.svg#calendar"></use>
    </svg>

    <span>Date</span>
  </h3>

  <div class="filter-block__filter">
    <div id="calendar-block">
      <DataPicker v-model="selectModal" />
    </div>
  </div>
</template>
