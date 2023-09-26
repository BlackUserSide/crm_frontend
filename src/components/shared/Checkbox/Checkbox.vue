<script lang="ts" setup>
import { Lead } from "/@src/stores/dashboard";

interface IProps {
  dataOptions: Lead;
  isAll: boolean;
}
const emits = defineEmits(["change"]);
const props = defineProps<IProps>();
</script>

<template>
  <div class="checkbox-block">
    <div class="checkbox-block__body">
      <input
        type="checkbox"
        @input="emits('change', props.dataOptions.id)"
        class="checkbox-block__checkbox"
        :checked="props.isAll"
        :id="`chekbox-${props.dataOptions.id}`"
      />
      <label
        class="checkbox-block__label"
        :for="`chekbox-${props.dataOptions.id}`"
      ></label>
    </div>
  </div>
</template>
