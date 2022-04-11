<template>
  <list-view :items="meetupsWithCoverAndBadge">
    <!-- "X" - некоторый элемент списка, полученный из параметров слота.
    Имя параметра выберите сами и замените X на него в коде ниже. -->
    <template v-slot:default="scope">
      <list-view-card
        tag="router-link"
        :to="{ name: 'meetup', params: { meetupId: scope.item.id } }"
        :key="scope.item.id"
        :title="scope.item.title"
        :cover="scope.item.cover"
        :badge="scope.item.badge"
        :badge-success="scope.item.badgeSuccess"
      >
        <meetup-info
          :date="scope.item.date"
          :place="scope.item.place"
          :organizer="scope.item.organizer"
        />
      </list-view-card>
    </template>
  </list-view>
</template>

<script>
import ListView from './ListView';
import ListViewCard from './ListViewCard';
import MeetupInfo from './MeetupInfo';
import { getImageUrlByImageId } from '../data';

export default {
  name: 'MeetupsList',

  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },

  components: { ListView, ListViewCard, MeetupInfo },

  computed: {
    meetupsWithCoverAndBadge() {
      return this.meetups.map((meetup) => {
        const newMeetup = { ...meetup };
        if (meetup.attending) {
          newMeetup.badge = 'Участвую';
          newMeetup.badgeSuccess = true;
        } else if (meetup.organizing) {
          newMeetup.badge = 'Организую';
        }
        newMeetup.cover =
          meetup.imageId && getImageUrlByImageId(meetup.imageId);
        newMeetup.date = new Date(meetup.date);
        return newMeetup;
      });
    },
  },
};
</script>

<style></style>
