/*
  Полезные функции по работе с датой можно описать вне Vue компонента
 */

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

export const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  template: `<div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button class="rangepicker__selector-control-left" @click="prevMonth"></button>
          <div>{{fullDate}}</div>
          <button class="rangepicker__selector-control-right" @click="nextMonth"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <div class="rangepicker__cell" :class="{'rangepicker__cell_inactive' : !day.isActive}" v-for="day in allDays">{{ day.num }}
          <template v-if="day.events">
            <a class="rangepicker__event" v-for="event in day.events">{{ event }}</a>
          </template>
        </div>
      </div>
    </div>
  </div>`,

  // Пропсы
  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  // В качестве локального состояния требуется хранить что-то,
  // что позволит определить текущий показывающийся месяц.
  // Изначально должен показываться текущий месяц

  data: () => ({
    date: new Date(),
  }),

  // Вычислимые свойства помогут как с получением списка дней, так и с выводом информации
  computed: {
    fullDate() {
      return this.date
        ? this.date.toLocaleString(navigator.language, {
            year: 'numeric',
            month: 'long',
          })
        : '';
    },

    shedule() {
      let shedule = {};
      this.meetups.forEach((meetup) => {
        let _date = new Date(meetup.date).toDateString();
        if (!shedule[_date]) {
          shedule[_date] = [];
        }
        shedule[_date].push(meetup.title);
      });
      return shedule;
    },

    allDays() {
      const result = [];

      let currentMonth = this.date.getMonth(); // Текущий месяц
      let firstMonday = getFirstInGrid(new Date(this.date.setDate(1))); // Первый понедельник месяца

      let cells = getAllDays(firstMonday);

      for (let i = 0; i < cells; i++) {
        let day = {
          num: firstMonday.getDate(),
          isActive: true,
        };
        day.isActive = firstMonday.getMonth() != currentMonth ? false : true;
        let isEvent = new Date(firstMonday).toDateString();
        if (this.shedule[isEvent]) day['events'] = this.shedule[isEvent];
        result.push(day);
        firstMonday = new Date(firstMonday.setDate(firstMonday.getDate() + 1));
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
