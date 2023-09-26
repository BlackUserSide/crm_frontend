<script lang="ts" setup>
import { ref, watch, watchEffect } from "vue-demi";

interface IProps {
  dataOptions: any;
  active_value: any;
}

const emits = defineEmits(["return", "delete_item", "reset_select"]);
const input_value = ref("");
const props = defineProps<IProps>();
let dataOptions = ref(null);
const activeSelectHandler = ref(false);
const activeSelect = ref(
  props.active_value ? props.active_value.map((e) => e.code) : []
);
const placeholder_value = ref(
  !props.active_value
    ? []
    : props.active_value.length > 2
    ? [props.active_value[0].code, props.active_value[1].code]
    : props.active_value.length === 1
    ? [props.active_value[0].code]
    : []
);

// watchEffect(() => {
//   console.log(activeSelect.value, "sdasdasdasda");

//   if (activeSelect.value.length !== 0) {
//     console.log(activeSelect.value.length, "activeSelect.value.length");

//     if (activeSelect.value.length > 2) {
//       placeholder_value.value[2] = ` +${activeSelect.value.length - 2}`;
//     } else {
//       placeholder_value.value = [...activeSelect.value];
//     }
//     sortArrayData();
//     // if (activeSelect.value.length < 3) {
//     //   placeholder_value.value.push(item.code);
//     // } else {
//     //   placeholder_value.value[2] = `+${activeSelect.value.length - 2}`;
//     // }
//   }
// });
watch(placeholder_value, () => {
  if (activeSelect.value.length > 2) {
    placeholder_value.value[2] = ` +${activeSelect.value.length - 2}`;
  } else {
    placeholder_value.value = [...activeSelect.value];
  }
});
watchEffect(() => {
  dataOptions.value = props.dataOptions ? props.dataOptions : null;
});

function handlerSetActive(item: any) {
  if (activeSelect.value.includes(item.code)) {
    emits("delete_item", item, "countries");

    activeSelect.value = activeSelect.value.filter((e: any) =>
      item.code === e ? false : true
    );
    if (activeSelect.value.length > 2) {
      console.log(
        "🚀 ~ file: SSelectCountry.vue:43 ~ watch ~ placeholder_value:",
        placeholder_value.value
      );
      placeholder_value.value[2] = ` +${activeSelect.value.length - 2}`;
    } else {
      placeholder_value.value = [...activeSelect.value];
    }
    sortArrayData();

    return;
  }

  emits("return", item, "countries");
  activeSelect.value.push(item.code);
  sortArrayData();

  if (activeSelect.value.length < 3) {
    placeholder_value.value.push(item.code);
  } else {
    placeholder_value.value[2] = `+${activeSelect.value.length - 2}`;
  }

  input_value.value = "";
  activeSelectHandler.value = false;

  activeSelect.value.toString();
}

function sortArrayData() {
  dataOptions.value = props.dataOptions.sort((a: any, b: any) => {
    if (activeSelect.value.includes(a.code)) return -1;
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

const reset = () => {
  activeSelectHandler.value = false;
  placeholder_value.value = [];
  emits("reset_select", "countries");
};

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
    e.country.toLowerCase().startsWith(input_value.value.toLowerCase())
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
          :placeholder="
            placeholder_value.length > 0 ? [...placeholder_value] : 'Country'
          "
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
          class="select__option"
          :key="index"
          :class="activeSelect.includes(item.code) && 'select__option--focus'"
          @click="handlerSetActive(item)"
        >
          <span>{{ item.country }} ({{ item.code }})</span>
        </div>
      </div>
    </div>
  </div>
</template>
