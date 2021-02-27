export default {
    template: `
    <section>
        <form @submit.prevent="addNote">
            <input type="text" v-model="info.txt" placeholder="Take a note..."/>
            <input type="text" v-model="info.url" placeholder="Add image..." @change="uploadImage"/>
            <input type="text" v-model="info.video" placeholder="Add video http.. not youtube" @change="uploadVideo"/>
            <input type="text" v-model="info.audio" placeholder="Add audio.." @change="uploadAudio"/>
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
                audio: new Audio('/sounds/salamisound-6018270-french-wine-bottle-falls-on.mp3').play()
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
             } else if(this.type === 'noteAudio') {
                newNote.type = this.type;
                newNote.info.audio = this.info.audio
             } else if(this.type === 'noteVideo') {
                newNote.type = this.type;
                newNote.info.video = this.info.video
            }
            this.info.txt = '';
            this.info.url = '';
            this.info.video = '';
            this.info.audio = '';
            console.log(newNote);
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
    }
}