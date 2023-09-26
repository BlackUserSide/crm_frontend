<script lang="ts" setup>
interface IProps {
  title: string;
}
const props = defineProps<IProps>();
</script>

<template>
  <div class="modal">
    <div class="modal__body">
      <h3 class="modal__title">{{ props.title }}</h3>
      <slot></slot>
    </div>
  </div>
</template>
