<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue-demi";
import { useMoment } from "/@src/composable/useMoment";
import { useDashboard } from "/@src/stores/dashboard";
import { useFilter } from "/@src/stores/filter";

const countItem = ref(10);
const activeCount = ref(false);
const checkedItems = ref([]);
const checkedAll = ref(false);
const checked_name = ref({
  index: null,
  isPress: false,
});

const visible_button = ref(false);
const activeSort = ref({ key: "", count: 0 });
const visible_modal = ref(false);
const filter = useFilter();
const dashboardStore = useDashboard();
if (!filter.period_filter && filter.period_router === "app") {
  console.log(filter.period_filter, "filter.period_filter");
  dashboardStore.getDashboard(1, 10);
}

function change(id: any) {
  const index: any = dataTable.value.findIndex((e: any) => e.id === id);

  dataTable.value[index].isChecked = dataTable.value[index].isChecked
    ? false
    : true;

  if (dataTable.value[index].isChecked)
    checkedItems.value.push(dataTable.value[index]);
  else
    checkedItems.value = checkedItems.value.filter((e: any) =>
      e.id === dataTable.value[index].id ? false : true
    );
}

function change_modal() {
  visible_modal.value = visible_modal.value ? false : true;
}

watch(
  checkedItems,
  () => {
    if (checkedItems.value.length === 0) visible_button.value = false;
    else visible_button.value = true;
  },
  { deep: true }
);

function change_all() {
  if (checkedAll.value) {
    checkedItems.value = [];
    checkedAll.value = false;
  } else {
    checkedItems.value = dataTable.value;
    checkedAll.value = true;
  }
}

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

if (dashboardStore.activeFilter) dashboardStore.activeFilter = false;

const getDataTable = computed(() => {
  return dashboardStore.rows.map((e: any) => {
    e.isChecked = false;
    return e;
  });
});

const dataTable = reactive(getDataTable);

const getAppPage = computed(() => {
  return dashboardStore.max_page;
});

const allPages = ref(getAppPage);
const selectPage = ref(1);
const pagginationNumber = ref([]);

watch(allPages, () => {
  if (dashboardStore.activeFilter) {
    dashboardStore.setFilter(
      selectPage.value,
      countItem.value,
      filter.dataFilter
    );
  } else if (filter.period_filter && filter.period_router === "app") {
    filter.offset = selectPage.value;
    filter.limit = countItem.value;
    filter.setActiveFilter(filter.timeFilterActive, "app");
  } else {
    dashboardStore.getDashboard(selectPage.value, countItem.value);
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
  if (dashboardStore.activeFilter) {
    dashboardStore.setFilter(
      selectPage.value,
      countItem.value,
      filter.dataFilter
    );
  } else if (filter.period_filter && filter.period_router === "app") {
    filter.offset = selectPage.value;
    filter.limit = countItem.value;
    filter.setActiveFilter(filter.timeFilterActive, "app");
  } else {
    dashboardStore.getDashboard(selectPage.value, countItem.value);
  }
});

watch(selectPage, (prev) => {
  if (dashboardStore.activeFilter) {
    dashboardStore.setFilter(
      selectPage.value,
      countItem.value,
      filter.dataFilter
    );
  } else if (filter.period_filter && filter.period_router === "app") {
    filter.offset = selectPage.value;
    filter.limit = countItem.value;
    filter.setActiveFilter(filter.timeFilterActive, "app");
  } else {
    dashboardStore.getDashboard(selectPage.value, countItem.value);
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

function setActiveSort(key: string) {
  if (activeSort.value.key !== key) {
    activeSort.value = {
      count: 0,
      key,
    };
    activeSort.value.count = activeSort.value.count + 1;
    return;
  }
  activeSort.value.count = activeSort.value.count + 1;
  if (activeSort.value.count === 3) {
    activeSort.value = {
      key: "",
      count: 0,
    };
    return;
  }
}
const defaultArray = ref(dashboardStore.rows);

function sortStringType(key: string) {
  const data = [...dashboardStore.rows];
  setActiveSort(key);

  if (activeSort.value.count === 0) dataTable.value = defaultArray.value;
  if (activeSort.value.count === 1) return sortString(key, data);
  if (activeSort.value.count === 2) return sortStringReverse(key, data);
}

function sortNumberType(key: string) {
  const data = [...dashboardStore.rows];

  setActiveSort(key);
  if (activeSort.value.count === 0) dataTable.value = defaultArray.value;
  if (activeSort.value.count === 1) return sortId(key, data);
  if (activeSort.value.count === 2) return sortIdReverse(key, data);

  dataTable.value = dashboardStore.rows;
}

function sortId(key: string, data: any) {
  dataTable.value.sort((a: any, b: any) => a[key] - b[key]);
}

function sortString(key: string, data: any) {
  dataTable.value.sort((a: any, b: any) => a[key].localeCompare(b[key]));
}

function sortStringReverse(key: string, data: any) {
  dataTable.value.sort((a: any, b: any) => b[key].localeCompare(a[key]));
}

function sortIdReverse(key: string, data: any) {
  dataTable.value.sort((a: any, b: any) => b[key] - a[key]);
}
function check_name(name: string, index: number) {
  let short_name = "";
  if (checked_name.value.index === index && checked_name.value.isPress) {
    return name;
  }
  if (name.length > 20) {
    for (let i = 0; i < 20; i++) {
      short_name += name[i];
    }
    return short_name + "...";
  } else return name;
}

function set_full_name(index: number) {
  checked_name.value = {
    index: index,
    isPress: checked_name.value.isPress ? false : true,
  };
}
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

        <div class="button button--black"><button>Delete Test</button></div>
        <div
          class="button button--black"
          :class="!visible_button && 'button--hide'"
        >
          <button v-on:click="change_modal">Re-registration</button>
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
        <div class="desktop-table__td">
          <Checkbox
            @change="change_all"
            :dataOptions="dataTable"
            :is-all="checkedAll"
          />
        </div>
        <div class="desktop-table__td">№</div>
        <div class="desktop-table__td">ID</div>
        <div class="desktop-table__td" @click="sortStringType('sub_id')">
          <svg
            v-if="activeSort.key === 'sub_id'"
            :class="activeSort.count === 2 && 'svg--active'"
          >
            <use href="/src/assets/vue.svg#arrow--down"></use>
          </svg>

          Sub ID
        </div>
        <div class="desktop-table__td" @click="sortStringType('partner')">
          <svg
            v-if="activeSort.key === 'partner'"
            :class="activeSort.count === 2 && 'svg--active'"
          >
            <use href="/src/assets/vue.svg#arrow--down"></use>
          </svg>
          PP
        </div>
        <div class="desktop-table__td" @click="sortStringType('login')">
          <svg
            v-if="activeSort.key === 'login'"
            :class="activeSort.count === 2 && 'svg--active'"
          >
            <use href="/src/assets/vue.svg#arrow--down"></use>
          </svg>
          User
        </div>
        <div class="desktop-table__td" @click="sortStringType('country')">
          <svg
            v-if="activeSort.key === 'country'"
            :class="activeSort.count === 2 && 'svg--active'"
          >
            <use href="/src/assets/vue.svg#arrow--down"></use>
          </svg>
          Geo
        </div>
        <div class="desktop-table__td" @click="sortStringType('domain')">
          <svg
            v-if="activeSort.key === 'domain'"
            :class="activeSort.count === 2 && 'svg--active'"
          >
            <use href="/src/assets/vue.svg#arrow--down"></use>
          </svg>
          Href
        </div>
        <div class="desktop-table__td" @click="sortNumberType('deal_id')">
          <svg
            v-if="activeSort.key === 'deal_id'"
            :class="activeSort.count === 2 && 'svg--active'"
          >
            <use href="/src/assets/vue.svg#arrow--down"></use>
          </svg>
          Offer
        </div>
        <div class="desktop-table__td" @click="sortStringType('createdAt')">
          <svg
            v-if="activeSort.key === 'createdAt'"
            :class="activeSort.count === 2 && 'svg--active'"
          >
            <use href="/src/assets/vue.svg#arrow--down"></use>
          </svg>
          Date
        </div>
        <div class="desktop-table__td" @click="sortStringType('name_lead')">
          <svg
            v-if="activeSort.key === 'name_lead'"
            :class="activeSort.count === 2 && 'svg--active'"
          >
            <use href="/src/assets/vue.svg#arrow--down"></use>
          </svg>
          Name
        </div>
        <div class="desktop-table__td" @click="sortStringType('phone')">
          <svg
            v-if="activeSort.key === 'phone'"
            :class="activeSort.count === 2 && 'svg--active'"
          >
            <use href="/src/assets/vue.svg#arrow--down"></use>
          </svg>
          Phone
        </div>
        <div class="desktop-table__td" @click="sortNumberType('status_id')">
          <svg
            v-if="activeSort.key === 'status_id'"
            :class="activeSort.count === 2 && 'svg--active'"
          >
            <use href="/src/assets/vue.svg#arrow--down"></use>
          </svg>
          Status
        </div>
      </div>

      <div class="desktop-table__row desktop-table__row--separator"></div>

      <div
        class="desktop-table__row desktop-table__row--tbody"
        v-for="(item, index) in dataTable"
        :key="index"
      >
        <div class="desktop-table__td">
          <Checkbox @change="change" :dataOptions="item" :is-all="checkedAll" />
        </div>
        <div class="desktop-table__td">
          {{ (selectPage - 1) * countItem + index + 1 }}
        </div>
        <div class="desktop-table__td">{{ item.id }}</div>
        <div class="desktop-table__td">{{ item.sub_id }}</div>
        <div class="desktop-table__td">{{ item.partner }}</div>
        <div class="desktop-table__td">{{ item.login }}</div>
        <div class="desktop-table__td">{{ item.country }}</div>
        <div class="desktop-table__td">{{ item.domain }}</div>
        <div class="desktop-table__td">{{ item.offer }}</div>
        <div class="desktop-table__td">
          {{ useMoment(item.createdAt, "time") }}
        </div>
        <div class="desktop-table__td" @click="set_full_name(index)">
          {{ check_name(item.name_lead, index) }}
        </div>
        <div class="desktop-table__td">{{ item.phone }}</div>

        <div class="desktop-table__td" v-if="item.status === 'hold'">
          <span class="status-marker status-marker--proccess"></span>
          <span>Hold</span>
        </div>

        <div class="desktop-table__td" v-if="item.status === 'approve'">
          <span class="status-marker status-marker--confirm"></span>
          <span>Approved</span>
        </div>

        <div class="desktop-table__td" v-if="item.status === 'canceled'">
          <span class="status-marker status-marker--closed"></span>
          <span>Canceled</span>
        </div>

        <div class="desktop-table__td" v-if="item.status === 'trash'">
          <span class="status-marker status-marker--trash"></span>
          <span>Trash</span>
        </div>
        <div class="desktop-table__td" v-if="item.status === 'test'">
          <span class="status-marker status-marker--trash"></span>
          <span>Test</span>
        </div>
        <div class="desktop-table__td" v-if="item.status === 'pending'">
          <span class="status-marker status-marker--trash"></span>
          <span>Pending</span>
        </div>
      </div>
    </div>

    <div class="table-page__mobile-table mobile-table">
      <div class="mobile-table__body">
        <div v-for="(item, index) in dataTable" :key="index" class="table-card">
          <div class="table-card__body">
            <div class="table-card__item">
              <!-- <div class="table-card__item-label">
                <span><Checkbox @change="change" :dataOptions="item" :is-all="true" /></span>
              </div> -->

              <div class="table-card__item-value">
                <span
                  ><Checkbox
                    @change="change"
                    :dataOptions="item"
                    :is-all="checkedAll"
                /></span>
              </div>
            </div>

            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>№</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ index + 1 }}</span>
              </div>
            </div>

            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>id</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ item.id }}</span>
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
                <span>GEO</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ item.country }}</span>
              </div>
            </div>

            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>Href</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ item.domain }}</span>
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
                <span>Dt</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ useMoment(item.createdAt, "full_time") }}</span>
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

              <div class="table-card__item-value" v-if="item.status === 'hold'">
                <span class="status-marker status-marker--proccess"></span>
                <span>Hold</span>
              </div>

              <div
                class="table-card__item-value"
                v-if="item.status === 'approved'"
              >
                <span class="status-marker status-marker--confirm"></span>
                <span>Approved</span>
              </div>

              <div
                class="table-card__item-value"
                v-if="item.status === 'canceled'"
              >
                <span class="status-marker status-marker--closed"></span>
                <span>Canceled</span>
              </div>

              <div
                class="table-card__item-value"
                v-if="item.status === 'trash'"
              >
                <span class="status-marker status-marker--trash"></span>
                <span>Треш</span>
              </div>

              <div class="table-card__item-value" v-if="item.status === 'test'">
                <span class="status-marker status-marker--proccess"></span>
                <span>Test</span>
              </div>
              <div
                class="table-card__item-value"
                v-if="item.status === 'pending'"
              >
                <span class="status-marker status-marker--proccess"></span>
                <span>Pending</span>
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

      <SModal title="Re-registration" v-if="visible_modal">
        <ReRegistrationModal
          @set-visible="change_modal"
          :items="checkedItems"
        />
      </SModal>
    </div>
  </div>
</template>
