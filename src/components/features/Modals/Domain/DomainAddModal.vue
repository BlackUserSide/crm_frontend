<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue-demi";
import { useNotyf } from "/@src/composable/useNotyf";
import { useDomains } from "/@src/stores/domain";

const domainsStore = useDomains();

const valDomains = ref("");

const notyf = useNotyf();
async function sendHandler() {
  const text_domain: string = valDomains.value;

  const data = {
    domains: text_domain.split(/\r?\n/),
  };

  const res = await domainsStore.pushDomains(data);
  if (res) {
    valDomains.value = "";
    notyf.success("Submit Success");
  }
}
</script>

<template>
  <div
    v-on:click="$emit('set-visible')"
    class="button--close modal__close-button"
  >
    <svg>
      <use href="/src/assets/vue.svg#close"></use>
    </svg>
  </div>

  <div class="modal__content">
    <textarea
      v-model="valDomains"
      class="textarea"
      id=""
      cols="20"
      rows="10"
    ></textarea>

    <div class="modal__buttons" style="justify-content: center">
      <div class="button button--green">
        <button @click="sendHandler">Submit</button>
      </div>
    </div>
  </div>
</template>
