<template>
    <div class="modal-container">
        <section class="btn close-btn close-modal" @click="onHideModal()">
            <close-SVG />
        </section>
        <h2>Регистрация</h2>
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
            <div class="password input-section">
                <label class="label text-small" for="confirm_password">Пароль еще раз</label>
                <div class="input-pass">
                    <input :type="confPassType" name="confirm_password" id="confirm_password"
                        v-model="form.confirm_password" />
                    <section @click="showConfPass = !showConfPass" class="show-svg">
                        <show-SVG v-if="showConfPass" />
                        <hide-SVG v-else />
                    </section>
                </div>

            </div>
        </section>
        <footer>
            <section class="login-footer">
                <section class="registration">
                    <span class="label text-small">У вас есть аккаунт?</span>
                    <span @click="switchModal('login')" class="link text-small-bold" >Войдите</span>
                </section>
                <section class="login-btn btn" @click="onRegistration()">
                    <span>Зарегистрироваться</span>
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
                password: '',
                confirm_password: ''
            },
            errors: [],
            showPass: false,
            showConfPass: false
        }
    },

    computed: {
        passType() {
            return this.showPass ? "text" : "password";
        },
        confPassType() {
            return this.showConfPass ? "text" : "password";
        },
    },
    methods: {
        onHideModal() {
            this.$emit('onHideModal')
        },
        switchModal(type) {
            console.log('ok')
            this.$emit('switchModal', { type })
            return type
        },

        async onRegistration() {
            try {
                await authService.registration(this.form);
                this.switchModal("login")
            } catch (error) {
                console.log(error)
                console.log(typeof (error))
                if (typeof (error) === 'string') this.errors = [error]
                else this.errors = error
            }
        },

    },
    components: {
        closeSVG,
        hideSVG,
        showSVG
    },
}
</script>

<style></style>