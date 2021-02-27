import { eventBus } from '../../services/event-bus-service.js'

export default {
    template: `
    <section class="create-container">
        <form @submit.prevent="addNote">
            <input class="keep-input" v-if="!toggleInputs.txt" type="text" v-model="info.txt" placeholder="Take a note..."/>
            <input class="keep-input" v-if="toggleInputs.img" type="text" v-model="info.url" placeholder="Add image..." @change="uploadImage"/>
            <input class="keep-input" v-if="toggleInputs.video" type="text" v-model="info.video" placeholder="Add video http.. not youtube" @change="uploadVideo"/>
            <input class="keep-input" v-if="toggleInputs.audio" type="text" v-model="info.audio" placeholder="Add audio file.." @change="uploadAudio"/>
            <input class="keep-input" v-if="toggleInputs.todos" type="text" v-model="info.todos" placeholder="Separate todo list by comma.." @change="uploadTodos"/>
            <button>Add Note</button>
        </form>
        <ul>
            <span @click="inputToggler(1)">Image</span>
            <span @click="inputToggler(2)">Video</span>
            <span @click="inputToggler(3)">Audio</span>
            <span @click="inputToggler(4)">Todos</span>
        </ul>
    </section>`
    ,
    props: ['resetInputs', 'query'],
    data(){
        return {
            type: null,
            info: {
                txt: '',
                url:'',
                video: '',
                audio: '',
                todos:''
            },
            toggleInputs: {
                txt: false,
                img: false,
                video: false,
                audio: false,
                todos: false
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
            const msg = {
                        txt: `Note created succesfully`,
                        type: 'success'
                    }
            eventBus.$emit('show-msg', msg)
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
        inputToggler(mode){
            this.$emit('inputRemover', false)
            if(!mode) this.toggleInputs.txt = true
            if(mode === 1){
                this.toggleInputs = {}
               this.toggleInputs.img = true 
            } 
            if(mode === 2) {
                this.toggleInputs = {}
               this.toggleInputs.video = true 
            } 
            if(mode === 3){
                this.toggleInputs = {}
               this.toggleInputs.audio = true 
            }  
            if(mode === 4) {
                this.toggleInputs = {}
               this.toggleInputs.todos = true 
               this.toggleInputs.txt = true
            }
        }
    },
    watch: {
        resetInputs(){
            if(this.resetInputs) this.toggleInputs = {
                txt: false,
                img: false,
                video: false,
                audio: false,
                todos: false
            }
        }
    },
    created(){
        if(this.query) this.info.txt = this.query
    }
}