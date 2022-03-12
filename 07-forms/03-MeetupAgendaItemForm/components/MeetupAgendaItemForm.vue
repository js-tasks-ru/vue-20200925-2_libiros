<template>
  <div class="form-section form-section_inner">
    <button type="button" class="remove-button" @click="$emit('remove')">
      <img src="../assets/icons/icon-trash.svg" alt="trash" />
    </button>

    <div class="form-group">
      <select class="form-control" title="Тип" v-model="localAgendaItem.type">
        <option
          v-for="agendaItemType of agendaItemTypes"
          :key="agendaItemType.value"
          :value="agendaItemType.value"
        >
          {{ agendaItemType.text }}
        </option>
      </select>
    </div>

    <div class="form__row">
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Начало</label>
          <input
            class="form-control"
            type="time"
            placeholder="00:00"
            v-model="localAgendaItem.startsAt"
          />
        </div>
      </div>
      <div class="form__col">
        <div class="form-group">
          <label class="form-label">Окончание</label>
          <input
            class="form-control"
            type="time"
            placeholder="00:00"
            v-model="localAgendaItem.endsAt"
          />
        </div>
      </div>
    </div>

    <div class="form-group">
      <label class="form-label">{{
        localAgendaItem.type === 'other'
          ? 'Заголовок'
          : localAgendaItem.type === 'talk'
          ? 'Тема'
          : 'Нестандартный текст (необязательно)'
      }}</label>
      <input class="form-control" v-model="localAgendaItem.title" />
    </div>
    <div class="form-group" v-if="localAgendaItem.type === 'talk'">
      <label class="form-label">Докладчик</label>
      <input class="form-control" v-model="localAgendaItem.speaker" />
    </div>
    <div
      class="form-group"
      v-if="localAgendaItem.type === 'talk' || localAgendaItem.type === 'other'"
    >
      <label class="form-label">Описание</label>
      <textarea
        class="form-control"
        v-model="localAgendaItem.description"
      ></textarea>
    </div>
    <div class="form-group" v-if="localAgendaItem.type === 'talk'">
      <label class="form-label">Язык</label>
      <select class="form-control" v-model="localAgendaItem.language">
        <option
          v-for="talkLanguage of talkLanguages"
          :key="talkLanguage.value"
          :value="talkLanguage.value"
        >
          {{ talkLanguage.text }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
function getMsFromString(string) {
  let hours = parseInt(string.slice(0, 2));
  let minutes = parseInt(string.slice(3));
  return hours * 60 * 60 * 1000 + minutes * 60 * 1000;
}

const getAgendaItemTypes = () => [
  { value: 'registration', text: 'Регистрация' },
  { value: 'opening', text: 'Открытие' },
  { value: 'break', text: 'Перерыв' },
  { value: 'coffee', text: 'Coffee Break' },
  { value: 'closing', text: 'Закрытие' },
  { value: 'afterparty', text: 'Afterparty' },
  { value: 'talk', text: 'Доклад' },
  { value: 'other', text: 'Другое' },
];

const getTalkLanguages = () => [
  { value: null, text: 'Не указано' },
  { value: 'RU', text: 'RU' },
  { value: 'EN', text: 'EN' },
];

export default {
  name: 'MeetupAgendaItemForm',
  props: {
    agendaItem: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      localAgendaItem: { ...this.agendaItem },
      agendaItemTypes: getAgendaItemTypes(),
      talkLanguages: getTalkLanguages(),
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
