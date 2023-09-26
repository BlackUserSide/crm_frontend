<script lang="ts" setup>
import { computed, ref } from "vue";
import SSelectCountry from "/@src/components/shared/Selects/SSelectCountry.vue";
import SSelectOffer from "/@src/components/shared/Selects/SSelectOffer.vue";
import SSelectPartner from "/@src/components/shared/Selects/SSelectPartner.vue";
import SSelectUser from "/@src/components/shared/Selects/SSelectUser.vue";
import { useDeal } from "/@src/stores/deal";

let dataModalSecond = ref({
  countries: [],
  user_ids: [],
  partner_id: null,
  name: null,
  flow_id: null,
  offer_id: null,
  limit_lead: null,
});
const emits = defineEmits(["set-visible"]);
const deal = useDeal();
deal.getParamsModal();

const params = computed(() => deal.modal);
const dataModal = ref(params);

const setMultySelect = (select_data: any, select_key: string) => {
  dataModalSecond.value[select_key].push(select_data);
};

const setSelect = (select_data: any, select_key: string) => {
  console.log(select_data.value, select_key);

  dataModalSecond.value[select_key] = select_data.value.id;
};

const setSelectOffer = (select_data: any, select_key: string) => {
  console.log(select_data.value, select_key);

  dataModalSecond.value[select_key] = select_data.value.offer_id;
};
const delete_item = (item: any, select_key: string) => {
  dataModalSecond.value[select_key] = dataModalSecond.value[select_key].filter(
    (e: any) => (item.id === e ? false : true)
  );
};

const delete_item_offer = (item: any, select_key: string) => {
  dataModalSecond.value[select_key] = null;
};

const reset_multi_select = (select_key: string) => {
  dataModalSecond.value[select_key] = [];
};

const reset_select = (select_key: string) => {
  dataModalSecond.value[select_key] = null;
};

const submit_modal = async () => {
  const result = await deal.postDeal(dataModalSecond.value);
  if (result) {
    deal.getDeal(1, 10);
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
        @input="(event) => (dataModalSecond.name = event.target.value)"
        type="text"
        placeholder="Name"
      />
    </div>
    <div class="modal__block">
      <input
        class="input"
        @input="(event) => (dataModalSecond.limit_lead = event.target.value)"
        type="text"
        placeholder="Limit "
      />
    </div>
    <div class="modal__block">
      <input
        class="input"
        @input="(event) => (dataModalSecond.flow_id = event.target.value)"
        type="text"
        placeholder="Flow ID"
      />
    </div>
    <div class="modal__block">
      <div class="modal__block-part">
        <SSelectCountry
          :disabled="false"
          :data-options="dataModal.country"
          @delete_offer="delete_item"
          @return="setMultySelect"
          @reset_select="reset_multi_select"
        />
      </div>

      <div class="modal__block-part">
        <SSelectUser
          :disabled="false"
          :dataOptions="dataModal.users"
          @return="setMultySelect"
          @delete_offer="delete_item"
          @reset_select="reset_multi_select"
        />
      </div>
    </div>

    <div class="modal__block">
      <div class="modal__block-part">
        <SSelectOffer
          :disabled="false"
          :dataOptions="dataModal.offers"
          @return="setSelectOffer"
          @delete_offer="delete_item_offer"
          @reset_select="reset_select"
        />
      </div>

      <div class="modal__block-part">
        <SSelectPartner
          :disabled="false"
          :dataOptions="dataModal.partner"
          @delete_offer="delete_item_offer"
          @return="setSelect"
          @reset_select="reset_select"
        />
      </div>
    </div>

    <div class="modal__buttons">
      <div class="button button--green">
        <button v-on:click="submit_modal">Submit</button>
      </div>

      <div class="button button--pink">
        <button @click="$emit('set-visible')">Cancele</button>
      </div>
    </div>
  </div>
</template>
