import noteTxt from './keep-cmps/note-txt.cmp.js'
import noteTodos from './keep-cmps/note-todos.cmp.js'
import noteImg from './keep-cmps/note-img.cmp.js'
import { notesService } from './services/keep-service.js'

export default {
    name: 'keep-page',
    template:`
    <section v-if="notes" class="keep-page">
    <h1>Welcome to keep</h1>
    <div class="keep-cards">
    <div v-for="(note, idx) in notes">
                    <component :is="note.type"  :info="note.info.txt" @setNote="setAns($event, idx)"></component>
                    </div>
        <!-- <note-txt  class="keep-card">check </note-txt>
        <note-todos class="keep-card">   </note-todos >  
        <note-img class="keep-card">   </note-img >   -->
        
    
    </div>
       

    </section>
    `
,

    data() {
        return {
            notes :null
        }

    },
    created() {
        const notes = notesService.getById()
        this.notes = notes
    },
components:{
    noteTxt,
    noteTodos,
    noteImg,
},
}