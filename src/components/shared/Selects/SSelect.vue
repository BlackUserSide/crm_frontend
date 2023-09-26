<script lang="ts" setup>
import { listeners } from "process";
import { reactive, ref } from "vue-demi";
import { IUsers } from "/@src/stores/billing";
interface IProps {
  disabled: boolean;
  dataOptions: IUsers;
}

const emits = defineEmits(["return"]);
const dataOptions = reactive([]);

const props = withDefaults(defineProps<IProps>(), {
  disabled: () => true,
});

const activeSelectHandler = ref(false);
const activeSelect = ref({});

function handlerSetActive(item: any) {
  activeSelect.value = item;
  activeSelectHandler.value = false;
  sortArrayData();
  emits("return", activeSelect);
}

function sortArrayData() {
  props.dataOptions.value = props.dataOptions.sort((a: any, b: any) => {
    if (a.login === activeSelect.value.login) return -1;
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
          v-model="activeSelect.login"
          type="text"
          disabled
          placeholder="User"
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
          v-for="(item, index) in props.dataOptions"
          :key="index"
          class="select__option"
          :class="activeSelect.login === item.login && 'select__option--focus'"
          @click="handlerSetActive(item)"
        >
          <span>{{ item.login }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
