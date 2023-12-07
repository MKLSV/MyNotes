<template>
    <div class="modal-mask">
        <div class="modal-wrapper">
            <div class="modal-note-container">
                <section class="btn close-btn close-modal" @click="onHideModal">
                    <close-SVG />
                </section>
                <h2>Добавление заметки</h2>
                <section class="inputs">
                    <div class="title input-section">
                        <label class="label text-small" for="title">Название заметки</label>
                        <input v-model="note.title" type="text" name="title" id="title" placeholder="Введите название"
                            maxlength="100" />
                        <div class="count">
                            <span v-bind:class="{ 'label': true, 'red': this.note.title.length === 100 }">{{
                                this.note.title.length }}/100</span>
                        </div>
                    </div>
                    <div class="password input-section">
                        <label class="label text-small" for="password">Текст заметки</label>
                        <textarea class="text-area" v-model="note.content" name="password" id="password" placeholder="Введите текст"
                            maxlength="500" />
                        <div class="count">
                            <span v-bind:class="{ 'label': true, 'red': this.note.content.length === 500 }">{{
                                this.note.content.length }}/500</span>
                        </div>
                    </div>
                </section>
                <footer>
                    <button @click="onAdd()" class="btn">Добавить</button>
                </footer>
            </div>
        </div>
    </div>
</template>

<script>
import closeSVG from '@/assets/svg/icons/closeSVG.vue';
import { noteService } from '@/service/notes.service';
export default {
    data() {
        return {
            note:{
                title: '',
                content: '',
            }
        }
    },
    props: {
        addNote: Function,
        token: String
    },
    components: {
        closeSVG,
    },
    methods: {
        onHideModal() {
            this.$emit('onHideModal')
        },
        async onAdd() {
            try {
                const result = await noteService.addNote({ note:this.note, token:this.token });
                this.addNote(result)
                this.onHideModal()
            } catch (error) {
                console.log(error)
            }
        },
    },
}
</script>

<style lang="scss">
.modal-mask {
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: opacity 0.7s ease;
    background: #0A1F38;
}

.modal-wrapper {
    display: table-cell;
    vertical-align: middle;
}

.modal-note-container {
    display: flex;
    position: relative;
    width: 780px;
    padding: 80px;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 40px;
    border-radius: 40px;
    background: #1B2F46;

    .close-modal {
        position: absolute;
        right: 20px;
        top: 20px;
    }

    .inputs {
        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 24px;

        .input-section {
            display: flex;
            flex-direction: column;
            gap: 8px;
        }

        input {
            width: 100%;
        }

        .count {
            display: flex;
            justify-content: flex-end;
            padding: 0 24px;

            .red {
                color: red;
            }
        }
    }

    footer {
        display: flex;
        width: 100%;
        justify-content: flex-end;

        button {
            width: 150px;
        }
    }

}
</style>