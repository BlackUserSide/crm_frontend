<script lang="ts" setup>
import { computed, reactive, Ref, ref, watch } from "vue-demi";
import { useConversation } from "/@src/stores/conversation";
import { useUserSession } from "/@src/stores/userSession";
const userSession = useUserSession();
const getRole = computed(() => {
  return userSession.role;
});
const roleUser: Ref<number> = ref(getRole);
</script>

<template>
  <div>
    <div>
      <div v-if="roleUser !== 'user'">
        <ConversationMainTable />
      </div>
      <div v-else>
        <ConversationUserTable />
      </div>
    </div>
    <ConversationSecondTable />
    <ConversationGeoTable />
    <div v-if="roleUser !== 'user'">
      <ConversationPartnerTable />
    </div>
  </div>
</template>
