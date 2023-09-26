<script lang="ts" setup>
import { computed, ref, watch } from "vue-demi";
import { useBilling } from "/@src/stores/billing";
import { useFilter } from "/@src/stores/filter";

const dataBilling = useBilling();
dataBilling.getDataBillingUser();
const filterStore = useFilter();

const getUser = computed(() => {
  return dataBilling.billingUser;
});

const data = ref(getUser);

function changeActive(name: string) {
  const newArr = data.value.map((e) => {
    if (e.login === name) {
      e.active = !e.active;
      return e;
    }
    return e;
  });
  data.id = newArr;
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
    filterStore.select_filter?.filter((e) => (e === "bayer" ? false : true));
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
  const active_filter = ref(filterStore.select_filter?.includes("bayer"));

  if (active_filter.value) {
    filterStore.dataFilter.user_id.map((e: any) => changeActiveFilter(e));
  }
}, 100);
function sendAllFilter() {
  const filterdArray: any[] = [];
  data.value.forEach((e) => {
    if (e.active) {
      filterdArray.push(e.id);
    }
  });
  filterStore.select_filter?.push("bayer");
  filterStore.clearFilter();
  filterStore.filterBayer("user_id", filterdArray);
}
</script>

<template>
  <h3 class="filter-block__title">
    <svg>
      <use href="/src/assets/vue.svg#bayer--single"></use>
    </svg>

    <span>User</span>
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
          @click="changeActive(item.login)"
        >
          <svg>
            <use
              v-if="item.active"
              href="/src/assets/vue.svg#dot--active"
            ></use>
            <use v-else href="/src/assets/vue.svg#dot--default"></use>
          </svg>

          <span>{{ item.login }}</span>
        </div>
      </div>
    </div>

    <div class="button button--black">
      <button @click="sendAllFilter">Отправить</button>
    </div>
  </div>
</template>
