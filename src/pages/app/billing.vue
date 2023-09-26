<script lang="ts" setup>
import { watchEffect } from "vue-demi";
import { useTitle } from "/@src/composable/useTitle";

watchEffect(() => {
  useTitle("Billing | Spectrum Traffic");
});
</script>

<template>
  <MainBilling />
</template>
