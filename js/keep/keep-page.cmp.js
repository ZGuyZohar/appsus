import noteTxt from './keep-cmps/note-txt.cmp.js'
import noteTodos from './keep-cmps/note-todos.cmp.js'
import noteImg from './keep-cmps/note-img.cmp.js'
import { keepService } from './services/keep-service.js'


export default {
  
    name: 'keep-page',
    template:`
    <section v-if="notes" class="keep-page">
    <h1>Welcome to keep</h1>
   
    <input type="text" placeholder="Enter Your Note" v-model="note.info.txt">
    <button @click.prevent="addNote">ADD</button>
    <div class="keep-cards">
            <div v-for="(note, idx) in notes">
                    <component class="keep-card" :is="note.type"  ></component>
                    </div>
    </div>
    </section>
    `
,

    data() {
        return {
            notes :null,
          note: {
              info: {
                  txt: ''
              
          }
        }
    }
    },
    methods: {
        loadNotes() {
            keepService.query()
                .then(notes => this.notes = notes)
        },
        addNote() {
console.log('checking')
 keepService.createNote()
 this.loadNotes()
}
        
    },

    created() {
        this.loadNotes()
    },
components:{
    noteTxt,
    noteTodos,
    noteImg,
},
}