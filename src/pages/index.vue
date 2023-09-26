<script lang="ts" setup>
import { watchEffect } from "vue-demi";
import { useTitle } from "/@src/composable/useTitle";

watchEffect(() => {
  useTitle("Main Login");
});
</script>

<template>
  <div class="container">
    <div class="form-page">
      <LoginComponent />
    </div>
  </div>
</template>