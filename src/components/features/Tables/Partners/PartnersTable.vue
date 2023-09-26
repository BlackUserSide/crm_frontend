<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue-demi";
import { useMoment } from "/@src/composable/useMoment";
import { usePartner } from "/@src/stores/partner";
import { useFilter } from "/@src/stores/filter";
import { log } from "console";

const countItem = ref(10);
const activeCount = ref(false);

const isVisible = ref(false);
const isVisibleEdit = ref(false);

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

const partnerStore = usePartner();
partnerStore.getPartner(1, 10);
const getDataTable = computed(() => {
  return partnerStore.rows;
});

const dataTable = reactive(getDataTable);

const getAppPage = computed(() => {
  return partnerStore.max_page;
});

const allPages = ref(getAppPage); //getAppPage
const selectPage = ref(1);
const pagginationNumber = ref([]);
watch(allPages, () => {
  partnerStore.getPartner(selectPage.value, countItem.value);
});
watch(allPages, () => {
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

const filter = useFilter();

const activeFilter = computed(() => {
  return filter.timeFilterActive;
});

const getFilter = reactive(activeFilter);

watch(selectPage, (prev) => {
  partnerStore.getPartner(selectPage.value, countItem.value);

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

const firstModalElement = ref(null);
const secondModalElement = ref(null);

const first_click = ref(false);
const second_click = ref(false);

document.addEventListener("click", (target: any) => {
  const click_zone = target.srcElement;
  const a =
    first_click.value &&
    firstModalElement.value &&
    !firstModalElement.value?.contains(click_zone);

  if (!first_click.value) {
    first_click.value = true;
  } else if (a) {
    isVisible.value = false;
    first_click.value = false;
  }
});

document.addEventListener("click", (target: any) => {
  const click_zone = target.srcElement;
  const a =
    second_click.value &&
    secondModalElement.value &&
    !secondModalElement.value?.contains(click_zone);

  if (!second_click.value) {
    second_click.value = true;
  } else if (a) {
    isVisibleEdit.value = false;
    second_click.value = false;
  }
});

function set_visible() {
  if (isVisible.value) {
    isVisible.value = false;
    return;
  }
  isVisibleEdit.value = false;
  isVisible.value = true;
}

function set_visible_edit() {
  if (isVisibleEdit.value) {
    isVisibleEdit.value = false;
    return;
  }
  isVisible.value = false;
  isVisibleEdit.value = true;
}
</script>

<template>
  <div class="table-page__buttons-block">
    <div class="button button--sum">
      <button ref="firstModalBtn" v-on:click="set_visible">Add Partner</button>
    </div>
  </div>

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
        <div class="desktop-table__td">№</div>
        <div class="desktop-table__td">Name</div>
        <div class="desktop-table__td">Platform</div>
        <div class="desktop-table__td">URL</div>
        <!-- <div class="desktop-table__td">Status</div> -->
        <div class="desktop-table__td"></div>
        <div class="desktop-table__td"></div>
      </div>

      <div class="desktop-table__row desktop-table__row--separator"></div>

      <div
        class="desktop-table__row desktop-table__row--tbody"
        v-for="(item, index) in dataTable"
        :key="index"
      >
        <div class="desktop-table__td">
          {{ (selectPage - 1) * countItem + index + 1 }}
        </div>
        <div class="desktop-table__td">{{ item.name }}</div>
        <div class="desktop-table__td">{{ item.platform }}</div>
        <div class="desktop-table__td">{{ item.partner_url }}</div>
        <!-- <div class="desktop-table__td">{{ item.status }}</div> -->
        <div class="desktop-table__td">
          <div class="button button--edit">
            <button ref="secondModalBtn" @click="set_visible_edit">Edit</button>
          </div>
        </div>
        <div class="desktop-table__td">
          <div class="button button--delete">
            <button>
              <span>Delete</span>
            </button>
          </div>
        </div>
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
                <span>{{ (selectPage - 1) * countItem + index + 1 }}</span>
              </div>
            </div>

            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>Name</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ item.name }}</span>
              </div>
            </div>

            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>Platform</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ item.platform }}</span>
              </div>
            </div>

            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>URL</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ item.url }}</span>
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
    <div ref="firstModalElement">
      <SModal title="Add Partner" v-if="isVisible">
        <PartnersAddModal @set-visible="set_visible" />
      </SModal>
    </div>

    <div ref="secondModalElement">
      <SModal title="Edit Partner" v-if="isVisibleEdit">
        <PartnersEditModal @set-visible="set_visible_edit" />
      </SModal>
    </div>
  </div>
</template>
