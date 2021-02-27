import createNote from './keep-cmps/create-note.cmp.js'
import noteTxt from './keep-cmps/note-txt.cmp.js'
import noteVideo from './keep-cmps/note.video.cmp.js'
import noteAudio from './keep-cmps/note-audio.cmp.js'
import noteImg from './keep-cmps/note-img.cmp.js'
import noteTodos from './keep-cmps/note-todos.cmp.js'
import { keepService } from './services/keep-service.js'
import { eventBus } from '../services/event-bus-service.js'


export default {
    name: 'keep-page',
    template: `
    <section @click.self="removeInputs" class="keep-page">
        <create-note :query="query" :resetInputs="inputRemover" @inputRemover="toggleInputRemover" @setNote="addNote"/>
        <main class="notes-container" >
            <template v-for="note in notes" > 
                <component @updateTxt="updateNote" :is="note.type" :note="note" @deleteTxt="removeNote(note)" />
             
            </template>
        </main>
    </section>
    `,
    data() {
        return {         
            isType: null,
            notes: [],
            currNote: null,
            inputRemover: false,
            query: ''
        }
    },
    methods: {
        loadNotes() {
            keepService.query()
                .then(notes => this.notes = notes)

        },
        setCurrNote(note){
            this.currNote = note;
        },
        updateNote(txtToChange, noteToChange, id) {
            if(id) noteToChange.info.txt[id] = txtToChange;
            else noteToChange.info.txt = txtToChange;
            keepService.updateNote(noteToChange)
            .then(this.loadNotes);
            const msg = {
                        txt: `Note updated succesfully`,
                        type: 'success'
                    }
            eventBus.$emit('show-msg', msg)
        },
        removeInputs(){
            this.inputRemover = true;
        },
        toggleInputRemover(){
            console.log('hi');
            this.inputRemover = false;
        },
        removeNote(note) {
            console.log('deleting')
            keepService.remove(note.id)
                .then(() => this.loadNotes());
            const msg = {
                    txt: `Note deleted succesfully`,
                    type: 'success'
                }
            eventBus.$emit('show-msg', msg)
        },
        addNote(note) {
            keepService.save(note)
            .then(this.loadNotes)
        },
        getQueryStr(){
            this.query = this.$route.query.txt;
        }
    },

    created() {
        this.loadNotes()
        this.getQueryStr();
    },
    components: {
        noteVideo,
        noteAudio,
        noteTxt,
        noteImg,
        createNote,
        noteTodos
    },

}