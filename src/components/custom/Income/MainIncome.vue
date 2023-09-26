<script lang="ts" setup>
import { computed, Ref, ref } from "vue-demi";
import { useUserSession } from "/@src/stores/userSession";
const userSession = useUserSession();

const getRole = computed(() => {
  return userSession.role;
});

const role: Ref<string> = ref(getRole);
</script>

<template>
  <IncomeTable v-if="role === 'admin'" />
  <IncomeUserTable v-else />
  <IncomeShowcaseTable v-if="role === 'admin'" />
  <IncomeShowcaseUserTable v-else />
</template>
