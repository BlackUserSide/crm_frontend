<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue-demi";
import { useMoment } from "/@src/composable/useMoment";
import { useFilter } from "/@src/stores/filter";
import { Create, useStream } from "/@src/stores/stream";
import { useNotyf } from "/@src/composable/useNotyf";

const countItem = ref(10);
const activeCount = ref(false);
const notyf = useNotyf();
const isVisible = ref(false);
const isVisibleEdit = ref(false);
const stream_id = ref();
const stream_id_domain = ref();
const open_index = ref(-1);
const isVisibleDomain = ref(false);

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

const streamStore = useStream();
streamStore.getStream(1, 10);
const getDataTable = computed(() => {
  return streamStore.rows;
});

const dataTable = reactive(getDataTable);

const getAppPage = computed(() => {
  return streamStore.max_page;
});

const domain_in_stream = computed(() => {
  return streamStore.domain_in_stream;
});
const domains = ref(domain_in_stream);

const allPages = ref(getAppPage); //getAppPage
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

const filter = useFilter();

const activeFilter = computed(() => {
  return filter.timeFilterActive;
});

const getFilter = reactive(activeFilter);
watch(countItem, (prev) => {
  streamStore.getStream(selectPage.value, countItem.value);
});
watch(selectPage, (prev) => {
  streamStore.getStream(selectPage.value, countItem.value);

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

const secondModalElement = ref(null);
const firstModalBtn = ref(null);
const secondModalBtn = ref(null);
const firstModalElement = ref(null);
const ModalBtn = ref(null);
const ModalElement = ref(null);

watch(open_index, () => {
  if (open_index.value === -1) return;
  streamStore.get_domain_stream(stream_id_domain.value);
});

document.addEventListener("click", (e) => {
  let target = e.target;
  let activeModal = null;

  if (isVisible.value) {
    activeModal = "first";
  }

  if (isVisibleEdit.value) {
    activeModal = "second";
  }
  if (isVisibleDomain.value) {
    activeModal = "domain";
  }

  let its_menu;
  if (activeModal === "first") {
    its_menu =
      target == firstModalElement.value ||
      firstModalElement.value?.contains(target);
  } else if (activeModal === "second") {
    its_menu =
      target == secondModalElement.value ||
      secondModalElement.value?.contains(target);
  } else {
    its_menu =
      target == ModalElement.value || ModalElement.value?.contains(target);
  }

  if (
    activeModal === "second"
      ? !its_menu &&
        !secondModalBtn.value[0]?.contains(target) &&
        isVisibleEdit.value
      : !its_menu && !firstModalBtn.value?.contains(target) && isVisible.value
  ) {
    switch (activeModal) {
      case "first":
        isVisible.value = false;
        break;
      case "second":
        isVisibleEdit.value = false;
        break;
    }
  }
});

async function submit_data(data: Create) {
  const result = await streamStore.postStream(data);
  if (result) {
    streamStore.getStream(1, 10);
    notyf.success("Stream created");
    isVisible.value = false;
  }
}

const toggleDropdown = (index: number, id: number) => {
  if (open_index.value === index) {
    stream_id_domain.value = null;
    open_index.value = -1; // Закрыть выпадающий список
  } else {
    stream_id_domain.value = id;
    open_index.value = index; // Открыть выпадающий список для указанной строки
  }
};

async function submit_domain(data: Create) {
  const result = await streamStore.postDomain(data);
  if (result) {
    streamStore.getStream(1, 10);
    notyf.success("Domain added");
    isVisibleDomain.value = false;
  }
}

function set_visible() {
  if (isVisible.value) isVisible.value = false;
  else isVisible.value = true;
}

function set_visible_edit() {
  if (isVisibleEdit.value) isVisibleEdit.value = false;
  else isVisibleEdit.value = true;
}
function set_visible_domain(id: number) {
  stream_id.value = null;
  if (isVisibleDomain.value) {
    isVisibleDomain.value = false;
  } else {
    stream_id.value = id;
    isVisibleDomain.value = true;
  }
}
async function delete_domain(id: number, domain_id: number) {
  const result = await streamStore.deleteDomain({ id, domain_id });
  if (result) {
    streamStore.getStream(1, 10);
    stream_id_domain.value = null;
    open_index.value = -1;
    notyf.success("Domain Deleted");
  }
}
</script>

<template>
  <div class="table-page__buttons-block">
    <div class="button button--sum">
      <button ref="firstModalBtn" v-on:click="set_visible">Add Stream</button>
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
        <div class="desktop-table__td">Deal</div>
        <div class="desktop-table__td">Countries</div>
        <div class="desktop-table__td">Comment</div>
        <div class="desktop-table__td">Dates</div>
        <!-- <div class="desktop-table__td">Status</div> -->
        <div class="desktop-table__td"></div>
        <div class="desktop-table__td"></div>
        <div class="desktop-table__td"></div>
      </div>

      <div class="desktop-table__row desktop-table__row--separator"></div>

      <template v-for="(item, index) in dataTable" :key="index">
        <div class="desktop-table__row desktop-table__row--tbody">
          <div
            v-on:click="toggleDropdown(index, item.id)"
            class="desktop-table__td"
          >
            {{ (selectPage - 1) * countItem + index + 1 }}
          </div>
          <div
            v-on:click="toggleDropdown(index, item.id)"
            class="desktop-table__td"
          >
            {{ item.name }}
          </div>
          <div
            v-on:click="toggleDropdown(index, item.id)"
            class="desktop-table__td"
          >
            {{ item.deal }}
          </div>
          <div
            v-on:click="toggleDropdown(index, item.id)"
            class="desktop-table__td"
          >
            {{ item.countries.map((e: any) => e.code).toString() }}
          </div>
          <div
            v-on:click="toggleDropdown(index, item.id)"
            class="desktop-table__td"
          >
            {{ item.comment }}
          </div>
          <div
            v-on:click="toggleDropdown(index, item.id)"
            class="desktop-table__td"
          >
            {{ useMoment(item.createdAt, "patched_time") }}
          </div>

          <!-- <div class="desktop-table__td">{{ item.status }}</div> -->
          <div class="desktop-table__td">
            <div class="button button--edit">
              <button
                ref="secondModalBtn"
                v-on:click="set_visible_domain(item.id)"
              >
                Add
              </button>
            </div>
          </div>
          <div class="desktop-table__td">
            <div class="button button--edit">
              <button ref="secondModalBtn" v-on:click="set_visible_edit">
                Edit
              </button>
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
        <template v-for="(domain, i) in domains" :key="i">
          <div
            class="desktop-table__row desktop-table__row--tbody"
            :class="{ open: open_index === index, close: open_index !== index }"
          >
            <div class="desktop-table__td">
              {{ domain.domain }}
            </div>

            <div class="desktop-table__td">
              <div class="button button--delete">
                <button v-on:click="delete_domain(item.id, domain.id)">
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </template>
      </template>
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
    <div ref="ModalElement">
      <SModal title="Add Domain" v-if="isVisibleDomain">
        <StreamAddDomain
          :dataOption="stream_id"
          @submit-data="submit_domain"
          @set-visible="set_visible_domain"
        />
      </SModal>
    </div>
    <div ref="firstModalElement">
      <SModal title="Add Stream" v-if="isVisible">
        <StreamAddModal @submit-data="submit_data" @set-visible="set_visible" />
      </SModal>
    </div>

    <div ref="secondModalElement">
      <SModal title="Edit Stream" v-if="isVisibleEdit">
        <StreamEditModal @set-visible="set_visible_edit" />
      </SModal>
    </div>
  </div>
</template>
