<template>
    <div class="app-header">
        <section class="logo">
            <logo-SVG class="app-logo"/>
            <mobile-logo-SVG class="mobile-logo"/>
        </section>
        <section v-if="!user" class="login-btn btn" @click="onShowModal">
            <login-SVG />
            <span>Вход</span>
        </section>
        <section v-else class="user-info">
            <span class="text-small">{{ user.email }}</span>
            <div class="user-logo" @click="logOutModal = !logOutModal">
                <user-SVG />
            </div>
            <section v-if="logOutModal" class="logout-modal">
                <section class="triangle"></section>
                <span class="link" @click="onLogout">Выйти</span>
            </section>
        </section>
    </div>
</template>

<script>
import loginSVG from '@/assets/svg/icons/loginSVG.vue'
import userSVG from '@/assets/svg/icons/userSVG.vue'
import LogoSVG from '@/assets/svg/LogoSVG.vue'
import mobileLogoSVG from '@/assets/svg/MobileLogoSVG.vue'

import { authService } from '@/service/auth.service'

export default {
    data() {
        return {
            logOutModal: false
        }
    },
    props: {
        user: Object,
    },
    components: {
        loginSVG,
        LogoSVG,
        userSVG,
        mobileLogoSVG
    },
    methods: {
        onShowModal() {
            this.$emit('onShowModal')
        },
        unsetUser() {
            this.$emit('setUser', null )
        },
        async onLogout() {
            try {
                const token =JSON.parse(JSON.stringify(this.user.token))
                await authService.logout(token);
                this.unsetUser()
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style lang="scss">

</style>