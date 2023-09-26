<script lang="ts" setup>
import { computed, ref } from "vue";
import { useNotyf } from "/@src/composable/useNotyf";
import { useDomains } from "/@src/stores/domain";
import { useUserSession } from "/@src/stores/userSession";

interface Props {
  items: any;
}

const props = defineProps<Props>();
const notyf = useNotyf();
const userStore = useUserSession();
const domainStore = useDomains();

userStore.getUsers();
// const props = defineEmits(["submit-data"]);

const params = computed(() => {
  return userStore.users;
});
const dataModal = ref(params);

const data = ref();
const domain_list = props.items;

const setSelect = (select_data: any, select_key: string) => {
  data.value = select_data.value.id;
};

const reset_select = (select_key: string) => {};

async function submit() {
  const submit_data = domain_list
    .filter((e: any) => (e.user_id ? false : true))
    .map((e: any) => {
      if (e.user_id) return e;
      return { ...e, user_id: data.value };
    });

  const result = await domainStore.update(submit_data);
  if (result) {
    data.value = {
      id: null,
    };
    notyf.success("Domain Set User");
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
    <SSelect
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
