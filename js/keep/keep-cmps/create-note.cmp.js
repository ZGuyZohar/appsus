export default {
    template: `
    <section>
        <form @submit.prevent="addNote">
            <input type="text" v-model="info.txt" placeholder="Take a note..."/>
            <input type="text" v-model="info.url" placeholder="Add image..." @change="uploadImage"/>
            <button>Add note </button>
        </form>
    </section>`
    ,
    data(){
        return {
            type: null,
            info: {
                txt: '',
                url: ''
            }
        }
    },
    methods: {
        addNote() {
            
            const newNote = {
                isPinned: false,
                info: {
                    txt: this.info.txt
                }
            }
            if(!this.type) newNote.type = 'noteTxt'
            else if(this.type === 'noteImg') {
                newNote.type = this.type;
                newNote.info.url = this.info.url
            }
            this.info.txt = '';
            this.info.url = '';
            this.$emit('setNote' , newNote)
        },
        uploadImage(){
            this.type = 'noteImg'
        }
    }
}