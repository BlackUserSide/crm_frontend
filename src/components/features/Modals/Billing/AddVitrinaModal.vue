<script></script>
<template>
  <SModal v-if="modalOpenSecond" title="Top up Billing">
    <div class="button--close modal__close-button" @click="changeModalSecond">
      <svg>
        <use href="/src/assets/vue.svg#close"></use>
      </svg>
    </div>

    <div class="modal__content">
      <div class="modal__block">
        <div class="modal__block-part">
          <SSelect :dataOptions="billingDataOptions" @return="secondSelect" />
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
              placeholder="Выберите дату"
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
          placeholder="Сумма"
        />
      </div>
      <div class="modal__buttons">
        <div class="button button--pink">
          <button @click="changeModalSecond">Отменить</button>
        </div>

        <div class="button button--green">
          <button @click="sendModalFirstHandler">Отправить</button>
        </div>
      </div>
    </div>
  </SModal>
</template>
