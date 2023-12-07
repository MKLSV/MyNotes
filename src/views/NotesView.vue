<template>
    <div class="notes-page">
        <add-note-modal v-if="showModal" :addNote="addNote" @onHideModal="onHideModal" :token="user.token"/>
        <button @click="onShowModal" class="btn close-btn add-btn">
            <addSVG />
        </button>
        <section class="note" v-for="(note, index) in notes" :key="index">
            <bend-SVG class="bend" />
            <section class="check">
                <h4 class="title">{{ note.title }}</h4>
            </section>
            <span class="text-normal body">{{ note.content }}</span>
            <div class="footer">
                <section class="del-btn" @click="removeNote(note.id)">
                    <closeSVG />
                    <span class="text-normal">Удалить</span>
                </section>
            </div>
        </section>
    </div>
</template>

<script>
import AddNoteModal from '@/components/AddNoteModal.vue'
import addSVG from '@/assets/svg/icons/addSVG.vue';
import closeSVG from '@/assets/svg/icons/closeSVG.vue';
import bendSVG from '@/assets/svg/bendSVG.vue';
import { noteService } from '@/service/notes.service';

export default {
    data() {
        return {
            showModal: false,
            notes: []
        }
    },
    props: {
        user: Object,
    },
    components: {
        AddNoteModal,
        addSVG,
        bendSVG,
        closeSVG
    },
    async mounted() {
        const token = JSON.parse(JSON.stringify(this.user.token))
        try {
            const result = await noteService.getNotes(token);
            console.log(result)
            this.notes = result
        } catch (error) {
            console.log(error)
        }
    },
    methods: {
        onShowModal() {
            this.showModal = true
            document.body.classList.add("modal-open");
        },
        onHideModal() {
            this.showModal = false;
            document.body.classList.remove("modal-open");
        },
        addNote(note) {
            this.notes.push(note)
        },
        async removeNote(id) {
            console.log(id)
            const token = JSON.parse(JSON.stringify(this.user.token))
            try {
                await noteService.removeNote({id,token});
                const newArr = this.notes.filter(note => {
                    const parsedNote = JSON.parse(JSON.stringify(note))
                    if (parsedNote.id !== id) return note
                })
                this.notes = newArr
            } catch (error) {
                console.log(error)
            }
        }
    }
}
</script>

<style lang="scss">
.notes-page {
    padding: 40px 0;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    gap: 20px;
    // justify-content: space-between;

    .add-btn {
        position: fixed;
        right: 40px;
        bottom: 40px;
        box-shadow: 0px 1px 20px 5px rgb(0 0 0 / 61%);
        z-index: 998;
        
    }

    .del-btn {
        display: flex;
        height: 56px;
        padding: 0px 24px;
        justify-content: center;
        align-items: center;
        gap: 12px;
        cursor: pointer;
    }
}
</style>