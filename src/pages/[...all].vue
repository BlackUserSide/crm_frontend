<script lang="ts" setup>
import { useRouter } from "vue-router";
import { useNotyf } from "../composable/useNotyf";

const router = useRouter();
const notyf = useNotyf();
notyf.error("Error:404 (Страница не найден)");
</script>

<template>
  <div class="error-page">
    <div class="error-page__visual">
      <img src="../assets/slavaUkraine.jpeg" alt="background" />
    </div>

    <div class="error-page__content">
      <h1>
        Російський військовий корабель йде на х#й, а вам краще перейти на
        існуючу сторінку, адже цю ще не намалювали.
      </h1>

      <div class="button button--login">
        <button @click="router.push('/')">
          На головну
        </button>
      </div>
    </div>
  </div>
</template>