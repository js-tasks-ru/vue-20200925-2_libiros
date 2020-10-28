import Vue from './vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение митапа для митапа
 * @param meetup - объект с описанием митапа (и параметром meetupId)
 * @return {string} - ссылка на изображение митапа
 */
function getMeetupCoverLink(meetup) {
  return `${API_URL}/images/${meetup.imageId}`;
}

/**
 * Словарь заголовков по умолчанию для всех типов элементов программы
 */
const agendaItemTitles = {
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
};

/**
 * Словарь иконок для для всех типов элементов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const agendaItemIcons = {
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
};

export const app = new Vue({
  el: '#app',

  data() {
    return {
      meetup: {},
      agendaItemTitles,
      agendaItemIcons,
      dateOptions: { year: 'numeric', month: 'short', day: 'numeric' }
    }
  },

  mounted() {
    // Требуется получить данные митапа с API
    this.getMeetup();
  },

  computed: {
    image() {
      return this.meetup.imageId ? getMeetupCoverLink(this.meetup) : `/assets/icons/icon-cal-sm.svg`
    }
  },

  methods: {
    // Получение данных с API предпочтительнее оформить отдельным методом,
    // а не писать прямо в mounted()
    async getMeetup() {
      this.meetup = await fetch(API_URL+'/meetups/'+MEETUP_ID).then(res=>res.json());
      // this.image = await fetch(API_URL+'/images/'+this.meetup.imageId).then(res=>res.json());
    },
    dateTimeFormat(ms) {
      return (Number.isInteger(ms)) ? new Date(ms).toISOString().substr(0, 10) : '';
    }
  },
});
