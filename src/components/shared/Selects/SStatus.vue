<script lang="ts" setup>
import { watch, ref } from "vue-demi";
import { IUsers } from "/@src/stores/billing";
interface IProps {
  disabled: boolean;
  dataOptions: any;
}

const emits = defineEmits(["return", "reset_select"]);

const status = ["active", "hold", "deleted"];
const props = withDefaults(defineProps<IProps>(), {
  disabled: () => true,
});
const input_value = ref("");
const dataOptions = ref(props.dataOptions);

const activeSelectHandler = ref(false);
const activeSelect = ref({});

function handlerSetActive(item: any) {
  activeSelect.value = item;
  activeSelectHandler.value = false;
  sortArrayData();
  emits("return", activeSelect, "deal_id");
}

function activeSelecthandler() {
  if (activeSelectHandler.value) {
    activeSelectHandler.value = false;
    return;
  }
  activeSelectHandler.value = true;
}
function sortArrayData() {
  props.dataOptions.value = props.dataOptions.sort((a: any, b: any) => {
    if (a.name === activeSelect.value.name) return -1;
    else return 1;
  });
}

watch(input_value, () => {
  if (input_value.value.length === 0) {
    dataOptions.value = props.dataOptions;
    return;
  }

  dataOptions.value = props.dataOptions.filter((e: any) =>
    e.name.toLowerCase().startsWith(input_value.value.toLowerCase())
  );
});

const reset = () => {
  activeSelectHandler.value = false;
  activeSelect.value = null;
  emits("reset_select", "deal_id");
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
          v-model="activeSelect.name"
          type="text"
          @input="(event) => (input_value = event.target.value)"
          placeholder="Deal"
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
          <span>No select</span>
        </div>

        <div
          v-for="(item, index) in dataOptions"
          :key="index"
          class="select__option"
          :class="activeSelect.name === item.name && 'select__option--focus'"
          @click="handlerSetActive(item)"
        >
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
