<script lang="ts" setup>
import { ref } from "vue-demi";
import { useFilter } from "/@src/stores/filter";

const inputValue = ref("");

function clearInput() {
  inputValue.value = "";
}

const filterStore = useFilter();

function sendInput() {
  filterStore.setUserId(+inputValue.value);
}
</script>

<template>
  <h3 class="filter-block__title">
    <svg>
      <use href="/src/assets/vue.svg#client"></use>
    </svg>

    <span>Id Баера</span>
  </h3>

  <div class="filter-block__filter">
    <div class="filter-block__input">
      <input 
        class="input" 
        v-model="inputValue" 
        type="text" 
        placeholder="Id клиента" 
      />
    </div>

    <div v-if="inputValue.length > 0" class="filter-block__filter-buttons">
      <div class="button button--black">
        <button @click="clearInput">Очистить</button>
      </div>

      <div class="button button--black">
        <button @click="sendInput">Отправить</button>
      </div>
    </div>
  </div>
</template>