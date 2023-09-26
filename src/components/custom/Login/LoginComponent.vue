<script setup lang="ts">
import { onBeforeMount, reactive, ref } from "vue-demi";
import { useRouter } from "vue-router";
import { useNotyf } from "/@src/composable/useNotyf";
import { IloginUser, useUserSession } from "/@src/stores/userSession";

const dataLogin: IloginUser = reactive({
  login: "",
  password: "",
});
const notyf = useNotyf();
const router = useRouter();
const userStore = useUserSession();

async function loginUser() {
  if (dataLogin) {
    const login = await userStore.loginUser(dataLogin);
    if (login) {
      router.push("/app");
      notyf.success(`С возвращением ${login}`);
    }
  }
}

const renderHandler = ref(false);

onBeforeMount(() => {
  if (localStorage.getItem("token")) {
    router.push("/app");
    return;
  }
  renderHandler.value = true;
});
</script>

<template>
  <div class="form-page__login">
    <form v-if="renderHandler" class="login-form" @submit.prevent="loginUser()">
      <div class="login-form__logo">
        <img src="/@src/assets/form-page/main-logo.svg" alt="main-logo" />
      </div>

      <h2 class="login-form__title">Spectrum Traffic</h2>

      <div
        class="input-wrapper login-form__input-block login-form__input-block--login"
      >
        <svg>
          <use href="/src/assets/vue.svg#login"></use>
        </svg>

        <input
          class="login-form__input"
          v-model="dataLogin.login"
          type="text"
          placeholder="Login"
        />
      </div>

      <div
        class="input-wrapper login-form__input-block login-form__input-block--password"
      >
        <svg>
          <use href="/src/assets/vue.svg#password"></use>
        </svg>

        <input
          class="login-form__input"
          v-model="dataLogin.password"
          type="password"
          placeholder="Password"
        />
      </div>

      <div class="login-form__button-block">
        <div class="button button--login">
          <button>Войти</button>
        </div>
      </div>
    </form>
  </div>
</template>
