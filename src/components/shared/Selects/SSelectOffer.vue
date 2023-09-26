<script lang="ts" setup>
import { watch, ref, watchEffect } from "vue-demi";

interface IProps {
  dataOptions: any;
  active_value: any;
}

const emits = defineEmits(["return", "reset_select", "delete_item"]);

const props = defineProps<IProps>();

const input_value = ref("");

const activeSelectHandler = ref(false);
const activeSelect = ref(props.active_value ? props.active_value : {});
const dataOptions = ref(null);

function handlerSetActive(item: any) {
  if (activeSelect.value.offer === item.offer) {
    emits("delete_item", item, "offer_id");
    activeSelect.value = {};
    activeSelectHandler.value = false;
    sortArrayData();
    return;
  }

  activeSelect.value = item;
  input_value.value = "";
  activeSelectHandler.value = false;
  sortArrayData();
  emits("return", activeSelect, "offer_id");
}

function sortArrayData() {
  dataOptions.value = props.dataOptions.sort((a: any, b: any) => {
    if (a.offer === activeSelect.value.offer) return -1;
    else return 1;
  });
}
watchEffect(() => {
  dataOptions.value = props.dataOptions ? props.dataOptions : null;
});
watch(input_value, () => {
  if (!activeSelectHandler) {
    input_value.value = "";
  }
  if (input_value.value.length === 0) {
    dataOptions.value = props.dataOptions;
    return;
  }
  if (input_value.value !== "") {
    activeSelectHandler.value = true;
  }

  dataOptions.value = props.dataOptions.filter((e: any) =>
    e.offer.toLowerCase().startsWith(input_value.value.toLowerCase())
  );
});

function activeSelecthandler() {
  if (activeSelectHandler.value) {
    activeSelectHandler.value = false;
    return;
  }
  activeSelectHandler.value = true;
}

const reset = () => {
  activeSelectHandler.value = false;
  activeSelect.value = null;
  emits("reset_select", "offer_id");
};
</script>

<template>
  <div class="select" :class="activeSelectHandler && 'select--focus'">
    <div class="select__body">
      <div
        class="select__value"
        :class="activeSelectHandler && 'select__value--focus'"
        @click="activeSelecthandler"
      >
        <input
          class="input"
          type="text"
          v-model="input_value"
          @input="(event) => (input_value = event.target.value)"
          :placeholder="activeSelect.offer ? activeSelect.offer : 'Offer'"
        />

        <svg class="select__value-icon select__value-icon--right">
          <use href="/src/assets/vue.svg#arrow--down"></use>
        </svg>
      </div>

      <div
        class="select__options"
        :class="activeSelectHandler && 'select__options--active'"
      >
        <div class="select__option" @click="reset">
          <span>No Select</span>
        </div>

        <div
          v-for="(item, index) in dataOptions"
          :key="index"
          class="select__option"
          :class="activeSelect.offer === item.offer && 'select__option--focus'"
          @click="handlerSetActive(item)"
        >
          <span>{{ item.offer }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
