<script lang="ts" setup>
import { computed, reactive } from "vue-demi";
import { useBilling } from "/@src/stores/billing";

const billingStore = useBilling();
billingStore.getStatData();

const getDataBilling = computed(() => billingStore.topLine);

const dataTopBilling = reactive(getDataBilling);
</script>

<template>
  <div v-if="dataTopBilling">
    <div class="statistic-block statistic-block--billing">
      <div class="statistic-block__body">
        <div class="statistic-block__item">
          <div class="statistic-card">
            <div class="statistic-card__body">
              <div class="statistic-card__icon">
                <p>Sum</p>
              </div>

              <div class="statistic-card__content">
                <div class="statistic-card__title">
                  <p>Total amount</p>
                  <p>{{ dataTopBilling.all_expenses }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="statistic-block__item">
          <div class="statistic-card">
            <div class="statistic-card__body">
              <div class="statistic-card__icon">
                <p>Sme</p>
              </div>

              <div class="statistic-card__content">
                <div class="statistic-card__title">
                  <p>Hold</p>
                  <p>{{ dataTopBilling.hold }} $</p>
                </div>
                <div class="statistic-card__title">
                  <p>Hold Revert</p>
                  <p>{{ dataTopBilling.hold_revert }} $</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="statistic-block__item">
          <div class="statistic-card">
            <div class="statistic-card__body">
              <div class="statistic-card__icon">
                <p>P</p>
              </div>

              <div class="statistic-card__content">
                <div class="statistic-card__title">
                  <p>Profit</p>
                  <p>{{ `${dataTopBilling.profit}` }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="statistic-block__item">
          <div class="statistic-card">
            <div class="statistic-card__body">
              <div class="statistic-card__icon">
                <p>S</p>
              </div>

              <div class="statistic-card__content">
                <div class="statistic-card__title">
                  <p>Salary</p>
                  <p>{{ `${dataTopBilling.salary}` }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
