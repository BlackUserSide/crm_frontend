<script lang="ts" setup>
import { log } from "console";
import { reactive } from "vue";
import { useOffer } from "/@src/stores/offer";
interface IProps {
  dataOption: {
    id: number;
    cost: number | string;
    offer: string;
    offer_id: string;
  };
}
const offerStore = useOffer();
const emits = defineEmits(["set-visible"]);
const props = defineProps<IProps>();
const dataOption = reactive(props.dataOption);
const update_data = {
  offer: props.dataOption.offer,
  id: props.dataOption.id,
  offer_id: props.dataOption.offer_id,
  cost: props.dataOption.cost,
};
const submit = async () => {
  console.log(update_data);

  let clear_update_data = Object.fromEntries(
    Object.entries(update_data).filter(([_, v]) => v != null)
  );

  const result = await offerStore.update_offer(clear_update_data);
  console.log(result, "asdasdas");

  if (result) {
    console.log(result, 'const emits = defineEmits(["set-visible"]);');

    offerStore.getOffer(1, 10);
    emits("set-visible");
  }
};
</script>
<template>
  <div class="button--close modal__close-button">
    <svg>
      <use href="/src/assets/vue.svg#close"></use>
    </svg>
  </div>

  <div class="modal__content">
    <div class="modal__block">
      <div class="modal__block-part">
        <input
          type="text"
          v-model="props.dataOption.offer"
          placeholder="Offer"
          class="input"
          @input="(event) => (update_data.offer = event.target.value)"
        />
      </div>

      <div class="modal__block-part">
        <input
          type="text"
          placeholder="Cost"
          class="input"
          @input="(event) => (update_data.cost = event.target.value)"
          v-model="props.dataOption.cost"
        />
      </div>
    </div>

    <div class="modal__buttons">
      <div class="button button--green">
        <button @click="submit">Submit</button>
      </div>

      <div class="button button--pink">
        <button @click="$emit('set-visible')">Cancele</button>
      </div>
    </div>
  </div>
</template>
