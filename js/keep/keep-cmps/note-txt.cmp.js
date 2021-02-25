import {
    keepService
} from '../services/keep-service.js'


export default {
    template: `
<section class="keep-note-txt">
    
 
<input type="text" v-model="note.txt"  placeholder="enter text"  ><button class="keep-btn" @click="reportNote">Add Note</button>
      </section>
    `,
    data() {
        return {
            note: {
                id: keepService.makeId(8),
                type: 'noteTxt',
                 txt:''
                }
           
    
}
},
methods: {
    reportNote() {
        this.$emit('setNote' , this.note)
    },
    setNote() {
        console.log('check')
}
}
}
