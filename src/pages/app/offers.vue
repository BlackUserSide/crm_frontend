<script lang="ts" setup>
import { watchEffect } from "vue-demi";
import { useTitle } from "/@src/composable/useTitle";

watchEffect(() => {
  useTitle("Offers | Spectrum Traffic");
});
</script>

<template>
  <MainOffers />
</template>
