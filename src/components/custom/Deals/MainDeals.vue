<script lang="ts" setup>
import { computed, Ref, ref, watch } from "vue-demi";
import { useUserSession } from "/@src/stores/userSession";

const userSession = useUserSession();
const getRole = computed(() => {
  return userSession.role;
});
const roleUser: Ref<string> = ref(getRole);
</script>
<template>
  <div>
    <DealsTable />
  </div>
</template>
