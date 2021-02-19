export const MeetupInfo = {
  template: `<ul class="info-list">
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-user.svg" />
        {{organizer}}
      </li>
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-map.svg" />
        {{place}}
      </li>
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg" />
        <time :datetime="time">{{timeRU}}</time>
      </li>
    </ul>`,


  data() {
    return {
      dateOptions: { year: 'numeric', month: 'long', day: 'numeric' }
    }
  },

  props: {
    organizer: {
      type: String,
      required: true,
      default: ''
    },
    place: {
      type: String,
      required: true,
      default: ''
    },
    date: {
      type: Date,
      required: true
    }
  },

  computed: {
    time: function() {
      return (Number.isInteger(this.date)) ? new Date(this.date).toISOString().substr(0, 10) : '';
    },
    timeRU: function() {
      return new Date(this.date).toLocaleString('en-En',this.dateOptions)
    }
  }
};
