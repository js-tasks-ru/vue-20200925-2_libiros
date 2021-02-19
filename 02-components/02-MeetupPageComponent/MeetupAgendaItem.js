import { agendaItemTitles, agendaItemIcons } from './data.js';

export const MeetupAgendaItem = {
  name: 'MeetupAgendaItem',

  template: `<div class="meetup-agenda__item">
      <div class="meetup-agenda__item-col">
        <img class="icon" alt="icon" :src="'/assets/icons/icon-'+icon+'.svg'" />
      </div>
      <div class="meetup-agenda__item-col">{{agendaItem.startsAt}} - {{agendaItem.endsAt}}</div>
      <div class="meetup-agenda__item-col">
        <h5 v-if="agendaItem.title" class="meetup-agenda__title">{{agendaItem.title}}</h5>
        <h5 class="meetup-agenda__title" v-else>{{title}}</h5>
        <p v-if="(agendaItem.speaker || agendaItem.language)">
          <span>{{agendaItem.speaker}}</span>
          <span v-if="agendaItem.speaker" class="meetup-agenda__dot"></span>
          <span v-if="agendaItem.language"class="meetup-agenda__lang">{{agendaItem.language}}</span>
        </p>
        <p v-if="agendaItem.description">{{agendaItem.description}}</p>
      </div>
    </div>`,

  props: {
    agendaItem: {
      type: Object,
      required: true
    }
  },

  computed: {
    title: function() {
      return agendaItemTitles[this.agendaItem.type];
    },
    icon: function() {
      return agendaItemIcons[this.agendaItem.type];
    }
  }
};
