<script lang="ts" setup>
import { ref } from "vue";
import { useStream } from "/@src/stores/stream";

const partnerStore = useStream();
const data = ref({
  name: "",
});

const submit_data = async () => {};
</script>

<template>
  <div @click="$emit('set-visible')" class="button--close modal__close-button">
    <svg>
      <use href="/src/assets/vue.svg#close"></use>
    </svg>
  </div>

  <div class="modal__content">
    <div class="modal__block">
      <div class="modal__block-part"></div>

      <div class="modal__block-part"></div>
    </div>

    <div class="modal__buttons">
      <div class="button button--green">
        <button @click="submit_data">Submit</button>
      </div>

      <div class="button button--pink">
        <button @click="$emit('set-visible')">Cancele</button>
      </div>
    </div>
  </div>
</template>
