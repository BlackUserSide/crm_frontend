<script lang="ts" setup>
import { watchEffect } from "vue-demi";
import { useTitle } from "/@src/composable/useTitle";

watchEffect(() => {
  useTitle("Conversation | Spectrum Traffic");
});
</script>

<template>
  <MainConversations />
</template>
