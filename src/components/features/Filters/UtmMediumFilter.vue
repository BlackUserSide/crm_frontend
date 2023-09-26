<script lang="ts" setup>
import { ref } from "vue-demi";
import { useFilter } from "/@src/stores/filter";

const inputValue = ref("");
const filterStore = useFilter();
function clearInput() {
  inputValue.value = "";
}
const active_filter = filterStore.select_filter?.includes("utm_medium");
if (active_filter) {
  inputValue.value = filterStore.dataFilter.utm_medium;
}
function sendInput() {
  filterStore.select_filter?.push("utm_medium");
  filterStore.filterBayer("utm_medium", inputValue.value);
  filterStore.clearFilter();
}
</script>

<template>
  <h3 class="filter-block__title">
    <svg>
      <use href="/src/assets/vue.svg#link"></use>
    </svg>

    <span>Utm Medium</span>
  </h3>

  <div class="filter-block__filter">
    <div class="filter-block__input">
      <input
        class="input"
        v-model="inputValue"
        type="text"
        placeholder="Utm Medium"
      />
    </div>

    <div class="filter-block__filter-buttons" v-if="inputValue.length > 0">
      <div class="button button--black">
        <button @click="sendInput">Отправить</button>
      </div>

      <div class="button button--black">
        <button @click="clearInput">Очистить</button>
      </div>
    </div>
  </div>
</template>
