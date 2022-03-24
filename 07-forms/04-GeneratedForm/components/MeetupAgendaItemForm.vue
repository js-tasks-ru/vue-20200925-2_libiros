<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button">
      <img src="../assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <form-group>
      <dropdown-button
        title="Тип"
        :options="$options.agendaItemTypes"
        v-model="localAgendaItem.type"
      />
    </form-group>

    <div class="form__row">
      <div class="form__col">
        <form-group>
          <label class="form-label">Начало</label>
          <app-input
            type="time"
            placeholder="00:00"
            v-model="localAgendaItem.startsAt"
          />
        </form-group>
      </div>
      <div class="form__col">
        <form-group>
          <label class="form-label">Окончание</label>
          <app-input
            type="time"
            placeholder="00:00"
            v-model="localAgendaItem.endsAt"
          />
        </form-group>
      </div>
    </div>

    <form-group
      v-for="group of $options.fieldSpecifications[localAgendaItem.type]"
      :key="group.field"
      :label="group.title"
    >
      <component
        :is="group.component"
        v-bind="group.props"
        :[group.model.prop]="localAgendaItem[group.field]"
        @[group.model.event]="localAgendaItem[group.field] = $event"
      />
    </form-group>
  </div>
</template>

<script>
import AppInput from './AppInput';
import DropdownButton from './DropdownButton';
import FormGroup from './FormGroup';
import {
  getAgendaItemsFieldSpecifications,
  getAgendaItemTypes,
} from '../meetup-service';

function getMsFromString(string) {
  let hours = parseInt(string.slice(0, 2));
  let minutes = parseInt(string.slice(3));
  return hours * 60 * 60 * 1000 + minutes * 60 * 1000;
}

export default {
  name: 'MeetupAgendaItemForm',

  components: { AppInput, DropdownButton, FormGroup },

  agendaItemTypes: getAgendaItemTypes(),
  fieldSpecifications: getAgendaItemsFieldSpecifications(),

  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      localAgendaItem: { ...this.agendaItem },
      duration: 0,
    };
  },

  computed: {
    startTime() {
      return this.localAgendaItem.startsAt;
    },
    endTime() {
      return this.localAgendaItem.endsAt;
    },
  },

  watch: {
    localAgendaItem: {
      handler(item) {
        this.$emit('update:agendaItem', { ...item });
      },
      deep: true,
    },
    startTime(value) {
      this.localAgendaItem.endsAt = new Date(
        getMsFromString(value) + this.duration,
      )
        .toISOString()
        .slice(11, 16);
    },
    endTime: {
      immediate: true,
      handler() {
        let start = getMsFromString(this.localAgendaItem.startsAt);
        let end = getMsFromString(this.localAgendaItem.endsAt);
        if (end < start) {
          end += 60 * 60 * 24 * 1000;
        }
        this.duration = end - start;
      },
    },
  },
};
</script>

<style></style>
