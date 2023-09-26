<script lang="ts" setup>
import { ref, watch } from "vue-demi";
// interface IProps {
//   isRange: boolean;
// }
// const props = defineProps<IProps>();
// const isRange = ref(props.isRange);
// console.log(isRange.value, props.isRange);
const test = ref("");
watch(test, () => {
  test.value = "2023-08-02 23:20:23";
});
console.log(test.value);
</script>
<template>
  <VDatePicker v-model="test" color="blue" is-dark />
</template>
