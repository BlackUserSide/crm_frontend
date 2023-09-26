<script setup lang="ts">
  import { computed, ref } from "vue-demi";
  import { useUserSession } from "/@src/stores/userSession";

  const userStore = useUserSession();
  const getLogin = computed(() => userStore.login);
  const loginUser = ref(getLogin);
</script>

<template>
  <div class="user-profile">
    <div class="user-profile__avatar">
      <span>NS</span>
    </div>
  
    <p class="user-profile__name">
      {{ loginUser }}
    </p>
  </div>
</template>