<template>
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="auth-container">
                <login-modal v-if="authOption === 'login'" @switchModal="switchModal" @onHideModal="onHideModal()" @setUser="setUser"/>
                <registration-modal v-else @switchModal="switchModal" @onHideModal="onHideModal()" />
            </div>
        </div>
    </div>
</template>

<script>
import LoginModal from './LoginModal.vue';
import RegistrationModal from './RegistrationModal.vue';
export default {
    data() {
        return {
            authOption: 'login',
        }
    },
    components: {
        LoginModal,
        RegistrationModal
    },
    methods: {
        onHideModal() {
            this.$emit('onHideModal')
        },
        switchModal(data) {
            this.authOption = data.type
        },
        setUser(user) {
            this.$emit('setUser', { ...user })
        },
    }
}
</script>

<style>
</style>