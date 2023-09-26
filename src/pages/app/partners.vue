<script lang="ts" setup>
import { watchEffect } from "vue-demi";
import { useTitle } from "/@src/composable/useTitle";

watchEffect(() => {
  useTitle("Partners | Spectrum Traffic");
});
</script>

<template>
  <MainPartners />
</template>
