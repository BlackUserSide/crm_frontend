<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue-demi";
import { useNotyf } from "/@src/composable/useNotyf";
import { useBilling } from "/@src/stores/billing";
import { useDashboard } from "/@src/stores/dashboard";
import { useDomains } from "/@src/stores/domain";

const domainStore = useDomains();
const dataBilling = useBilling();
dataBilling.getDataBillingUser();
domainStore.getCountNumber();

const submit_data = ref({
  id: null,
  count: null,
});

const getUser = computed(() => {
  return dataBilling.billingUser;
});

const get_count = computed(() => {
  return domainStore.count;
});

const count = ref(get_count);
const data = ref(getUser);
watch(data, () => console.log(data.value));

const set_user = (user: any) => {
  console.log(user.value);

  submit_data.value.id = user.value.id;
};

const change_count = (event: any) => {
  const count = event.target.value;
};

const submit = async () => {
  if (!submit_data.value.id) return useNotyf().error("Empty User");
  if (count.value < submit_data.value.count)
    return useNotyf().error("Many count");
  console.log(submit_data.value.count.replace("\D", ""));

  const result = await domainStore.update({
    id: submit_data.value.id,
    count: submit_data.value.count.replace("\D", ""),
  });
  if (result) {
    submit_data.value = { id: null, count: null };
    useNotyf().success("Successfuly");
  }
};
</script>
<template>
  <div class="form-domain">
    <h3 class="h3">Распределение доменов</h3>

    <div class="form-handler-wrapper">
      <SSelect :dataOptions="data" @return="set_user" />
      <input
        v-model="submit_data.count"
        class="input"
        type="text"
        @input="change_count"
        placeholder="Count"
      />
    </div>
    <div class="actions-bar-wrapper">
      <p>
        Left <span>{{ count || count === 0 ? count : "download" }}</span>
      </p>

      <div class="button button--sum">
        <button @click="submit">Add</button>
      </div>
    </div>
  </div>
</template>
