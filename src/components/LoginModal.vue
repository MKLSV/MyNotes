<template>
    <div class="modal-container">
        <section class="btn close-btn close-modal" @click="onHideModal()">
            <close-SVG />
        </section>
        <h2>Вход в ваш аккаунт</h2>
        <section class="inputs">
            <div class="email input-section">
                <label class="label text-small" for="email">Email</label>
                <input type="email" name="email" id="email" v-model="form.email" />
            </div>
            <div class="password input-section">
                <label class="label text-small" for="password">Пароль</label>
                <div class="input-pass">
                    <input :type=passType name="password" id="password" v-model="form.password" />
                    <section @click="showPass = !showPass" class="show-svg">
                        <show-SVG v-if="showPass" />
                        <hide-SVG v-else />
                    </section>
                </div>
            </div>
        </section>
        <footer>
            <section class="login-footer">
                <section class="registration">
                    <span class="label text-small">У вас нет аккаунта?</span>
                    <span @click="switchModal('registration')" class="link text-small-bold">Зарегистрируйтесь</span>
                </section>
                <section class="login-btn btn" @click="onLogin">
                    <span>Вход</span>
                </section>
            </section>
            <section class="error-info">
                <div class="error" v-for="(error, index) in errors" :key="index">{{ error }}</div>
            </section>
        </footer>
    </div>
</template>

<script>
import closeSVG from '@/assets/svg/icons/closeSVG.vue'
import hideSVG from '@/assets/svg/icons/hideSVG.vue';
import showSVG from '@/assets/svg/icons/showSVG.vue';

import { authService } from '@/service/auth.service'

export default {
    data() {
        return {
            form: {
                email: '',
                password: ''
            },
            showPass: false,
            errors: []
        }
    },
    methods: {
        onHideModal() {
            this.$emit('onHideModal')
        },
        switchModal(type) {
            this.$emit('switchModal', { type })
            return type
        },
        async onLogin() {
            try {
                const result = await authService.login(this.form);
                this.setUser(result)
                this.onHideModal()
            } catch (error) {
                if(typeof(error) === 'string') this.errors = [error]
                else this.errors = error
            }
        },
        setUser(user) {
            this.$emit('setUser', { ...user })
        }
    },
    components: {
        closeSVG,
        hideSVG,
        showSVG
    },
    computed: {
        passType() {
            return this.showPass ? "text" : "password";
        },
    },
}
</script>

<style>
</style>