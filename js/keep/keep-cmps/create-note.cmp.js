export default {
    template: `
    <section>
        <form @submit.prevent="addNote">
            <input class="keep-input" type="text" v-model="info.txt" placeholder="Take a note..."/>
            <input class="keep-input" type="text" v-model="info.url" placeholder="Add image..." @change="uploadImage"/>
            <input class="keep-input" type="text" v-model="info.video" placeholder="Add video http.. not youtube" @change="uploadVideo"/>
            <input class="keep-input" type="text" v-model="info.audio" placeholder="Add audio file.." @change="uploadAudio"/>
            <input class="keep-input" type="text" v-model="info.todos" placeholder="Separate todo list by comma.." @change="uploadTodos"/>
            <button>Add note </button>
        </form>
    </section>`
    ,
    data(){
        return {
            type: null,
            info: {
                txt: '',
                url:'',
                video: '',
                audio: '',
                todos:''
            }
        }
    },
    methods: {
        addNote() {
            
            const newNote = {
                isPinned: false,
                info: {
                    txt: this.info.txt,
                  
                }
            }
            if(!this.type) newNote.type = 'noteTxt'
            else if(this.type === 'noteImg') {
                newNote.type = this.type;
                newNote.info.url = this.info.url
             } else if(this.type === 'noteAudio') {
                newNote.type = this.type;
                newNote.info.audio = this.info.audio
             } else if(this.type === 'noteVideo') {
                newNote.type = this.type;
                newNote.info.video = this.info.video
             } else if(this.type === 'noteTodos') {
                newNote.type = this.type;
                newNote.info.txt = this.info.todos.split(',')
            }
            this.info.txt = '';
            this.info.url = '';
            this.info.video = '';
            this.info.audio = '';
            this.info.todos = '';
            this.$emit('setNote' , newNote)
        },
        uploadImage(){
            this.type = 'noteImg'
        },
        uploadVideo(){
            this.type = 'noteVideo'
        },
        uploadAudio(){
            this.type = 'noteAudio'
        },
        uploadTodos(){
            this.type = 'noteTodos'
        },
    }
}