<template>
  <AppInput
    v-bind="$attrs"
    v-on="$listeners"
    @input.native="updateAll($event.target)"
    @change.native="updateAll($event.target)"
    :type="type"
    :value="formattedDate"
  >
    <!-- Так можно передать все слоты в дочерний компонент -->
    <template v-for="slot of Object.keys($slots)" v-slot:[slot]>
      <slot :name="slot" />
    </template>
  </AppInput>
</template>

<script>
import AppInput from './AppInput';

export default {
  name: 'DateInput',

  components: { AppInput },

  props: {
    // Чтобы value не было в списке $attrs, его можно указать в списке параметров
    value: {},
    type: {
      type: String,
      default: 'date',
      validator(v) {
        return ['date', 'time', 'datetime-local'].includes(v);
      },
    },
    valueAsNumber: {
      type: Number,
    },
    valueAsDate: {
      type: Date,
    },
  },
  computed: {
    step() {
      return this.$attrs.step && this.$attrs.step % 60;
    },
    formattedDate() {
      let res;
      if (!this.valueAsNumber && !this.valueAsDate) return this.value;
      let date = this.valueAsNumber
        ? new Date(this.valueAsNumber)
        : this.valueAsDate;

      if (this.type === 'date') {
        res = this.formatDate(date);
      }
      if (this.type === 'time') {
        res = this.formatTime(date, this.step);
      }
      if (this.type === 'datetime-local') {
        res = `${this.formatDate(date)}T${this.formatTime(date)}`;
      }

      return res;
    },
  },
  methods: {
    updateNumber(value) {
      return value.valueAsNumber;
    },
    updateDate(value) {
      return new Date(value.valueAsNumber);
    },
    updateAll(value) {
      this.$emit('update:valueAsNumber', this.updateNumber(value));
      this.$emit('update:valueAsDate', this.updateDate(value));
    },
    formatDate(date) {
      const year = date.getUTCFullYear();
      let month = date.getUTCMonth() + 1;
      month = month < 10 ? '0' + month : month;
      let day = date.getUTCDate();
      day = day < 10 ? '0' + day : day;

      return `${year}-${month}-${day}`;
    },
    formatTime(date, step) {
      let hours = date.getUTCHours();
      let minutes = date.getMinutes();
      let seconds = '';
      if (step) {
        seconds = date.getSeconds();
        if (seconds < 10) {
          seconds = '0' + seconds;
        }
      }
      if (hours < 10) {
        hours = '0' + hours;
      }
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      if (!seconds) return `${hours}:${minutes}`;
      return `${hours}:${minutes}:${seconds}`;
    },
  },
};
</script>

<style scoped></style>
