<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { useNotyf } from "/@src/composable/useNotyf";
import { useStream } from "/@src/stores/stream";
import SSelectDomain from "/@src/components/shared/Selects/SSelectDomain.vue";
interface IProps {
  dataOption: any;
}
const notyf = useNotyf();
const streamStore = useStream();
streamStore.get_domain();

const props = defineEmits(["submit-data"]);
const dataOption = defineProps<IProps>();
const params = computed(() => streamStore.domain_list);
watch(dataOption, () => {
  console.log(dataOption.dataOption);
});

const dataModal = ref(params);

const data = ref({
  domain: null,
  stream_id: dataOption.dataOption,
});

const setSelectDomain = (select_data: any, select_key: string) => {
  data.value.domain = select_data;
};

const reset_select = (select_key: string) => {
  data.value[select_key] = null;
};

const delete_item = (item: any, select_key: string) => {
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
      <SSelectDomain
        :dataOptions="dataModal"
        @delete_offer="delete_item"
        @return="setSelectDomain"
        @reset_select="reset_select"
      />
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
