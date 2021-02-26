import createNote from './keep-cmps/create-note.cmp.js'
import noteTxt from './keep-cmps/note-txt.cmp.js'
import noteVideo from './keep-cmps/note.video.cmp.js'
import noteAudio from './keep-cmps/note-audio.cmp.js'
import noteImg from './keep-cmps/note-img.cmp.js'
import { keepService } from './services/keep-service.js'


export default {
    name: 'keep-page',
    template: `
    <section  class="keep-page">
    <h1>Welcome to keep</h1>
        <create-note @setNote="addNote"/>
        <main class="notes-container" >
            <template v-for="note in notes" > 
                <component @updateTxt="updateNote" :is="note.type" :note="note" @deleteTxt="removeNote(note)" />
             
            </template>
        </main>
    </section>
    `,
    data() {
        return {
            noteToUpdate:{
                txt:''
            },
            isType: null,
            notes: [],
            currNote: null
        }
    },
    methods: {
        // close() {
        //     this.isClicked = false
        // },
        loadNotes() {
            keepService.query()
                .then(notes => this.notes = notes)

        },
        setCurrNote(note){
            this.currNote = note;
        },
        updateNote(txtToChange, noteToChange) {
            noteToChange.info.txt = txtToChange
            keepService.updateNote(noteToChange)
            .then(this.loadNotes)

        },
        // saveNote(note) {
        //     keepService.updateNote(note)
        //         .then(() => this.loadNotes())
        //         // this.noteToUpdate = keepService.getEmptyNote()
        //     console.log(this.notes)
        // },
        // openImgNote() {
        //     console.log('img')
        // },
        removeNote(note) {
            console.log('deleting')
            keepService.remove(note.id)
                .then(() => this.loadNotes())
        },

        addNote(note) {
            keepService.save(note)
            .then(this.loadNotes)
        }
    },

    created() {
        this.loadNotes()
    },
    components: {
        noteVideo,
        noteAudio,
        noteTxt,
        noteImg,
        createNote
    },

}