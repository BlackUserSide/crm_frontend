<script lang="ts" setup>
import { ref } from "vue-demi";
import { useFilter } from "/@src/stores/filter";

const inputValue = ref("");
const filterStore = useFilter();
function clearInput() {
  inputValue.value = "";
}
const active_filter = filterStore.select_filter?.includes("link");
if (active_filter) {
  inputValue.value = filterStore.dataFilter.domain;
}
function sendInput() {
  filterStore.select_filter?.push("link");
  filterStore.filterBayer("domain", inputValue.value);
  filterStore.clearFilter();
}
</script>

<template>
  <h3 class="filter-block__title">
    <svg>
      <use href="/src/assets/vue.svg#link"></use>
    </svg>

    <span>Link</span>
  </h3>

  <div class="filter-block__filter">
    <div class="filter-block__input">
      <input
        class="input"
        v-model="inputValue"
        type="text"
        placeholder="Link"
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
