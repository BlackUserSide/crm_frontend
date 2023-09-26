<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue-demi";
import { useMoment } from "/@src/composable/useMoment";
import { useDashboard } from "/@src/stores/dashboard";
import { useDomains } from "/@src/stores/domain";

const countItem = ref(10);
const activeCount = ref(false);
const checkedItems = ref([]);
const checkedAll = ref(false);
const visible_button = ref(false);
const visible_modal = ref(false);
const domainsStore = useDomains();
const selectPage = ref(1);
const isVisible = ref(false);

domainsStore.get(1, 10);

const pagginationNumber = ref([]);
const getDomain = computed(() => {
  return domainsStore.rows;
});
const getAppPage = computed(() => {
  return domainsStore.max_page;
});

const dataTable = reactive(getDomain);
const allPages = ref(getAppPage);

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

watch(allPages, () => {
  domainsStore.get(selectPage.value, countItem.value);
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

function change_all() {
  if (checkedAll.value) {
    checkedItems.value = [];
    checkedAll.value = false;
  } else {
    checkedItems.value = dataTable.value;
    checkedAll.value = true;
  }
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
watch(
  checkedItems,
  () => {
    if (checkedItems.value.length === 0) visible_button.value = false;
    else visible_button.value = true;
  },
  { deep: true }
);
function change_modal() {
  visible_modal.value = visible_modal.value ? false : true;
}
watch(selectPage, (prev) => {
  domainsStore.get(selectPage.value, countItem.value);
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

const set_visible = () => {
  isVisible.value = isVisible.value ? false : true;
};

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
  <div class="table-page table-page--main-domains">
    <div class="table-page__buttons-block">
      <div class="button button--sum">
        <button @click="set_visible">Add Domain</button>
      </div>
      <div
        class="button button--sum"
        :class="!visible_button && 'button--hide'"
      >
        <button v-on:click="change_modal">Set Domain</button>
      </div>
    </div>

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
        <div class="desktop-table__td">
          <Checkbox
            @change="change_all"
            :dataOptions="dataTable"
            :is-all="checkedAll"
          />
        </div>

        <div class="desktop-table__td">№</div>
        <div class="desktop-table__td">Domain</div>
        <div class="desktop-table__td">User</div>
      </div>

      <div class="desktop-table__row desktop-table__row--separator"></div>

      <div
        class="desktop-table__row desktop-table__row--tbody"
        v-for="(item, index) in dataTable"
        :key="index"
      >
        <div v-if="!item.user_id" class="desktop-table__td">
          <Checkbox @change="change" :dataOptions="item" :is-all="checkedAll" />
        </div>
        <div v-else class="desktop-table__td"></div>
        <div class="desktop-table__td">
          {{ (selectPage - 1) * countItem + index + 1 }}
        </div>
        <div class="desktop-table__td">{{ item.domain }}</div>
        <div class="desktop-table__td">{{ item.login }}</div>
      </div>
    </div>

    <div class="table-page__mobile-table mobile-table">
      <div class="mobile-table__body">
        <div v-for="(item, index) in dataTable" :key="index" class="table-card">
          <div class="table-card__body">
            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>№</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ index }}</span>
              </div>
            </div>

            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>D</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ item.domain }}</span>
              </div>
            </div>

            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>B</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ item.buyer }}</span>
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
  <SModal title="Set Domain" v-if="visible_modal">
    <DomainSetUserModal @set-visible="change_modal" :items="checkedItems" />
  </SModal>
  <SModal v-if="isVisible" title="Add Domain">
    <DomainAddModal />
  </SModal>
</template>
