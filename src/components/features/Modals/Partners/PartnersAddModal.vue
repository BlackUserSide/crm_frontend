<script lang="ts" setup>
import { ref } from "vue";
import { usePartner } from "/@src/stores/partner";

const emits = defineEmits(["set-visible"]);

const partnerStore = usePartner();
const content_type_list = ["json", "www-form-urlencoded"];
const authorization_type_list = ["Headers", "Link"];

const data = ref({
  name: "",
  platform: "",
  partner_url: "",
  content_type: "",
  authorization_type: "",
  token: "",
  params: "",
});

const setSelect = (select_data: any, select_key: string) => {
  console.log(select_data.value, select_key);

  data.value[select_key] = select_data.value;
};

const reset_select = (select_key: string) => {
  data.value[select_key] = "";
};

const submit_data = async () => {
  const partner = await partnerStore.postPartner(data.value);
  if (partner) {
    partnerStore.getPartner(1, 10);
    emits("set-visible");
  }
};
</script>

<template>
  <div
    v-on:click="$emit('set-visible')"
    class="button--close modal__close-button"
  >
    <svg>
      <use href="/src/assets/vue.svg#close"></use>
    </svg>
  </div>

  <div class="modal__content">
    <div class="modal__block">
      <input
        class="input"
        type="text"
        placeholder="URL"
        :value="data.partner_url"
        @input="(event) => (data.partner_url = event.target.value)"
      />
      <input
        class="input"
        type="text"
        placeholder="API-Token"
        :value="data.token"
        @input="(event) => (data.token = event.target.value)"
      />
    </div>

    <div class="modal__block">
      <div class="modal__block-part">
        <input
          class="input"
          type="text"
          placeholder="Name"
          :value="data.name"
          @input="(event) => (data.name = event.target.value)"
        />
      </div>

      <div class="modal__block-part">
        <input
          class="input"
          type="text"
          placeholder="Platform"
          :value="data.platform"
          @input="(event) => (data.platform = event.target.value)"
        />
      </div>
    </div>

    <div class="modal__block">
      <SSelectContent
        placeholder="Content-Type"
        :dataOptions="content_type_list"
        @return="setSelect"
        @reset_select="reset_select"
      />
    </div>

    <div class="modal__block">
      <SSelectAuthorization
        placeholder="Authorization-Type"
        :dataOptions="authorization_type_list"
        @return="setSelect"
        @reset_select="reset_select"
      />
    </div>

    <div class="modal__block">
      <div class="icon-contaner">
        <svg class="svg">
          <use href="/src/assets/vue.svg#info"></use>
        </svg>
        <div class="dropdown-content">
          <div class="text_content">
            <span class="title">IP: </span> <span>ip</span>
          </div>
          <div class="text_content">
            <span class="title">Api Key</span><span>token</span>
          </div>
          <div class="text_content">
            <span class="title">Geo:</span><span>country</span>
          </div>
          <div class="text_content">
            <span class="title">Name:</span><span>name_lead</span>
          </div>
          <div class="text_content">
            <span class="title">Phone:</span><span>phone</span>
          </div>
          <div class="text_content">
            <span class="title">Date:</span><span> date</span>
          </div>
          <div class="text_content">
            <span class="title">Flow ID:</span><span>flow_id</span>
          </div>
          <div class="text_content">
            <span class="title">User ID:</span><span> write your ID </span>
          </div>
          <div class="text_content">
            <span class="title">Offer ID:</span><span>offer_id</span>
          </div>
          <div class="text_content">
            <span class="title">Sub ID:</span><span>sub_id</span>
          </div>
        </div>
      </div>

      <textarea
        class="textarea"
        type="text"
        placeholder="Params"
        :value="data.params"
        @input="(event) => (data.params = event.target.value)"
      />
    </div>

    <div class="modal__buttons">
      <div class="button button--green">
        <button @click="submit_data">Submit</button>
      </div>

      <div class="button button--pink">
        <button @click="$emit('set-visible')">Cancele</button>
      </div>
    </div>
  </div>
</template>
