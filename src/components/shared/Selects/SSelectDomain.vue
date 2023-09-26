<script lang="ts" setup>
import { reactive, ref, watchEffect, watch } from "vue-demi";

interface IProps {
  dataOptions: any;
}

const emits = defineEmits(["return", "reset_select", "delete_item"]);
const dataOptions = ref(null);
const input_value = ref("");

const props = defineProps<IProps>();

const activeSelectHandler = ref(false);
const activeSelect = ref({});

function handlerSetActive(item: any) {
  if (activeSelect.value.domain === item.domain) {
    emits("delete_item", item, "domain");
    activeSelect.value = {};

    sortArrayData();
    return;
  }
  activeSelect.value = item;
  input_value.value = "";
  activeSelectHandler.value = false;
  sortArrayData();
  emits("return", activeSelect.value.domain, "domain");
}

function sortArrayData() {
  dataOptions.value = props.dataOptions.sort((a: any, b: any) => {
    if (a.domain === activeSelect.value.domain) return -1;
    else return 1;
  });
}

function activeSelecthandler() {
  if (activeSelectHandler.value) {
    activeSelectHandler.value = false;
    return;
  }
  activeSelectHandler.value = true;
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
    e.domain.toLowerCase().startsWith(input_value.value.toLowerCase())
  );
});
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
          :placeholder="activeSelect.domain ? activeSelect.domain : 'Domain'"
        />

        <svg class="select__value-icon select__value-icon--right">
          <use href="/src/assets/vue.svg#arrow--down"></use>
        </svg>
      </div>

      <div
        class="select__options"
        :class="activeSelectHandler && 'select__options--active'"
      >
        <div class="select__option" @click="handlerSetActive('')">
          <span>No Select</span>
        </div>

        <div
          v-for="(item, index) in dataOptions"
          :key="index"
          class="select__option"
          :class="
            activeSelect.domain === item.domain && 'select__option--focus'
          "
          @click="handlerSetActive(item)"
        >
          <span>{{ item.domain }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
