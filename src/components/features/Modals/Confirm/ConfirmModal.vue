<script lang="ts" setup></script>
<template>
  <div
    class="button--close modal__close-button"
  >
    <svg>
      <use href="/src/assets/vue.svg#close"></use>
    </svg>
  </div>

  <div class="modal__content">
    <div class="modal__buttons">
      <div class="button button--green">
        <button @click="$emit('delete-offer')">Delete</button>
      </div>

      <div class="button button--pink">
        <button @click="$emit('set-visible')">Cancele</button>
      </div>
    </div>
  </div>
</template>
