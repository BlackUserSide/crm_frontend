<script lang="ts" setup>
import { reactive, ref, watch, computed, watchEffect } from "vue-demi";
interface IProps {
  dataOptions: any;
  active_value: any;
}

const emits = defineEmits(["return", "delete_item", "reset_select"]);
const props = defineProps<IProps>();

const input_value = ref("");
const dataOptions = ref(null);
const activeSelectHandler = ref(false);
const activeSelect = ref(
  props.active_value ? props.active_value.map((e: any) => e.login) : []
);
const placeholder_value = ref(
  props.active_value
    ? !props.active_value
      ? []
      : props.active_value.length > 2
      ? [props.active_value[0].login, props.active_value[1].login]
      : props.active_value.length === 1
      ? [props.active_value[0].login]
      : []
    : []
);
watchEffect(() => {
  console.log(activeSelect.value);

  if (activeSelect.value.length !== 0) {
    if (activeSelect.value.length > 2) {
      placeholder_value.value[2] = ` +${activeSelect.value.length - 2}`;
    } else {
      placeholder_value.value = [...activeSelect.value];
    }
    sortArrayData();
    // if (activeSelect.value.length < 3) {
    //   placeholder_value.value.push(item.code);
    // } else {
    //   placeholder_value.value[2] = `+${activeSelect.value.length - 2}`;
    // }
  }
});

watchEffect(() => {
  dataOptions.value = props.dataOptions ? props.dataOptions : null;
});
function handlerSetActive(item: any) {
  if (activeSelect.value.includes(item.login)) {
    emits("delete_item", item, "user_ids");

    activeSelect.value = activeSelect.value.filter((e: any) =>
      item.login === e ? false : true
    );

    if (activeSelect.value.length > 2) {
      placeholder_value.value[2] = ` +${activeSelect.value.length - 2}`;
    } else {
      placeholder_value.value = [...activeSelect.value];
    }

    sortArrayData();
    return;
  }

  emits("return", item, "user_ids");
  activeSelect.value.push(item.login);

  if (activeSelect.value.length < 3) {
    placeholder_value.value.push(item.login);
  } else {
    placeholder_value.value[2] = ` +${activeSelect.value.length - 2}`;
  }
  sortArrayData();
  input_value.value = "";
  activeSelectHandler.value = false;
  activeSelect.value.toString();
}

function sortArrayData() {
  dataOptions.value = props.dataOptions.sort((a: any, b: any) => {
    if (activeSelect.value.includes(a.login)) return -1;
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
  emits("reset_select", "user_ids");
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
    e.login.toLowerCase().startsWith(input_value.value.toLowerCase())
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
            placeholder_value.length > 0 ? [...placeholder_value] : 'User'
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
          :key="index"
          class="select__option"
          :class="activeSelect.includes(item.login) && 'select__option--focus'"
          @click="handlerSetActive(item)"
        >
          <span>{{ item.login }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
