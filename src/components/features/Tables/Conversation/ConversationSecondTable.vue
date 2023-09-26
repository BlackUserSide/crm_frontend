<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue-demi";

import { useMoment } from "/@src/composable/useMoment";
import { useNan } from "/@src/composable/useNan";
import { useConversation } from "/@src/stores/conversation";
import { useDashboard } from "/@src/stores/dashboard";
import { useFilter } from "/@src/stores/filter";

const countItem = ref(10);
const activeCount = ref(false);
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
}

const conversationStore = useConversation();
conversationStore.getDataSecond(1, 10);
const getDataTable = computed(() => {
  return conversationStore.conversationSecond.rows;
});
const dataTable = reactive(getDataTable);

const getAppPage = computed(() => {
  return conversationStore.conversationSecond.max_page;
});

const allPages = ref(getAppPage);
const selectPage = ref(1);
const pagginationNumber = ref([]);

watch(allPages, () => {
  if (conversationStore.activeFilter) {
    conversationStore.setFilter(
      selectPage.value,
      countItem.value,
      filter.dataFilter
    );
  } else if (filter.period_filter && filter.period_router === "conversation") {
    filter.offset = selectPage.value;
    filter.limit = countItem.value;
    filter.setActiveFilter(filter.timeFilterActive, "conversation");
  } else {
    conversationStore.getConversation(selectPage.value, countItem.value);
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
  if (conversationStore.activeFilter) {
    conversationStore.setFilter(
      selectPage.value,
      countItem.value,
      filter.dataFilter
    );
  } else if (filter.period_filter && filter.period_router === "conversation") {
    filter.offset = selectPage.value;
    filter.limit = countItem.value;
    filter.setActiveFilter(filter.timeFilterActive, "conversation");
  } else {
    conversationStore.getConversation(selectPage.value, countItem.value);
  }
});
if (conversationStore.activeFilter) conversationStore.activeFilter = false;
watch(selectPage, (prev) => {
  if (conversationStore.activeFilter) {
    conversationStore.setFilter(
      selectPage.value,
      countItem.value,
      filter.dataFilter
    );
  } else if (filter.period_filter && filter.period_router === "conversation") {
    filter.offset = selectPage.value;
    filter.limit = countItem.value;
    filter.setActiveFilter(filter.timeFilterActive, "conversation");
  } else {
    conversationStore.getDataSecond(selectPage.value, countItem.value);
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
</script>

<template>
  <div class="table-page table-page--second-conversation">
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
              v-for="item in pagginationNumber.value"
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
        <div class="desktop-table__td">Offer</div>
        <div class="desktop-table__td">Lead</div>
        <div class="desktop-table__td">Valid Lead</div>
        <div class="desktop-table__td">Approve</div>
        <div class="desktop-table__td">Approve All</div>
        <div class="desktop-table__td">Approve Valid</div>
        <div class="desktop-table__td">Rejected</div>
        <div class="desktop-table__td">Rejected All</div>
        <div class="desktop-table__td">Rejected Valid</div>
        <div class="desktop-table__td">Hold</div>
        <div class="desktop-table__td">Trash</div>
        <div class="desktop-table__td">Payout</div>
      </div>

      <div class="desktop-table__row desktop-table__row--separator"></div>

      <div
        class="desktop-table__row desktop-table__row--tbody"
        v-for="(item, index) in dataTable"
        :key="index"
      >
        <div class="desktop-table__td">{{ item.name }}</div>
        <div class="desktop-table__td">{{ item.count }}</div>
        <div class="desktop-table__td">{{ item.count - item.trash }}</div>

        <div class="desktop-table__td">{{ item.approve }}</div>
        <div class="desktop-table__td">
          {{ useNan(((100 * item.approve) / item.count).toFixed(1)) }}%
        </div>
        <div class="desktop-table__td">
          {{
            useNan(
              ((100 * item.approve) / (item.count - item.trash)).toFixed(1)
            )
          }}%
        </div>
        <div class="desktop-table__td">{{ item.canceled }}</div>
        <div class="desktop-table__td">
          {{ useNan(((100 * item.canceled) / item.count).toFixed(1)) }}%
        </div>

        <div class="desktop-table__td">
          {{
            useNan(
              ((100 * item.cenceled) / (item.count - item.trash)).toFixed(1)
            )
          }}%
        </div>
        <div class="desktop-table__td">
          {{ item.hold }} ({{
            useNan(((100 * item.hold) / item.count).toFixed(1))
          }}%)
        </div>
        <div class="desktop-table__td">
          {{ item.trash }} ({{
            useNan(((100 * item.trash) / item.count).toFixed(1))
          }}%)
        </div>
        <div class="desktop-table__td">{{ item.payout }} $</div>
      </div>
    </div>

    <div class="table-page__mobile-table mobile-table">
      <div class="mobile-table__body">
        <div v-for="(item, index) in dataTable" :key="index" class="table-card">
          <div class="table-card__body">
            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>Оффер</span>
              </div>
              <div class="table-card__item-value">
                <span>{{ item.name }}</span>
              </div>
            </div>

            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>Лиды</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ item.count }}</span>
              </div>
            </div>

            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>VL</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ item.count - item.trash }}</span>
              </div>
            </div>

            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>VL%</span>
              </div>

              <div class="table-card__item-value">
                <span>{{
                  (item.canceled / (item.approve - item.canceled)) * 100
                }}</span>
              </div>
            </div>

            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>APQ</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ item.approve }}</span>
              </div>
            </div>

            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>APA</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ useNan((100 * item.approve) / item.count) }}</span>
              </div>
            </div>

            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>APV</span>
              </div>

              <div class="table-card__item-value">
                <span>{{
                  useNan((100 * item.approve) / (item.count - item.trash))
                }}</span>
              </div>
            </div>

            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>CLC</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ item.canceled }}</span>
              </div>
            </div>

            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>CLA</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ useNan((100 * item.canceled) / item.count) }}</span>
              </div>
            </div>

            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>CLV</span>
              </div>

              <div class="table-card__item-value">
                <span>{{
                  useNan((100 * item.canceled) / (item.count - item.trash))
                }}</span>
              </div>
            </div>

            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>HQ</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ item.hold }}</span>
              </div>
            </div>

            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>H%</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ useNan((100 * item.hold) / item.count) }}</span>
              </div>
            </div>

            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>T</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ item.trash }}</span>
              </div>
            </div>

            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>T</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ useNan((100 * item.trash) / item.count) }}</span>
              </div>
            </div>
            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>$</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ item.payout }}</span>
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
