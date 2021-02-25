import {
    keepService
} from '../services/keep-service.js'

export default {
    template: `
<section class="keep-note-txt">
    {{note.type}}
    <form>
    <input type="text" v-model="note.txt"  placeholder="enter text"  @change="reportNote">
    <button @click.prevent="saveNote()">Save</button>
</form>
      </section>
    `,
    data() {
        return {
            note: {
                id: keepService.makeId(8),
                type: 'noteTxt',
                 txt:' '
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
