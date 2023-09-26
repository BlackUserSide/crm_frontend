<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue-demi";
import { useDeal } from "/@src/stores/deal";
import SSelectCountry from "/@src/components/shared/Selects/SSelectCountry.vue";

interface Props {
  dataOption: {
    countries: any[];
    user_ids: any[];
    id: number;
    limit_lead: number;
    name: string;
    offer: string;
    offer_id: number;
    partner: string;
    partner_id: number;
    status: string;
    createdAt: string;
    updatedAt: string;
  } | null;
}
const deal = useDeal();
const emits = defineEmits(["set-visible"]);
const props = defineProps<Props>();
const update_data = {
  countries: props.dataOption?.countries,
  user_ids: props.dataOption?.user_ids,
  id: props.dataOption?.id,
  limit_lead: props.dataOption?.limit_lead,
  name: props.dataOption?.name,
  offer_id: props.dataOption?.offer_id,
  partner_id: props.dataOption?.partner_id,
  // status: null;
};
deal.getParamsModal();

const params = computed(() => deal.modal);

const dataModal = ref(params);

const setSelectPartner = (value: any, key: string) => {
  update_data[key] = value.value.id;
};
const setSelectOffer = (value: any, key: string) => {
  update_data[key] = value.value.offer_id;
};
const setMultiSelect = (value: any, key: string) => {
  console.log(update_data[key], key);

  update_data[key].push(value);
};
const reset = (value: any, key: string) => {
  update_data[key] = null;
};
const resetMulti = (key: string) => {
  console.log(key);

  update_data[key] = [];
};
const delete_item = (item: any, select_key: string) => {
  update_data[select_key] = update_data[select_key].filter((e: any) =>
    item.code === e.code ? false : true
  );
};
const delete_item_user = (item: any, select_key: string) => {
  update_data[select_key] = update_data[select_key].filter((e: any) =>
    item.id === e.id ? false : true
  );
};
const delete_partner = (item: any, select_key: string) => {
  update_data[select_key] = null;
};
const delete_offer = (item: any, select_key: string) => {
  update_data[select_key] = null;
};
const submit = async () => {
  let clear_update_data = Object.fromEntries(
    Object.entries(update_data).filter(([_, v]) => v != null)
  );

  const result = await deal.updateDeal(clear_update_data);

  if (result) {
    deal.getDeal(1, 10);
    emits("set-visible");
  }
};
console.log(dataModal.value);
</script>
<template>
  <div>
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
          placeholder="Name"
          @input="(event) => (update_data.name = event.target.value)"
          v-model="props.dataOption.name"
        />
      </div>

      <div class="modal__block">
        <div class="modal__block-part">
          <SSelectPartner
            @return="setSelectPartner"
            @reset_select="reset"
            :dataOptions="dataModal.partner"
            @delete_item="delete_partner"
            :active_value="{
              name: props.dataOption?.partner,
              id: props.dataOption?.partner_id,
            }"
          />
        </div>

        <div class="modal__block-part">
          <SSelectOffer
            @return="setSelectOffer"
            @reset_select="reset"
            @delete_item="delete_offer"
            :dataOptions="dataModal.offers"
            :active_value="{
              offer: props.dataOption?.offer,
              id: props.dataOption?.offer_id,
            }"
          />
        </div>
      </div>

      <div class="modal__block">
        <div class="modal__block-part">
          <SSelectCountry
            @return="setMultiSelect"
            @reset_select="resetMulti"
            @delete_item="delete_item"
            :dataOptions="dataModal.country"
            :active_value="props.dataOption?.countries"
          />
        </div>

        <div class="modal__block-part">
          <input class="input" type="text" placeholder="Status" />
        </div>
      </div>
      <div class="modal__block">
        <div class="modal__block-part">
          <input
            class="input"
            type="number"
            placeholder="Limit"
            @input="(event) => (update_data.limit_lead = event.target.value)"
            v-model="props.dataOption.limit_lead"
          />
        </div>

        <div class="modal__block-part">
          <SSelectUser
            :disabled="false"
            :dataOptions="dataModal.users"
            :active_value="props.dataOption?.user_ids"
            @return="setMultiSelect"
            @reset_select="resetMulti"
            @delete_item="delete_item_user"
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
  </div>
</template>
