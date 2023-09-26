<script lang="ts" setup>
import { ref } from "vue";
import { useOffer } from "/@src/stores/offer";
const emits = defineEmits(["set-visible"]);
const offerStore = useOffer();
const data = ref({
  offer: null,
  cost: null,
  offer_id: null,
});

const submit_data = async () => {
  const offer = await offerStore.postOffer(data.value);
  if (offer) {
    offerStore.getOffer(1, 10);
    emits("set-visible");
  }
};
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
    <div class="modal__block">
      <input
        class="input"
        type="text"
        placeholder="Offer"
        :value="data.offer"
        @input="(event) => (data.offer = event.target.value)"
      />
    </div>
    <div class="modal__block">
      <div class="modal__block-part">
        <input
          class="input"
          type="number"
          placeholder="Cost"
          :value="data.cost"
          @input="(event) => (data.cost = event.target.value)"
        />
      </div>
      <div class="modal__block-part">
        <input
          class="input"
          type="text"
          placeholder="Offer ID"
          :value="data.offer_id"
          @input="(event) => (data.offer_id = event.target.value)"
        />
      </div>
    </div>

    <div class="modal__buttons">
      <div @click="submit_data" class="button button--green">
        <button>Submit</button>
      </div>

      <div class="button button--pink">
        <button @click="$emit('set-visible')">Cancele</button>
      </div>
    </div>
  </div>
</template>
