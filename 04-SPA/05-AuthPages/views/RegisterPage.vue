<template>
  <form class="form" @submit.prevent="register">
    <div class="form-group">
      <label class="form-label">Email</label>
      <div class="input-group">
        <input type="email" class="form-control" v-model="email" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Имя</label>
      <div class="input-group">
        <input type="text" class="form-control" v-model="fullName" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Пароль</label>
      <div class="input-group">
        <input type="password" class="form-control" minlength="6" v-model="password" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Повтор пароля</label>
      <div class="input-group">
        <input type="password" class="form-control" minlength="6" v-model="passwordRepeat" />
      </div>
    </div>
    <div class="form-group">
      <label class="checkbox"
        ><input type="checkbox" v-model="agree" /> Я согласен с условиями
        <span></span
      ></label>
    </div>
    <div class="form__buttons">
      <button type="submit" class="button button_primary">
        Зарегистрироваться
      </button>
    </div>
    <div class="form__append">
      Уже есть аккаунт?
      <router-link to="/login" class="link">Войдите</router-link>
    </div>
  </form>
</template>

<script>
import { register } from '../data';

export default {
  name: 'RegisterPage',
  data() {
    return {
      email: '',
      fullName: '',
      password: '',
      passwordRepeat: '',
      agree: false
    }
  },
  methods: {
    async register() {
      if (!this.email) {
        alert('Требуется ввести Email')
        return
      }
      if (!this.fullName) {
        alert('Требуется ввести полное имя')
        return
      }
      if (!this.password) {
        alert('Требуется ввести пароль')
        return
      }
      if (this.password !== this.passwordRepeat) {
        alert('Пароли не совпадают')
        return
      }
      if (!this.agree) {
        alert('Требуется согласиться с условиями')
        return
      }
      const response = await register(this.email, this.fullName, this.password);
      alert(response.id ? response.id : response.message)
    }
  }
};
</script>

<style scoped></style>
