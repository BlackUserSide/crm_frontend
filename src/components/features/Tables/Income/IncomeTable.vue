<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue-demi";
import { useMoment } from "/@src/composable/useMoment";
import { useIncome } from "/@src/stores/income";
import { useFilter } from "/@src/stores/filter";

const countItem = ref(10);
const activeCount = ref(false);
const filter = useFilter();
const incomeStore = useIncome();
incomeStore.getIncome(1, 10);

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
}

if (incomeStore.activeFilter) incomeStore.activeFilter = false;

const getDataTable = computed(() => {
  return incomeStore.rows.map((e: any) => {
    e.isChecked = false;
    return e;
  });
});

const dataTable = reactive(getDataTable);

const getAppPage = computed(() => {
  return incomeStore.max_page;
});

const allPages = ref(getAppPage);
const selectPage = ref(1);
const pagginationNumber = ref([]);

watch(allPages, () => {
  if (incomeStore.activeFilter) {
    incomeStore.setFilter(selectPage.value, countItem.value, filter.dataFilter);
  } else {
    incomeStore.getIncome(selectPage.value, countItem.value);
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

const activeFilter = computed(() => {
  return filter.timeFilterActive;
});

const getFilter = reactive(activeFilter);

watch(countItem, () => {
  if (incomeStore.activeFilter) {
    incomeStore.setFilter(selectPage.value, countItem.value, filter.dataFilter);
  } else {
    incomeStore.getIncome(selectPage.value, countItem.value);
  }
});

watch(selectPage, (prev) => {
  if (incomeStore.activeFilter) {
    incomeStore.setFilter(selectPage.value, countItem.value, filter.dataFilter);
  } else {
    incomeStore.getIncome(selectPage.value, countItem.value);
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
const test_active = (item: any) => {
  console.log(item);
  return true;
};
</script>

<template>
  <div class="table-page table-page--main-dashboard">
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
        <div class="desktop-table__td">Date</div>
        <div class="desktop-table__td">Date Approve</div>
        <div class="desktop-table__td">PP</div>
        <div class="desktop-table__td">User</div>
        <div class="desktop-table__td">Offer</div>
        <div class="desktop-table__td">Payout</div>
        <div class="desktop-table__td">Sub ID</div>
        <div class="desktop-table__td">Name</div>
        <div class="desktop-table__td">Phone</div>
        <div class="desktop-table__td">Status</div>
      </div>

      <div class="desktop-table__row desktop-table__row--separator"></div>

      <div
        class="desktop-table__row desktop-table__row--tbody"
        v-for="(item, index) in dataTable"
        :key="index"
        :class="item.is_try_cancel && 'highlight-row'"
      >
        <div class="desktop-table__td">
          {{ useMoment(item.createdAt, "time") }}
        </div>
        <div class="desktop-table__td">
          {{ useMoment(item.updatedAt, "time") }}
        </div>
        <div class="desktop-table__td">{{ item.partner }}</div>
        <div class="desktop-table__td">{{ item.login }}</div>
        <div class="desktop-table__td">{{ item.offer }}</div>
        <div class="desktop-table__td">{{ item.payout }} $</div>
        <div class="desktop-table__td">{{ item.sub_id }}</div>
        <div class="desktop-table__td">{{ item.name_lead }}</div>
        <div class="desktop-table__td">{{ item.phone }}</div>
        <div class="desktop-table__td" v-if="item.status === 'approve'">
          <span class="status-marker status-marker--confirm"></span>
          <span>Approved</span>
        </div>
      </div>
    </div>

    <div class="table-page__mobile-table mobile-table">
      <div class="mobile-table__body">
        <div v-for="(item, index) in dataTable" :key="index" class="table-card">
          <div class="table-card__body">
            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>Dt</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ useMoment(item.createdAt, "full_time") }}</span>
              </div>
            </div>
            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>Dt Ap</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ useMoment(item.updatedAt, "full_time") }}</span>
              </div>
            </div>

            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>PP</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ item.partner }}</span>
              </div>
            </div>
            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>User</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ item.login }}</span>
              </div>
            </div>
            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>$</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ item.payout }} $</span>
              </div>
            </div>
            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>Sub</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ item.sub_id }}</span>
              </div>
            </div>
            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>Offer</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ item.offer_id }}</span>
              </div>
            </div>
            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>User</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ item.login }}</span>
              </div>
            </div>

            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>Na</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ item.name_lead }}</span>
              </div>
            </div>

            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>Ph</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ item.phone }}</span>
              </div>
            </div>

            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>St</span>
              </div>

              <div
                class="table-card__item-value"
                v-if="item.status === 'approved'"
              >
                <span class="status-marker status-marker--confirm"></span>
                <span>Approved</span>
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
