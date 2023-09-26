<script lang="ts" setup>
import { computed, ref } from "vue-demi";
import { useFilter } from "/@src/stores/filter";
import { useStatus } from "/@src/stores/status";

const dataStatus = useStatus();
dataStatus.getAllStatus();
const filterStore = useFilter();

const getOffer = computed(() => {
  return dataStatus.filter;
});

const data = ref(getOffer);

function changeActive(name: string) {
  const newArr = data.value.map((e) => {
    if (e.name === name) {
      e.active = !e.active;

      return e;
    }
    return e;
  });
  data.value = newArr;
}

function changeAllActive(method: boolean) {
  const newArr = data.value.map((e) => {
    e.active = method;
    return e;
  });
  if (method) data.id = newArr;
  else {
    data.id = [];
    filterStore.clearFilter();
    filterStore.select_filter?.filter((e) => (e === "status" ? false : true));
  }
}
function changeActiveFilter(id: string) {
  const newArr = data.value.map((e) => {
    if (e.id == id) {
      e.active = true;
      return e;
    }
    return e;
  });
  data.value = newArr;
}
setTimeout(() => {
  const active_filter = ref(filterStore.select_filter?.includes("status"));

  if (active_filter.value) {
    filterStore.dataFilter.status_id.map((e: any) => changeActiveFilter(e));
  }
}, 50);
function sendAllFilter() {
  const filterdArray: any[] = [];
  data.value.forEach((e) => {
    if (e.active) {
      filterdArray.push(e.id);
    }
  });
  filterStore.select_filter?.push("status");
  filterStore.clearFilter();
  filterStore.filterBayer("status_id", filterdArray);
}
</script>

<template>
  <h3 class="filter-block__title">
    <svg>
      <use href="/src/assets/vue.svg#bayer--single"></use>
    </svg>

    <span>Status</span>
  </h3>

  <div class="filter-block__filter">
    <div class="filter-block__filter-buttons">
      <div class="button button--black">
        <button @click="changeAllActive(true)">Select All</button>
      </div>

      <div class="button button--black">
        <button @click="changeAllActive(false)">Clear</button>
      </div>
    </div>

    <div class="filter-block__filter-content">
      <div class="filter-block__filter-list">
        <div
          class="filter-block__filter-item"
          v-for="(item, index) in data"
          :key="index"
          @click="changeActive(item.name)"
        >
          <svg>
            <use
              v-if="item.active"
              href="/src/assets/vue.svg#dot--active"
            ></use>
            <use v-else href="/src/assets/vue.svg#dot--default"></use>
          </svg>

          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>

    <div class="button button--black">
      <button @click="sendAllFilter">Submit</button>
    </div>
  </div>
</template>
