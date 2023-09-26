<script lang="ts" setup>
import { watchEffect } from "vue-demi";
import { useTitle } from "/@src/composable/useTitle";

watchEffect(() => {
  useTitle("Domains | Spectrum Traffic");
});
</script>

<template>
  <MainDomains />
</template>
