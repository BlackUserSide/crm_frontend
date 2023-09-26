<script setup lang="ts">
import { reactive } from "vue-demi";
interface IProps {
  dataOption: any;
}

const dataOption = reactive([]);
const props = defineProps<IProps>();

console.log(props.dataOption);
</script>
<template>
  <div class="button--close modal__close-button">
    <svg>
      <use href="/src/assets/vue.svg#close"></use>
    </svg>
  </div>

  <div class="modal__content">
    <div class="modal__block">
      <input
        class="input"
        type="text"
        placeholder="Ссылка"
        v-model="props.dataOption.link"
      />
    </div>

    <div class="modal__block">
      <div class="modal__block-part">
        <input
          class="input"
          type="text"
          placeholder="Платформа"
          v-model="props.dataOption.platform"
        />
      </div>

      <div class="modal__block-part">
        <input
          class="input"
          type="text"
          placeholder="Название"
          v-model="props.dataOption.name"
        />
      </div>
    </div>

    <div class="modal__block">
      <div class="modal__block-part">
        <input
          class="input"
          type="text"
          placeholder="API-Токен"
          v-model="props.dataOption.token"
        />
      </div>

      <div class="modal__block-part">
        <input
          class="input"
          type="text"
          placeholder="Параметры"
          v-model="props.dataOption.params"
        />
      </div>
    </div>

    <div class="modal__buttons">
      <div class="button button--green">
        <button>Submit</button>
      </div>

      <div class="button button--pink">
        <button @click="$emit('set-visible')">Cancele</button>
      </div>
    </div>
  </div>
</template>
