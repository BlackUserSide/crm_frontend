<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue-demi";
import { useNotyf } from "/@src/composable/useNotyf";
import { useDomains } from "/@src/stores/domain";

const domainsStore = useDomains();

const valDomains = ref("");

const notyf = useNotyf();
async function sendHandler() {
  const test: string = valDomains.value;

  const data = {
    domains: test.split(/\r?\n/),
  };
  console.log(data);

  const res = await domainsStore.pushDomains(data);
  if (res) {
    valDomains.value = "";
    notyf.success("Данные успешные отправленны");
  }
}
</script>
<template>
  <div class="form-domain">
    <h1>Add Domain</h1>

    <textarea
      v-model="valDomains"
      class="text-area-domain"
      id=""
      cols="20"
      rows="10"
    ></textarea>

    <div class="actions-bar-wrapper">
      <div class="button button--sum">
        <button class="btn-wrppaer-domains" @click="sendHandler">Add</button>
      </div>
    </div>
  </div>
</template>
