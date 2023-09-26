<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue-demi";
import { useOffer } from "/@src/stores/offer";

const countItem = ref(10);
const activeCount = ref(false);

const id = ref(0);
const isVisible = ref(false);
const isVisibleEdit = ref(false);
const isVisibleDelete = ref(false);

const currentItem = ref({
  cost: null,
  offer: null,
});
const offerStore = useOffer();
offerStore.getOffer(1, 10);

const getDataTable = computed(() => {
  return offerStore.rows;
});
const dataTable = reactive(getDataTable);

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
  offerStore.getOffer(1, item);
}

const getAppPage = computed(() => {
  return offerStore.max_page;
});

const allPages = ref(getAppPage);
const selectPage = ref(1);
const pagginationNumber = ref([]);

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

watch(countItem, (prev) => {
  offerStore.getOffer(selectPage.value, countItem.value);
});

watch(selectPage, (prev) => {
  offerStore.getOffer(selectPage.value, countItem.value);

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
  if (isVisible.value) isVisible.value = false;
  else isVisible.value = true;
}

function set_visible_delete(item_id: number) {
  if (isVisibleDelete.value) isVisibleDelete.value = false;
  else {
    id.value = item_id;
    isVisibleDelete.value = true;
  }
}

function delete_offer() {
  console.log(id.value);

  offerStore.deleteOffer(id.value);
  isVisibleDelete.value = false;
}

function set_visible_edit(item: any) {
  if (isVisibleEdit.value) {
    isVisibleEdit.value = false;
  } else {
    currentItem.value = item;
    isVisibleEdit.value = true;
  }
}
</script>

<template>
  <div class="table-page__buttons-block">
    <div class="button button--sum">
      <button ref="firstModalBtn" @click="set_visible">Add Offer</button>
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
        <div class="desktop-table__td">Offer</div>
        <div class="desktop-table__td">Cost</div>
        <div class="desktop-table__td">Partner</div>
        <div class="desktop-table__td">GEO</div>
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
        <div class="desktop-table__td">{{ item.offer }}</div>
        <div class="desktop-table__td">{{ item.cost }}</div>
        <div class="desktop-table__td">Lagoon</div>
        <div class="desktop-table__td">UA</div>
        <div class="desktop-table__td">
          <div class="button button--edit">
            <button ref="secondModalBtn" v-on:click="set_visible_edit(item)">
              Edit
            </button>
          </div>
        </div>
        <div class="desktop-table__td">
          <div class="button button--delete">
            <button v-on:click="set_visible_delete(item.id)">
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
                <span>Offer</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ item.offer }}</span>
              </div>
            </div>

            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>Cost</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ item.cost }}</span>
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
      <SModal title="Add Offer" v-if="isVisible">
        <OffersAddModal @set-visible="set_visible" />
      </SModal>
    </div>

    <div ref="secondModalElement">
      <SModal title="Edit Offer" v-if="isVisibleEdit">
        <OffersEditModal
          :dataOption="currentItem"
          @set-visible="set_visible_edit"
        />
      </SModal>
    </div>

    <div>
      <SModal title="Are you sure???" v-if="isVisibleDelete">
        <ConfirmModal
          @delete-offer="delete_offer"
          @set-visible="set_visible_delete"
        />
      </SModal>
    </div>
  </div>
</template>
