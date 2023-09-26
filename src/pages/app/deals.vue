<script lang="ts" setup>
import { watchEffect } from "vue-demi";
import { useTitle } from "/@src/composable/useTitle";

watchEffect(() => {
  useTitle("Deals | Spectrum Traffic");
});
</script>

<template>
  <MainDeals />
</template>
