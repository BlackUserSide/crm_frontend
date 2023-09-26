<script lang="ts" setup>
import { computed, ref, Ref } from "vue-demi";
import DashboardTableUser from "../../features/Tables/Dashboard/DashboardTableUser.vue";
import { useUserSession } from "/@src/stores/userSession";

const userSession = useUserSession();

const getRole = computed(() => {
  return userSession.role;
});

const roleUser: Ref<string> = ref(getRole);
</script>

<template>
  <div>
    <DashboardStatistic />
    <DashboardMainTable v-if="roleUser !== 'user'" />
    <DashboardTableUser v-else />
  </div>
</template>
