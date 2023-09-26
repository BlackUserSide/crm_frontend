<script lang="ts" setup>
import { computed, Ref, ref } from "vue-demi";
import { useUserSession } from "/@src/stores/userSession";

const userSession = useUserSession();
</script>

<template>
  <div class="table">
    <div class="table-container"><DomainsMainTable /></div>
    <div class="table-container"><DomainsSecondTable /></div>
  </div>
</template>

<style lang="scss">
.first-section-domain {
  display: flex;
  justify-content: space-between;
}
@media (max-width: 1200px) {
  .first-section-domain {
    flex-direction: column;
    align-items: center;
  }
}
</style>
