<script lang="ts" setup>
import { ref, watch } from "vue-demi";

interface IProps {
  disabled: boolean;
  dataOptions: any;
  active_value: any;
  placeholder: string;
}

const emits = defineEmits(["return", "reset_select"]);

const props = withDefaults(defineProps<IProps>(), {
  disabled: () => true,
});
const input_value = ref("");
const dataOptions = ref(props.dataOptions);
const activeSelectHandler = ref(false);
const activeSelect = ref("");

function handlerSetActive(item: any) {
  activeSelect.value = item;
  activeSelectHandler.value = false;
  sortArrayData();
  emits("return", activeSelect, "content_type");
}

function sortArrayData() {
  dataOptions.value = props.dataOptions.sort((a: any, b: any) => {
    if (a === activeSelect.value) return -1;
    else return 1;
  });
}
watch(input_value, () => {
  if (input_value.value.length === 0) {
    dataOptions.value = props.dataOptions;
    return;
  }

  dataOptions.value = props.dataOptions.filter((e: any) =>
    e.toLowerCase().startsWith(input_value.value.toLowerCase())
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
  activeSelect.value = "";
  emits("reset_select", "content_type");
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
          v-model="activeSelect"
          type="text"
          @input="(event) => (input_value = event.target.value)"
          :placeholder="props.placeholder"
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
          :class="activeSelecthandler === item && 'select__option--focus'"
          @click="handlerSetActive(item)"
        >
          <span>{{ item }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
