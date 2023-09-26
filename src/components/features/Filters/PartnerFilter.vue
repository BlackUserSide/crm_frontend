<script lang="ts" setup>
import { computed, ref, watch } from "vue-demi";
import { useFilter } from "/@src/stores/filter";
import { usePartner } from "/@src/stores/partner";

const dataPartner = usePartner();
dataPartner.getAllPartner();
const filterStore = useFilter();

const getPartner = computed(() => {
  return dataPartner.all_partner;
});
const data = ref(getPartner);

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

function changeActiveFilter(name: string) {
  const newArr = data.value.map((e) => {
    if (e.name === name) {
      e.active = true;
      return e;
    }
    return e;
  });
  data.value = newArr;
}

setTimeout(() => {
  const active_filter = ref(filterStore.select_filter?.includes("partner"));

  if (active_filter.value) {
    filterStore.dataFilter.partner.map((e: any) => changeActiveFilter(e));
  }
}, 100);

function changeAllActive(method: boolean) {
  const newArr = data.value.map((e) => {
    e.active = method;
    return e;
  });
  if (method) data.value = newArr;
  else {
    data.value = [];
    filterStore.clearFilter();
    filterStore.select_filter?.filter((e) => (e === "partner" ? false : true));
  }
}

function sendAllFilter() {
  const filterdArray: any[] = [];
  data.value.forEach((e) => {
    if (e.active) {
      filterdArray.push(e.name);
    }
  });

  filterStore.select_filter?.push("partner");
  filterStore.clearFilter();
  filterStore.filterBayer("partner", filterdArray);
}
</script>

<template>
  <h3 class="filter-block__title">
    <svg>
      <use href="/src/assets/vue.svg#bayer--single"></use>
    </svg>

    <span>Partner</span>
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
      <button @click="sendAllFilter">Отправить</button>
    </div>
  </div>
</template>
