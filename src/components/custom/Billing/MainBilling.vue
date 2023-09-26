<script lang="ts" setup>
import { computed, Ref, ref } from "vue-demi";
import { useUserSession } from "/@src/stores/userSession";

const userSession = useUserSession();

const getRole = computed(() => {
  return userSession.role;
});

const roleUser: Ref<number> = ref(getRole);
</script>

<template>
  <div>
    <div v-if="roleUser !== 'user'">
      <BillingStatistic />
      <BillingMainTable />
      <BillingHistoryTable />
      <BillingExpensesTable />
    </div>

    <div v-else>
      <BillingUserStatistic />
      <BillingUserTable />
      <BillingExpenseUserTable />
    </div>
  </div>
</template>
