<script lang="ts" setup>
import { computed, ref, watch } from "vue-demi";
import { useFilter } from "/@src/stores/filter";
import { vOnClickOutside } from "@vueuse/components";
import UtmCampaignFilter from "./UtmCampaignFilter.vue";

const filterStore = useFilter();
const first_click = ref(false);
const getActiveFilter = computed(() => filterStore.activeFilter);
const activeFilter = ref(getActiveFilter);
const target = null;
const filter_block = ref(null);
function test() {
  filterStore.clearFilter();
}

document.addEventListener("click", (target: any) => {
  const click_zone = target.srcElement;
  const a =
    first_click.value &&
    filter_block.value &&
    !filter_block.value?.contains(click_zone);

  if (!first_click.value) {
    first_click.value = true;
  } else if (a) {
    first_click.value = false;
    filterStore.clearFilter();
  }
});
</script>

<template>
  <div class="filter-sidebar">
    <div class="filter-sidebar__body" ref="filter_block">
      <div
        class="filter-block"
        :class="
          (activeFilter === 'bayer' && 'filter-block--bayer') ||
          (activeFilter === 'calendar' && 'filter-block--calendar') ||
          (activeFilter === 'id' && 'filter-block--id') ||
          (activeFilter === 'link' && 'filter-block--link') ||
          (activeFilter === 'sub_id' && 'filter-block--link') ||
          (activeFilter === 'utm_campaign' && 'filter-block--link') ||
          (activeFilter === 'utm_medium' && 'filter-block--link') ||
          (activeFilter === 'product' && 'filter-block--product') ||
          (activeFilter === 'partner' && 'filter-block--product') ||
          (activeFilter === 'status' && 'filter-block--status')
        "
      >
        <div
          class="button--close filter-block__close-button"
          @click="filterStore.clearFilter()"
        >
          <svg>
            <use href="/src/assets/vue.svg#close"></use>
          </svg>
        </div>

        <BayerFilter
          v-if="activeFilter === 'bayer'"
          v-on-click-outside="test"
        />
        <DataFilter
          v-if="activeFilter === 'calendar'"
          v-on-click-outside="test"
        />
        <IdFilter v-if="activeFilter === 'id'" v-on-click-outside="test" />
        <LinkFilter v-if="activeFilter === 'link'" v-on-click-outside="test" />
        <ProductFilter
          v-if="activeFilter === 'product'"
          v-on-click-outside="test"
        />
        <PartnerFilter
          v-if="activeFilter === 'partner'"
          v-on-click-outside="test"
        />
        <StatusFilter
          v-if="activeFilter === 'status'"
          v-on-click-outside="test"
        />
        <SubIdFilter
          v-if="activeFilter === 'sub_id'"
          v-on-click-outside="test"
        />
        <UtmCampaignFilter
          v-if="activeFilter === 'utm_campaign'"
          v-on-click-outside="test"
        />
        <UtmMediumFilter
          v-if="activeFilter === 'utm_medium'"
          v-on-click-outside="test"
        />
      </div>
    </div>
  </div>
</template>
