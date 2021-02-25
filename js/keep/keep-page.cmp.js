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
   
    <note-txt   @setNote="saveNote" ></note-txt>
    <!-- <input type="text" placeholder="Enter Your Note" > -->
    <button @click="openTxtNote">TEXT</button>
    <button @click="openImgNote">IMG</button>
    <div class="keep-cards">
      
        <div class="keep-open-note" v-if="isClicked">
          
<div class="keep-card"  v-for="(note, idx) in notes"> <li > {{note.txt}} </li>  </div>
<div class="keep-card"  >   <button @click="removeNote">Delete</button></div>
        

  <!-- <label for="txt">Your text: </label>
  <input type="text" name="txt" v-model="note.txt"><br><br>
  <!-- <button @click="saveNote">Save</button> -->
  <!-- <button @click="close">X</button> --> 
  
 
</div>
                    <!-- <component class="keep-card" :is="note.type" :bind="note.info.txt" ></component> -->
                    </div>
    </div>
    </section>
    `,

    data() {
        return {
            isType: null,
            isClicked: false,
            notes:[]


        }
    },
    methods: {
     
        close() {
            this.isClicked= false
        },
        loadNotes(){
            keepService.query()
            .then(notes => this.notes = notes)
      
        },

        openTxtNote() {
            console.log('opening')
            this.isClicked = true
            // console.log('adding')
            // keepService.createNote()
            // this.loadNotes()
        },
        saveNote(note) {
            console.log(note)
            console.log(this.notes)
            
            // this.isClickedNote = false
           keepService.save(note)
           .then(this.loadNotes())
           console.log(this.notes)
        

        },
        openImgNote() {
            console.log('img')
        },
        removeNote() {
            console.log('deleting')
            keepService.remove(this.note.id)
            // .then(() => this.loadNotes())
        },
        addNote() {
            console.log('adding')
            this.notes.push(this.note)
            this.isClickedNote = false
            this.note = keepService.createNote()
            //  this.notes.push(this.)
        }
    },

    created() {
        //     this.loadNotes()
    },
    components: {
        noteTxt,
        noteTodos,
        noteImg,
    },

}