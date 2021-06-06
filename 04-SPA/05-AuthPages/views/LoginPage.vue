<template>
  <form class="form" @submit.prevent="auth">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input
          type="email"
          placeholder="demo@email"
          class="form-control"
          v-model="email"
        />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input
          type="password"
          placeholder="password"
          class="form-control"
          v-model="password"
        />
      </div>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary button_block">
        Войти
      </button>
    </div>
    <div class="form__append">
      Нет аккаунта?
      <router-link to="/register" class="link">Зарегистрируйтесь</router-link>
    </div>
  </form>
</template>

<script>
import { login } from '../data';

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    async auth() {
      if (this.email && this.password) {
        const result = await login(this.email, this.password);
        alert(result.fullname ? result.fullname : result.message)
      } else if (!this.email) {
        alert('Требуется ввести Email')
      } else if (!this.password) {
        alert('Требуется ввести пароль')
      }
    }
  }
};
</script>

<style scoped></style>
