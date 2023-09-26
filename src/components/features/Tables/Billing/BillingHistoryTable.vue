<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue-demi";
import { useMoment } from "/@src/composable/useMoment";
import { useNotyf } from "/@src/composable/useNotyf";
import { useBilling } from "/@src/stores/billing";
import { useFilter } from "/@src/stores/filter";

const countItem = ref(10);
const activeCount = ref(false);
const isDeleteModal = ref(false);
const delete_item = ref();
const notif = useNotyf();
const filter = useFilter();
function changeActiveCount() {
  if (activeCount.value) {
    activeCount.value = false;
    return;
  }
  activeCount.value = true;
}

function changeCountItem(item: number) {
  activeCount.value = false;
  countItem.value = item;
  filter.limit = item;
}

const billingStore = useBilling();
billingStore.getDataBillingHistory(1, 10);
const getBillingData = computed(() => billingStore.dataHistoryBilling.rows);
const billingData = reactive(getBillingData);

const getAppPage = computed(() => {
  return billingStore.dataHistoryBilling.max_page;
});

const allPages = ref(getAppPage);
const selectPage = ref(1);
const pagginationNumber = ref([]);

watch(allPages, () => {
  if (billingStore.activeFilter)
    billingStore.setFilter(
      selectPage.value,
      countItem.value,
      filter.dataFilter
    );
  else {
    billingStore.getDataBillingHistory(selectPage.value, countItem.value);
  }
  const tmp = [];
  for (let i = selectPage.value; i <= selectPage.value + 3; i++) {
    if (i === 1) {
      continue;
    }

    if (i === allPages.value) {
      break;
    }
    if (i <= allPages.value) {
      tmp.push(i);
    }
  }
  pagginationNumber.value = tmp;
});

watch(countItem, (prev) => {
  if (billingStore.activeFilter)
    billingStore.setFilter(
      selectPage.value,
      countItem.value,
      filter.dataFilter
    );
  else {
    billingStore.getDataBillingHistory(selectPage.value, countItem.value);
  }
});

watch(selectPage, (prev) => {
  if (billingStore.activeFilter)
    billingStore.setFilter(
      selectPage.value,
      countItem.value,
      filter.dataFilter
    );
  else {
    billingStore.getDataBillingHistory(selectPage.value, countItem.value);
  }
  const tmp = [];
  for (let i = selectPage.value; i <= selectPage.value + 3; i++) {
    if (i === 1) {
      continue;
    }

    if (i === allPages.value) {
      break;
    }
    if (i <= allPages.value) {
      tmp.push(i);
    }
  }
  pagginationNumber.value = tmp;
});

function selectPageChange(select: number) {
  selectPage.value = select;
}

function changeSelectPage(method: string) {
  if (method === "plus") {
    const newSelectPage =
      selectPage.value + 1 > allPages.value
        ? allPages.value
        : selectPage.value + 1;
    selectPage.value = newSelectPage;
  } else {
    const newSelectPage = selectPage.value - 1 < 1 ? 1 : selectPage.value - 1;
    selectPage.value = newSelectPage;
  }
}

function set_delete_item(id: number | null = null) {
  if (isDeleteModal.value) {
    delete_item.value = null;
    isDeleteModal.value = false;
    return;
  }
  delete_item.value = id;
  isDeleteModal.value = true;
}

async function delete_expense() {
  const result = await billingStore.deleteBilling(delete_item.value);

  if (result) {
    isDeleteModal.value = false;
    notif.success("Bill Deleted");
    billingStore.getDataBillingHistory(1, 10);
  }
}
</script>

<template>
  <div class="table-page table-page--history-billing">
    <div class="table-page__title-block">
      <div class="table-page__select-block table-select-block">
        <p class="table-select-block__title">SHOW</p>

        <div class="table-select-block__select">
          <div
            class="table-select-block__select-body"
            :class="activeCount && 'table-select-block__select-body--active'"
          >
            <div
              class="table-select-block__select-count"
              :class="activeCount && 'table-select-block__select-count--active'"
              @click="changeActiveCount"
            >
              <span>{{ countItem }}</span>

              <svg>
                <use href="/src/assets/vue.svg#arrow--down"></use>
              </svg>
            </div>

            <div
              class="table-select-block__select-list"
              :class="activeCount && 'table-select-block__select-list--active'"
            >
              <div
                class="table-select-block__select-item"
                :class="
                  countItem === 10 && 'table-select-block__select-item--hidden'
                "
                @click="changeCountItem(10)"
              >
                10
              </div>

              <div
                class="table-select-block__select-item"
                :class="
                  countItem === 15 && 'table-select-block__select-item--hidden'
                "
                @click="changeCountItem(15)"
              >
                15
              </div>

              <div
                class="table-select-block__select-item"
                :class="
                  countItem === 20 && 'table-select-block__select-item--hidden'
                "
                @click="changeCountItem(20)"
              >
                20
              </div>

              <div
                class="table-select-block__select-item"
                :class="
                  countItem === 35 && 'table-select-block__select-item--hidden'
                "
                @click="changeCountItem(35)"
              >
                35
              </div>

              <div
                class="table-select-block__select-item"
                :class="
                  countItem === 50 && 'table-select-block__select-item--hidden'
                "
                @click="changeCountItem(50)"
              >
                50
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="table-page__pagination-block pagination-block">
        <div class="pagination-block__body">
          <div
            class="pagination-block__button pagination-block__button--prev"
            @click="changeSelectPage('minus')"
          >
            <svg>
              <use href="/src/assets/vue.svg#arrow--prev"></use>
            </svg>
          </div>

          <div class="pagination-block__navigation">
            <span
              class="pagination-block__navigation-item"
              :class="
                selectPage === 1 && 'pagination-block__navigation-item--active'
              "
              @click="selectPage = 1"
            >
              {{ 1 }}
            </span>

            <span
              v-if="!(selectPage === 1)"
              class="pagination-block__navigation-separator"
            >
              ...
            </span>

            <span
              v-for="item in pagginationNumber"
              :key="item"
              class="pagination-block__navigation-item"
              :class="
                selectPage === item &&
                'pagination-block__navigation-item--active'
              "
              @click="selectPageChange(item)"
            >
              {{ item }}
            </span>

            <span
              v-if="
                (!(allPages === 1) && selectPage !== allPages) ||
                !(selectPage === allPages)
              "
              class="pagination-block__navigation-separator"
            >
              ...
            </span>

            <span
              v-if="!(allPages === 1)"
              class="pagination-block__navigation-item"
              :class="
                selectPage === allPages &&
                'pagination-block__navigation-item--active'
              "
              @click="selectPageChange(allPages)"
            >
              {{ allPages }}
            </span>
          </div>

          <div
            class="pagination-block__button pagination-block__button--next"
            @click="changeSelectPage('plus')"
          >
            <svg>
              <use href="/src/assets/vue.svg#arrow--next"></use>
            </svg>
          </div>
        </div>
      </div>
    </div>

    <div class="table-page__desktop-table desktop-table">
      <div class="desktop-table__row desktop-table__row--thead">
        <div class="desktop-table__td">Buyer</div>
        <div class="desktop-table__td">Amount</div>
        <div class="desktop-table__td">Hold</div>
        <div class="desktop-table__td">Hold Revert</div>
        <div class="desktop-table__td">Date</div>
      </div>

      <div class="desktop-table__row desktop-table__row--separator"></div>

      <div
        class="desktop-table__row desktop-table__row--tbody"
        v-for="(item, index) in billingData"
        :key="index"
      >
        <div class="desktop-table__td">{{ item.login }}</div>
        <div class="desktop-table__td">{{ item.amount }}</div>
        <div class="desktop-table__td">{{ item.hold }}</div>
        <div class="desktop-table__td">{{ item.hold_revert }}</div>
        <div class="desktop-table__td">
          {{ item.date }}
        </div>
      </div>
    </div>

    <div class="table-page__mobile-table mobile-table">
      <div class="mobile-table__body">
        <div
          v-for="(item, index) in billingData"
          :key="index"
          class="table-card"
        >
          <div class="table-card__body">
            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>Баер</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ item.login }}</span>
              </div>
            </div>

            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>Sum</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ item.amount }}</span>
              </div>
            </div>

            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>D</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ useMoment(item.date, "patched_time") }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="table-page__pagination-block pagination-block pagination-block--down"
    >
      <div class="pagination-block__body">
        <div
          class="pagination-block__button pagination-block__button--prev"
          @click="changeSelectPage('minus')"
        >
          <svg>
            <use href="/src/assets/vue.svg#arrow--prev"></use>
          </svg>
        </div>

        <div class="pagination-block__navigation">
          <span
            class="pagination-block__navigation-item"
            :class="
              selectPage === 1 && 'pagination-block__navigation-item--active'
            "
            @click="selectPage = 1"
          >
            {{ 1 }}
          </span>

          <span
            v-if="!(selectPage === 1)"
            class="pagination-block__navigation-separator"
          >
            ...
          </span>

          <span
            v-for="item in pagginationNumber"
            :key="item"
            class="pagination-block__navigation-item"
            :class="
              selectPage === item && 'pagination-block__navigation-item--active'
            "
            @click="selectPageChange(item)"
          >
            {{ item }}
          </span>

          <span
            v-if="
              (!(allPages === 1) && selectPage !== allPages) ||
              !(selectPage === allPages)
            "
            class="pagination-block__navigation-separator"
          >
            ...
          </span>

          <span
            v-if="!(allPages === 1)"
            class="pagination-block__navigation-item"
            :class="
              selectPage === allPages &&
              'pagination-block__navigation-item--active'
            "
            @click="selectPageChange(allPages)"
          >
            {{ allPages }}
          </span>
        </div>

        <div
          class="pagination-block__button pagination-block__button--next"
          @click="changeSelectPage('plus')"
        >
          <svg>
            <use href="/src/assets/vue.svg#arrow--next"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>
