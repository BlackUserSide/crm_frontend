<script lang="ts" setup>
import { watchEffect } from "vue-demi";
import { useTitle } from "/@src/composable/useTitle";

watchEffect(() => {
  useTitle("Income | Spectrum Traffic");
});
</script>

<template>
  <MainIncome />
</template>
