<template>
    <div class="app">
        <app-header :user="user" @onShowModal="onShowModal()" @setUser="setUser"/>
        <auth-modal v-if="showModal" @onHideModal="onHideModal()" @setUser="setUser" />
        <div class="app-container">
            <main-view v-if="!user" />
            <notes-view v-else :user="user"/>
        </div>
    </div>
</template>
  
<script>
import MainView from '@/views/MainView.vue'
import NotesView from '@/views/NotesView.vue'
import AppHeader from '@/components/AppHeader.vue'
import AuthModal from '@/components/AuthModal.vue'

export default {
    data() {
        return {
            showModal: false,
            user: null,
        }
    },
    components: {
        AppHeader,
        MainView,
        AuthModal,
        NotesView
    },
    methods: {
        onShowModal() {
            this.showModal = true
        },
        onHideModal() {
            this.showModal = false
        },
        setUser(user) {
            this.user = user
        },
    },
}
</script>
  
<style>
.app {
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    padding: 0 6vw;
    position: relative;
}

</style>