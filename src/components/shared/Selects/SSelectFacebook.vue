<script lang="ts" setup>
import { reactive, ref } from "vue-demi";
import { IUsers } from "/@src/stores/billing";
interface IProps {
  disabled: boolean;
  dataOptions: any;
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
  emits("return", activeSelect);
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
          v-model="activeSelect.name"
          type="text"
          disabled
          placeholder="Facebook"
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
          @click="handlerSetActive(item)"
        >
          <span>{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
