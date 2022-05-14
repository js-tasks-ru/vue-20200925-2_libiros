<template>
  <div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button
            class="rangepicker__selector-control-left"
            @click="prevMonth"
          ></button>
          <div>{{ fullDate }}</div>
          <button
            class="rangepicker__selector-control-right"
            @click="nextMonth"
          ></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <div
          class="rangepicker__cell"
          :class="{ rangepicker__cell_inactive: !day.isActive }"
          v-for="day in allDays"
          :key="day.date"
        >
          {{ day.num }}
          <slot :date="day.date"> </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
function getFirstInGrid(date) {
  const firstDay = date.getDay() ? date.getDay() - 1 : 6;
  return new Date(date.setDate(date.getDate() - firstDay));
}

function getAllDays(date) {
  let month = date.getMonth();
  let day = date.getDay() ? date.getDay() - 1 : 6;
  let days = new Date(
    new Date(new Date(date).setMonth(month + 1)).setDate(0),
  ).getDate();
  let cells = (days + day) % 7 ? 7 - ((days + day) % 7) : 0;
  let total = days + day + cells;
  return total;
}
function makeDateString(date) {
  return new Date(date).toDateString();
}
function setNextDay(date) {
  return new Date(date.setDate(date.getDate() + 1));
}

export default {
  name: 'CalendarView',
  data: () => ({
    date: new Date(new Date().setDate(1)),
  }),
  computed: {
    fullDate() {
      return this.date
        ? this.date.toLocaleString(navigator.language, {
            year: 'numeric',
            month: 'long',
          })
        : '';
    },
    allDays() {
      let result = [];
      let _current = new Date(this.date);
      let _month = _current.getMonth();
      _current = getFirstInGrid(_current);
      let cells = getAllDays(_current);
      for (let cell = 1; cell <= cells; cell++) {
        let day = {
          num: _current.getDate(),
          isActive: true,
          date: makeDateString(_current),
        };
        if (_current.getMonth() != _month) day.isActive = false;
        result.push(day);
        _current = setNextDay(_current);
      }
      return result;
    },
  },
  // Методы понадобятся для переключения между месяцами
  methods: {
    prevMonth() {
      const date = new Date(this.date);
      const currentMonth = date.getMonth();
      this.date = new Date(date.setMonth(currentMonth - 1));
    },

    nextMonth() {
      const date = new Date(this.date);
      const currentMonth = date.getMonth();
      this.date = new Date(date.setMonth(currentMonth + 1));
    },
  },
};
</script>

<style scoped>
.rangepicker {
  position: relative;
  margin: 32px 0 0;
}

.rangepicker__selector {
  display: flex;
  background-color: var(--white);
  flex-direction: row;
  justify-content: space-between;
  flex: 1 0 100%;
}

.rangepicker__calendar {
  flex-grow: 1;
}

.rangepicker__month-indicator {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.rangepicker__selector-controls {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}
.rangepicker__selector-controls button {
  border: none;
  padding: 0;
}

.rangepicker__selector-control-left,
.rangepicker__selector-control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('../assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.rangepicker__selector-control-left:hover,
.rangepicker__selector-control-right:hover {
  opacity: 0.8;
}

.rangepicker__selector-control-right {
  transform: rotate(180deg);
}

.rangepicker__date-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

/* Dates */
.rangepicker__date-grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.rangepicker__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.rangepicker__cell.rangepicker__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .rangepicker__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .rangepicker__date-grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .rangepicker__cell {
    height: 144px;
  }

  .rangepicker__cell:nth-child(7n + 1) {
    border-left: none;
  }
}
</style>
