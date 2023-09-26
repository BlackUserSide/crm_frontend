<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue-demi";
import DealsAddModal from "../../Modals/Deals/DealsAddModal.vue";
import DealsEditModal from "../../Modals/Deals/DealsEditModal.vue";
import { useDeal } from "/@src/stores/deal";
import { useFilter } from "/@src/stores/filter";

interface Item {
  countries: any[];
  user_ids: any[];
  createdAt: string;
  id: number;
  limit_lead: number;
  name: string;
  offer: string;
  offer_id: number;
  partner: string;
  partner_id: number;
  status: string;
  updatedAt: string;
}

const countItem = ref(10);
const activeCount = ref(false);
const id = ref();
const isVisible = ref(false);
const isVisibleEdit = ref(false);
const edit_item = ref<Item | null>(null);
const isVisibleDelete = ref(false);
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

const dealStore = useDeal();
dealStore.getDeal(1, 10);
const getDataTable = computed(() => {
  return dealStore.rows;
});

const dataTable = reactive(getDataTable);

const getAppPage = computed(() => {
  return dealStore.max_page;
});

const allPages = ref(getAppPage); //
const selectPage = ref(1);
const pagginationNumber = ref([]);

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
  dealStore.getDeal(selectPage.value, countItem.value);

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

watch(countItem, () => {
  dealStore.getDeal(selectPage.value, countItem.value);
});

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

function set_visible() {
  if (isVisible.value) {
    isVisible.value = false;
    return;
  }
  isVisibleEdit.value = false;
  isVisible.value = true;
}

function set_visible_edit(item: any = null) {
  console.log("🚀 ~ file: DealsTable.vue:170 ~ set_visible_edit ~ item:", item);
  if (isVisibleEdit.value) {
    isVisibleEdit.value = false;
    edit_item.value = null;
    return;
  }
  isVisibleEdit.value = true;
  edit_item.value = item;
}

function set_visible_delete(item_id: number) {
  if (isVisibleDelete.value) isVisibleDelete.value = false;
  else {
    id.value = item_id;
    isVisibleDelete.value = true;
  }
}
function delete_deal() {
  dealStore.deleteDeal(id.value);
  isVisibleDelete.value = false;
}
</script>

<template>
  <div class="table-page__buttons-block">
    <div class="button button--sum">
      <button ref="firstModalBtn" @click="set_visible">Add Deal</button>
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
        <div class="desktop-table__td">Partner</div>
        <div class="desktop-table__td">Offer</div>
        <div class="desktop-table__td">GEO</div>
        <div class="desktop-table__td">Status</div>
        <div class="desktop-table__td">Limit</div>
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
        <div class="desktop-table__td">{{ item.partner }}</div>
        <div class="desktop-table__td">{{ item.offer }}</div>
        <div class="desktop-table__td desktop-table__td--array">
          <span v-for="(country, i) in item.countries" :key="i">
            {{ country.code + "," }}
          </span>
        </div>
        <div class="desktop-table__td">{{ item.status }}</div>
        <div class="desktop-table__td">{{ item.limit_lead }}</div>
        <div class="desktop-table__td">
          <div class="button button--edit">
            <button
              ref="secondModalBtn"
              :key="index"
              @click="set_visible_edit(item)"
            >
              Edit
            </button>
          </div>
        </div>
        <div class="desktop-table__td">
          <div class="button button--delete">
            <button @click="set_visible_delete(item.id)">
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
      <SModal v-if="isVisible" title="Add Deal">
        <DealsAddModal @set-visible="set_visible" />
      </SModal>
    </div>

    <div ref="secondModalElement">
      <SModal title="Edit Deal" v-if="isVisibleEdit">
        <DealsEditModal
          :dataOption="edit_item"
          @set-visible="set_visible_edit"
        />
      </SModal>
    </div>
    <div>
      <SModal title="Are you sure???" v-if="isVisibleDelete">
        <ConfirmModal
          @delete-offer="delete_deal"
          @set-visible="set_visible_delete"
        />
      </SModal>
    </div>
  </div>
</template>
