<script lang="ts" setup>
import { computed, ref } from "vue";
import { useNotyf } from "/@src/composable/useNotyf";
import { usePartner } from "/@src/stores/partner";

interface Props {
  items: any;
}

const props = defineProps<Props>();
const notyf = useNotyf();
const partner = usePartner();
partner.getAllPartner();

// const props = defineEmits(["submit-data"]);

const params = computed(() => {
  return partner.all_partner;
});
const dataModal = ref(params);

const data = ref({
  upload_data: { partner_id: null, deal_id: null },
  leads: props.items.map((e: any) => e.id),
});

const setSelect = (select_data: any, select_key: string) => {
  data.value[select_key] = select_data.value.id;
};

const reset_select = (select_key: string) => {
  data.value[select_key] = null;
};

async function submit() {
  const result = await partner.postReRegistration(data.value);
  if (result) {
    data.value = {
      upload_data: {
        partner_id: null,
        deal_id: null,
      },
      leads: [],
    };
    notyf.success("Re-Registration Successful");
  }
}

// const delete_item = (item: any, select_key: string) => {
//   data.value[select_key] = data.value[select_key].filter((e: any) =>
//     item.id === e ? false : true
//   );
// };
</script>
<template>
  <div
    class="button--close modal__close-button"
    v-on:click="$emit('set-visible')"
  >
    <svg>
      <use href="/src/assets/vue.svg#close"></use>
    </svg>
  </div>

  <div class="modal__content">
    <SSelectPartner
      :dataOptions="dataModal"
      @reset_select="reset_select"
      @return="setSelect"
    />

    <div class="modal__buttons">
      <div class="button button--green">
        <button v-on:click="submit">Submit</button>
      </div>

      <div class="button button--pink">
        <button @click="$emit('set-visible')">Cancele</button>
      </div>
    </div>
  </div>
</template>
