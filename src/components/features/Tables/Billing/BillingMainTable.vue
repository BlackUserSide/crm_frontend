<script lang="ts" setup>
import { computed, reactive, ref, watch } from "vue-demi";
import { useError } from "/@src/composable/useError";
import { useBilling } from "/@src/stores/billing";
import { useMoment } from "/@src/composable/useMoment";
import { useNotyf } from "/@src/composable/useNotyf";
import { useFilter } from "/@src/stores/filter";

const countItem = ref(10);
const activeCount = ref(false);

const dataModalFirst = reactive({
  user: {},
  date: "",
  amount: null,
  comment: "",
  quantity: "",
});

let dataModalSecond = reactive({
  amount: null,
  userId: 0,
  date: "",
});

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
  billingStore.getDataBilling(selectPage.value, countItem.value);
  filter.limit = countItem.value;
}

const notyf = useNotyf();
const modalOpenFirst = ref(false);
const modalOpenSecond = ref(false);

const filter = useFilter();

const billingStore = useBilling();
billingStore.getDataBilling(1, 10);

const getBillingData = computed(() => billingStore.dataBilling.rows);
const billingData = reactive(getBillingData);

billingStore.getDataBillingUser();

const getBillingUser = computed(() => billingStore.billingUser);
const billingDataOptions = reactive(getBillingUser);

const activePicker = ref(false);
const test = ref("");
const dateSecond = ref("");
const validInput = ref("");
const validInputSecond = ref("");

function testError() {
  useError("Error: Что то не так с сервером, знаете куда писать)");
}

function changeActiveDataPicker() {
  if (activePicker.value) {
    activePicker.value = false;
    return;
  }
  activePicker.value = true;
}

watch(test, (prev) => {
  dataModalFirst.date = `${useMoment(prev, "full_time")}`;
  validInput.value = `${useMoment(prev, "full_time")}`;
  console.log(test.value, "data single");

  setTimeout(() => {
    if (activePicker.value) activePicker.value = false;
  }, 0);
});

watch(dateSecond, (prev) => {
  dataModalSecond.date = `${useMoment(prev, "full_time")}`;
  validInputSecond.value = `${useMoment(prev, "full_time")}`;
  setTimeout(() => {
    if (activePicker.value) activePicker.value = false;
  }, 0);
});

function testSelect(test: any) {
  dataModalFirst.user = test.value.id;
}

function secondSelect(test: any) {
  dataModalSecond.userId = test.value.id;
}

function changeModalFirst() {
  if (modalOpenFirst.value) {
    modalOpenFirst.value = false;
    return;
  }
  modalOpenSecond.value = false;
  modalOpenFirst.value = true;
}

function changeModalSecond() {
  if (modalOpenSecond.value) {
    modalOpenSecond.value = false;
    return;
  }
  modalOpenFirst.value = false;
  modalOpenSecond.value = true;
}

async function sendModalFirstHandler() {
  const result = await billingStore.sendModalSecond(dataModalSecond);
  if (result) {
    billingStore.getDataBillingHistory(1, 10);
    billingStore.getDataBilling(selectPage.value, 10);
    billingStore.getStatData();
    changeModalSecond();
    notyf.success("Data submit successful");
    dataModalSecond.amount = null;
    dataModalSecond.date = "";
    dataModalSecond.userId = 0;
    validInputSecond.value = "";
  }
}

async function sendModalSecondHandler() {
  const result = await billingStore.sendDataModalFirst(dataModalFirst);
  if (result) {
    billingStore.getDataBillingExpenses(1, 10);
    billingStore.getDataBilling(selectPage.value, 10);
    billingStore.getDataBillingHistory(1, 10);
    billingStore.getStatData();
    changeModalFirst();
    notyf.success("Data submit successful");
    dataModalFirst.user = {};
    dataModalFirst.amount = null;
    dataModalFirst.quantity = "";
    dataModalFirst.date = "";
    dataModalFirst.comment = "";
    validInput.value = "";
  }
}

const getAppPage = computed(() => {
  return billingStore.dataBilling.max_page;
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
    billingStore.getDataBilling(selectPage.value, countItem.value);
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
    billingStore.getDataBilling(selectPage.value, countItem.value);
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
    billingStore.getDataBilling(selectPage.value, countItem.value);
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

function outsideClick() {
  modalOpenFirst.value = false;
  modalOpenSecond.value = false;
}

const secondModalElement = ref(null);
const firstModalBtn = ref(null);
const secondModalBtn = ref(null);
const firstModalElement = ref(null);

document.addEventListener("click", (e) => {
  let target = e.target;
  console.log(target, "target");

  let activeModal = null;
  if (modalOpenFirst.value) {
    activeModal = "first";
  }

  if (modalOpenSecond.value) {
    activeModal = "second";
  }

  let its_menu =
    activeModal === "second"
      ? target == secondModalElement.value ||
        secondModalElement.value?.contains(target)
      : target == firstModalElement.value ||
        firstModalElement.value?.contains(target);
  console.log(
    firstModalElement.value?.contains(target),
    "firstModalElement.value?.contains(target)"
  );

  if (
    activeModal === "second"
      ? !its_menu && !firstModalBtn.value?.contains(target) && modalOpenFirst
      : !its_menu && !secondModalBtn.value?.contains(target) && modalOpenFirst
  ) {
    switch (activeModal) {
      case "first":
        modalOpenFirst.value = false;
        break;
      case "second":
        modalOpenSecond.value = false;
        break;
    }
  }
});
</script>

<template v-if="billing.length > 0">
  <div class="table-page table-page--main-billing">
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

    <div class="table-page__buttons-block">
      <div class="button button--sum">
        <button ref="secondModalBtn" @click="changeModalFirst">
          Top up expense
        </button>
      </div>
      <div class="button button--sum">
        <button ref="firstModalBtn" @click="changeModalSecond">
          Top up vitrina
        </button>
      </div>
    </div>

    <div class="table-page__desktop-table desktop-table">
      <div class="desktop-table__row desktop-table__row--thead">
        <div class="desktop-table__td">Buyer</div>
        <div class="desktop-table__td">Sum Billing</div>
        <div class="desktop-table__td">Sum Expenses</div>
        <div class="desktop-table__td">Hold</div>
        <div class="desktop-table__td">Hold Revert</div>
        <div class="desktop-table__td">Showcase</div>
        <div class="desktop-table__td">Profit</div>
        <div class="desktop-table__td">Salary</div>
      </div>

      <div class="desktop-table__row desktop-table__row--separator"></div>

      <div
        class="desktop-table__row desktop-table__row--tbody"
        v-for="(item, index) in billingData"
        :key="index"
      >
        <div class="desktop-table__td">{{ item.login }}</div>
        <div class="desktop-table__td">{{ item.amount }}</div>
        <div class="desktop-table__td">{{ item.expense }}</div>
        <div class="desktop-table__td">{{ item.hold }}</div>
        <div class="desktop-table__td">{{ item.hold_revert }}</div>
        <div class="desktop-table__td">{{ item.showcase }}</div>
        <div class="desktop-table__td">{{ item.profit }}</div>
        <div class="desktop-table__td">{{ item.salary }}</div>
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
                <span>Sme</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ item.expense }}</span>
              </div>
            </div>

            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>Cpl</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ item.cpl_expense }}</span>
              </div>
            </div>

            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>Cpa</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ item.cpa_expense }}</span>
              </div>
            </div>

            <div class="table-card__item">
              <div class="table-card__item-label">
                <span>ЗП</span>
              </div>

              <div class="table-card__item-value">
                <span>{{ item.salary_expense }}</span>
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

    <div class="table-page__modal-block" ref="firstModalElement">
      <SModal v-if="modalOpenFirst" title="Top up Expense">
        <div
          class="button--close modal__close-button"
          @click="changeModalFirst"
        >
          <svg>
            <use href="/src/assets/vue.svg#close"></use>
          </svg>
        </div>

        <div class="modal__content">
          <div class="modal__block">
            <div class="modal__block-part">
              <SSelect :dataOptions="billingDataOptions" @return="testSelect" />
            </div>

            <div class="modal__block-part">
              <div
                class="calendar__date-preview"
                @click="changeActiveDataPicker"
              >
                <input
                  v-model="validInput"
                  class="input"
                  :class="activePicker && 'input--focus'"
                  placeholder="Select Date"
                  type="text"
                  disabled
                />
              </div>

              <div
                class="calendar__dropdown"
                :class="activePicker && 'calendar__dropdown--active'"
              >
                <div id="calendar-block">
                  <DateSinglePicker v-if="activePicker" v-model="test" />
                </div>
              </div>
            </div>
          </div>

          <div class="modal__block">
            <input
              class="input"
              v-model="dataModalFirst.amount"
              type="text"
              placeholder="Amount"
            />
          </div>

          <div class="modal__block">
            <input
              class="input"
              v-model="dataModalFirst.comment"
              type="text"
              placeholder="Comment"
            />
          </div>

          <div class="modal__block">
            <input
              class="input"
              v-model="dataModalFirst.quantity"
              type="text"
              placeholder="Count"
            />
          </div>

          <div class="modal__buttons">
            <div class="button button--pink">
              <button @click="changeModalFirst">Cancale</button>
            </div>

            <div class="button button--green">
              <button @click="sendModalSecondHandler">Send</button>
            </div>
          </div>
        </div>
      </SModal>
    </div>

    <div class="table-page__modal-block" ref="secondModalElement">
      <SModal v-if="modalOpenSecond" title="Top up Vitrina">
        <div
          class="button--close modal__close-button"
          @click="changeModalSecond"
        >
          <svg>
            <use href="/src/assets/vue.svg#close"></use>
          </svg>
        </div>

        <div class="modal__content">
          <div class="modal__block">
            <div class="modal__block-part">
              <SSelect
                :dataOptions="billingDataOptions"
                @return="secondSelect"
              />
            </div>

            <div class="modal__block-part">
              <div
                class="calendar__date-preview"
                v-on:click="changeActiveDataPicker"
              >
                <input
                  v-model="validInputSecond"
                  class="input"
                  :class="activePicker && 'input--focus'"
                  placeholder="Select Date"
                  type="text"
                  disabled
                />
              </div>

              <div
                class="calendar__dropdown"
                :class="activePicker && 'calendar__dropdown--active'"
              >
                <div id="calendar-block">
                  <DateSinglePicker v-if="activePicker" v-model="dateSecond" />
                </div>
              </div>
            </div>
          </div>

          <div class="modal__block">
            <input
              class="input"
              v-model="dataModalSecond.amount"
              type="text"
              placeholder="Amount"
            />
          </div>

          <div class="modal__buttons">
            <div class="button button--pink">
              <button @click="changeModalSecond">Cancele</button>
            </div>

            <div class="button button--green">
              <button @click="sendModalFirstHandler">Send</button>
            </div>
          </div>
        </div>
      </SModal>
    </div>
  </div>
</template>
