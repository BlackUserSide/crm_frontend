<script lang="ts" setup>
import { log } from "console";
import { onBeforeUnmount, watchEffect } from "vue-demi";
import { useNotyf } from "/@src/composable/useNotyf";

import { useTitle } from "/@src/composable/useTitle";
import { useDashboard } from "/@src/stores/dashboard";
import { useFilter } from "/@src/stores/filter";

const dashboardStore = useDashboard();
// const { socket } = dashboardStore.socket;
const notyf = useNotyf();
const filter = useFilter();
const activeFilter = filter.timeFilterActive;

// socket.on("get_lead", (data) => {
//   if (data.method === "new") {
//     notyf.success("У Вас новый лид");
//   }
//   dashboardStore.setDataSocket(data);
// });

// socket.on("new_statistic", (data) => {
//   dashboardStore.setStat(data);
// });

watchEffect(() => {
  useTitle("Main page | Spectrum Traffic");
});
</script>

<template>
  <div>
    <Dashboard />
  </div>
</template>
