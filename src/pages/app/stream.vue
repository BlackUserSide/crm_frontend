<script lang="ts" setup>
import { watchEffect } from "vue-demi";
import { useTitle } from "/@src/composable/useTitle";

watchEffect(() => {
  useTitle("Stream | Spectrum Traffic");
});
</script>

<template>
  <MainStream />
</template>
