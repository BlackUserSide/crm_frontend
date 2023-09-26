<script lang="ts" setup>
import { log } from "console";
import {
  computed,
  reactive,
  ref,
  watch,
  onBeforeMount,
  onMounted,
} from "vue-demi";
import { useNan } from "/@src/composable/useNan";
import { useDashboard } from "/@src/stores/dashboard";

const dashboardStore = useDashboard();
dashboardStore.getStatistic();

const getStatistic = computed(() => {
  return dashboardStore.statistic;
});

// const allLand = ref(getCount);
// const typesLang = reactive(getDataStat);

// const getStat = computed(() => {
//   return dashboardStore.stat;
// });
const stat = reactive(getStatistic);
console.log(stat);

const typesLang = { value: { fullLend: 100, quiz: 0, free: 0 } };
const allLand = 100;
</script>

<template>
  <div class="statistic-block statistic-block--dashboard" v-if="stat">
    <div class="statistic-block__body">
      <div class="statistic-block__item">
        <div class="statistic-card">
          <div class="statistic-card__body">
            <div class="statistic-card__icon">
              <p>Td</p>
            </div>

            <div class="statistic-card__content">
              <div class="statistic-card__title">
                <p>Today</p>
                <p>{{ stat[0] }}</p>
              </div>

              <!-- <div class="statistic-card__description">
                <p>Обработка</p>
                <p>{{ stat.value.hold_today }}</p>
              </div> -->
            </div>
          </div>
        </div>
      </div>

      <div class="statistic-block__item">
        <div class="statistic-card">
          <div class="statistic-card__body">
            <div class="statistic-card__icon">
              <p>Ys</p>
            </div>

            <div class="statistic-card__content">
              <div class="statistic-card__title">
                <p>Yesterday</p>
                <p>{{ stat[1] }}</p>
              </div>

              <!-- <div class="statistic-card__description">
                <p>Обработка</p>
                <p>{{ stat.value.hold_yesterday }}</p>
              </div> -->
            </div>
          </div>
        </div>
      </div>

      <div class="statistic-block__item">
        <div class="statistic-card">
          <div class="statistic-card__body">
            <div class="statistic-card__icon">
              <p>Mn</p>
            </div>

            <div class="statistic-card__content">
              <div class="statistic-card__title">
                <p>Month</p>
                <p>{{ stat[2] }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="statistic-block__item statistic-block__item--tabs">
        <div class="statistic-card">
          <div class="statistic-card__body">
            <div class="statistic-card__tabs-content">
              <div class="statistic-card__tab-value">
                <p>Full</p>
                <p>{{ useNan(((100 * typesLang.value.fullLend) / allLand).toFixed(2)) }}</p>
              </div>

              <div class="statistic-card__tab-value">
                <p>Quiz</p>
                <p>{{ useNan(((100 * typesLang.value.quiz) / allLand).toFixed(2)) }}</p>
              </div>

              <div class="statistic-card__tab-value">
                <p>Free</p>
                <p>{{ useNan(((100 * typesLang.value.free) / allLand).toFixed(2)) }}</p>
              </div>
            </div>

            <div class="statistic-card__tabs-visual">
              <div class="statistic-card__tab statistic-card__tab--first">
                <span
                  :style="{
                    height:
                      (100 * typesLang.value.fullLend) / allLand === 0
                        ? '3%'
                        : (100 * typesLang.value.fullLend) / allLand,
                  }"
                ></span>
              </div>

              <div class="statistic-card__tab statistic-card__tab--second">
                <span
                  :style="{
                    height:
                      (100 * typesLang.value.quiz) / allLand === 0
                        ? '3%'
                        : (100 * typesLang.value.quiz) / allLand,
                  }"
                ></span>
              </div>

              <div class="statistic-card__tab statistic-card__tab--third">
                <span
                  :style="{
                    height:
                      (100 * typesLang.value.free) / allLand === 0
                        ? '3%'
                        : (100 * typesLang.value.free) / allLand,
                  }"
                ></span>
              </div>
            </div>
          </div>
        </div>
      </div> -->
    </div>
  </div>
</template>
