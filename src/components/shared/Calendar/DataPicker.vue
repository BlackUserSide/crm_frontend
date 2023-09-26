<script lang="ts" setup>
import { ref, watch, onMounted } from "vue-demi";
import { useFilter } from "/@src/stores/filter";
const filterStore = useFilter();
const myDatePicker = ref(null);
watch(myDatePicker, () => {
  myDatePicker.value = new Date(2023, 9, 1);
});
const test = ref({ start: new Date(2023, 8, 1), end: new Date(2023, 8, 5) });

console.log("🚀 ~ file: DataPicker.vue:6 ~ test:", test.value);
</script>
<template>
  <VDatePicker
    ref="myDatePicker"
    :default-value="today"
    v-model="test"
    color="blue"
    mode="date"
    is-dark
    is-range
  />
</template>
