<script lang="ts" setup>
import { computed, ref } from "vue";
import { useNotyf } from "/@src/composable/useNotyf";
import { Create, useStream } from "/@src/stores/stream";

const notyf = useNotyf();
const streamStore = useStream();
streamStore.get_param();

const props = defineEmits(["submit-data"]);
const params = computed(() => streamStore.modal);

const dataModal = ref(params);

const data = ref<Create>({
  name: "",
  comment: "",
  deal_id: null,
  countries: [],
});

const setMultySelect = (select_data: any, select_key: string) => {
  data.value[select_key].push(select_data);
};

const setSelect = (select_data: any, select_key: string) => {
  data.value[select_key] = select_data.value.id;
};

const setSelectDomain = (select_data: any, select_key: string) => {
  console.log(select_data.value, select_key);

  data.value[select_key] = select_data.value;
};

const reset_multi_select = (select_key: string) => {
  data.value[select_key] = [];
};

const reset_select = (select_key: string) => {
  data.value[select_key] = null;
};

const delete_item = (item: any, select_key: string) => {
  data.value[select_key] = data.value[select_key].filter((e: any) =>
    item.id === e ? false : true
  );
};
const delete_item_deal = (item: any, select_key: string) => {
  data.value[select_key] = null;
};
</script>
<template>
  <div @click="$emit('set-visible')" class="button--close modal__close-button">
    <svg>
      <use href="/src/assets/vue.svg#close"></use>
    </svg>
  </div>

  <div class="modal__content">
    <div class="modal__block">
      <input
        class="input"
        @input="(event) => (data.name = event.target.value)"
        type="text"
        placeholder="Title"
      />
    </div>
    <div class="modal__block">
      <input
        class="input"
        @input="(event) => (data.comment = event.target.value)"
        type="text"
        placeholder="Comment"
      />
    </div>
    <div class="modal__block">
      <div class="modal__block-part">
        <SSelectCountry
          :dataOptions="dataModal.countries"
          @delete_offer="delete_item"
          @return="setMultySelect"
          @reset_select="reset_multi_select"
        />
      </div>

      <div class="modal__block-part">
        <SSelectDeal
          :dataOptions="dataModal.deals"
          @delete_offer="delete_item"
          @return="setSelect"
          @reset_select="reset_select"
        />
      </div>
    </div>

    <div class="modal__buttons">
      <div class="button button--green">
        <button @click="$emit('submit-data', data)">Submit</button>
      </div>

      <div class="button button--pink">
        <button @click="$emit('set-visible')">Cancele</button>
      </div>
    </div>
  </div>
</template>
