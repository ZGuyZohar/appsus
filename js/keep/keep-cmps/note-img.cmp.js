import {
    keepService
} from '../services/keep-service.js'



export default {
    props: [''],
    template: `
<section class="keep-note-img">

<img  width="300px" :src="note.url" />
      </section>
    `,
    data() {
        return {
            note: {
                id: keepService.makeId(8),
                type: 'noteImg',
                 url: ''
                }
           
    
}
},
methods: {
    reportNote() {
        this.$emit('setImg' , this.note)
    },
 
}
}
