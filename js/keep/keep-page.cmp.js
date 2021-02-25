import noteTxt from './keep-cmps/note-txt.cmp.js'
import noteTodos from './keep-cmps/note-todos.cmp.js'
import noteImg from './keep-cmps/note-img.cmp.js'
import {
    keepService
} from './services/keep-service.js'


export default {

    name: 'keep-page',
    template: `
    <section  class="keep-page">
    <h1>Welcome to keep</h1>
   
    <!-- <input type="text" placeholder="Enter Your Note" > -->
    <note-txt   @setNote="saveNote" ></note-txt>
    <note-img   @setImg="saveNote" ></note-img>
    
    <div class="keep-cards">
<div class="keep-card"  v-for="(note, idx) in notes"> <li > {{note.txt}} </li>
<button class="keep-btn delete" @click="removeNote(note)">Delete</button>
<button class="keep-btn"  @click="UpdateNote(note)">Update</button>
</div>
<div class="keep-open-note" v-if="isClicked">
<form @submit.prevent="saveNote">
            <input type="text" placeholder="edit text" v-model="noteToUpdate.txt">
            <input type="image" placeholder="img adress" :src="noteToUpdate.image">
            <button class="keep-btn">save</button>
        </form>
<button class="keep-btn" @click="close">X</button>
</div>

</div>
                    <!-- <component class="keep-card" :is="note.type" :bind="note.info.txt" ></component> -->
                    </div>
    </div>
    </section>
    `,

    data() {
        return {
            noteToUpdate:{
                txt:''
            },
            isType: null,
            isClicked: false,
            notes: []
        }
    },
    methods: {

        close() {
            this.isClicked = false
        },
        loadNotes() {
            keepService.query()
                .then(notes => this.notes = notes)

        },
        UpdateNote(note) {
            console.log('clicked')
            this.isClicked = true
        },

  
        saveNote(note) {
            keepService.updateNote(note)
                .then(() => this.loadNotes())
                // this.noteToUpdate = keepService.getEmptyNote()
            console.log(this.notes)


        },
        openImgNote() {
            console.log('img')
        },
        removeNote(note) {
            console.log('deleting')
            keepService.remove(note.id)
                .then(() => this.loadNotes())
        },
        addNote() {
            console.log('adding')
            this.notes.push(this.note)
            this.isClickedNote = false
            this.note = keepService.createNote()

        }
    },

    created() {
        this.loadNotes()
    },
    components: {
        noteTxt,
        noteTodos,
        noteImg,
    },

}